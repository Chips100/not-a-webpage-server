import { DbRepository } from "../db.repository";
import { getDbPropertiesOf } from "../db.property.decorator";
import { DbProperty } from "../db.property";
import { dbType } from "../db.type";
import * as sqlite3 from "sqlite3";

/**
 * Repository that stores entities in an sqlite database.
 */
export class SqliteRepository implements DbRepository {
  private readonly sqliteTypeNames: { [type: number]: string } = {
    [dbType.string]: 'TEXT',
    [dbType.number]: 'INTEGER',
    [dbType.date]: 'DATETIME'
  };

  private db: sqlite3.Database;
  private ensuredTables: { [tableName: string]: boolean} = {};

  constructor(private connectionString: string) { }

  /**
   * Inserts a new entity into the repository.
   * @param entity Entity to insert.
   * @param type Static type of the entity used to determine the schema.
   * @returns Promise that will be resolved when the entity has been inserted.
   */
  insert<T>(entity: T, type: {new(): T}): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.ensureOpened().then(db => {
        this.createTableIfNotExists(db, type).then(() => {
          // Build insert statement with all properties from the entity.
          const columnNames = getDbPropertiesOf(type).map(p => p.dbName);
          const columnValues = getDbPropertiesOf(type).map(p => (<any>entity)[p.propertyName]);
          const parameters = columnNames.map(_ => '?');
    
          // Execute the statement with values from the entity.
          const statement = this.db.prepare(`
            INSERT INTO ${this.getTableNameByType(type)} (${columnNames.join(',')}) 
            VALUES (${parameters.join(',')})`, err => {
              
              if (err) { reject(err); }
              else {
                statement.run(columnValues, err => {
                  if (err) { reject(err); }
                  else { resolve(entity); }
                });
              }
            });
        }, reject);
      }, reject);
    });
  }

  private ensureOpened(): Promise<sqlite3.Database> {
    return new Promise<sqlite3.Database>((resolve, reject) => {
      if (!!this.db) { resolve(this.db); }

      const db = new sqlite3.Database(this.connectionString, err => {
        if (err) { reject(err); } 
        else { resolve(this.db = db); }
      });
    });
  }

  private createTableIfNotExists<T>(db: sqlite3.Database, type: { new(): T }): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const tableName = this.getTableNameByType(type);
      if (this.ensuredTables[tableName]) { 
        resolve();
        return; 
      }
  
      const columnDefinitions = getDbPropertiesOf(type).map(this.getColumnDefinition.bind(this)).join(',');
      const createTableStatement = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefinitions})`;
  
      db.run(createTableStatement, err => {
        if (err) { reject(err); }
        else {
          this.ensuredTables[tableName] = true;
          resolve(); 
        }
      });
    });
  }

  private getColumnDefinition(column: DbProperty): string {
    if (!this.sqliteTypeNames[column.dbType]) {
      throw new Error(`Unknown type for sqlite: ${ column.dbType }`);
    }
    
    return `${column.dbName} ${this.sqliteTypeNames[column.dbType]}`;
  }

  private getTableNameByType<T>(type: {new():T}) {
    return (<any>type).name; // Name of type.
  }
}
