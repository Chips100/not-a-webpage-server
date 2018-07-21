/**
 * Represents a repository for storing entities.
 */
export interface DbRepository {
  /**
   * Inserts a new entity into the repository.
   * @param entity Entity to insert.
   * @param type Static type of the entity used to determine the schema.
   * @returns Promise that will be resolved when the entity has been inserted.
   */
  insert<T>(entity: T, type: {new(): T}): Promise<T>;
}