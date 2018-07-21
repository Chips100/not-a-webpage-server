import { dbType } from "./db.type";
import { DbProperty } from "./db.property";

/**
 * Decorator for properties that will be stored in the database.
 * @param type Type of the property to use for storage in the database.
 * @param name Name of the property in the database; defaults to the property name.
 */
export function dbProperty(type: dbType, name?: string): Function {
  return function(declaringType: any, propertyName: string) {
    // store the decorated property in a field on the type itself.
    addDbProperty(declaringType, {
      propertyName: propertyName,
      dbName: name || propertyName,
      dbType: type
    });
  }
}

/**
 * Gets the database properties in the specified type.
 * @param type Type with the database properties.
 * @returns An array with the properties in the type that are decorated as database properties.
 */
export function getDbPropertiesOf(type: { new(): any }): DbProperty[] {
  return type.prototype[DbPropertiesStorageKey] || [];
}

function addDbProperty(type: any, property: DbProperty): void {
  type[DbPropertiesStorageKey] = type[DbPropertiesStorageKey] || [];
  type[DbPropertiesStorageKey].push(property);
}

const DbPropertiesStorageKey = '__dbProperties';