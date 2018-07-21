import { Logger } from "./logger";
import { dbProperty } from "../repositories/db.property.decorator";
import { dbType } from "../repositories/db.type";
import { DbRepository } from "../repositories/db.repository";

/**
 * Logger that stores messages in a database.
 */
export class DbLogger implements Logger {
  /**
   * Creates a DbLogger.
   * @param repository Repository to use for storing messages.
   */
  public constructor(private repository: DbRepository) { }
  
  /**
   * Writes a message to the log.
   * @param text Text of the message.
   */
  public write(text: string): void {
    const logEntry = new LogEntry();
    logEntry.message = text;
    logEntry.timestamp = new Date();

    this.repository.insert(logEntry, LogEntry).catch(() => {
      // Do nothing for failed logging...
    });
  }
}

class LogEntry {
  @dbProperty(dbType.date)
  timestamp: Date;

  @dbProperty(dbType.string)
  message: string;
}