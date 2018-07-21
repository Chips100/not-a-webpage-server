import { Logger } from "./logger";

/**
 * Logger that writes to the console.
 */
export class ConsoleLogger implements Logger {
  /**
   * Writes a message to the log.
   * @param text Text of the message.
   */
  public write(text: string): void {
    console.log(`== ${new Date().toISOString()} ======
${text}
==================================`);
  }
}