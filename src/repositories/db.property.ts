import { dbType } from "./db.type";

/**
 * Represents a property of an entity that will be stored in the database.
 */
export interface DbProperty {
  /**
   * Name of the property in the static type of the entity.
   */
  propertyName: string;

  /**
   * Name of the property in the database.
   */
  dbName: string;

  /**
   * Type of the property.
   */
  dbType: dbType;
}