import { Logger } from "./logger";
import fs = require('fs');

/**
 * Writes log entries to a file in plain text.
 */
export class FileLogger implements Logger {
  /**
   * Creates a FileLogger.
   * @param filename Name of the file to write to.
   */
  public constructor(private filename: string) { }

  /**
   * Writes a message to the log.
   * @param text Text of the message.
   */
  public write(text: string): void {
    fs.appendFile(this.filename, `
== ${new Date().toISOString()} ======
${text}
==================================`, err => {
      // Do nothing for failed logging...
    });
  }
}