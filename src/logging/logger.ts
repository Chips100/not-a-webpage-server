/**
 * Writes messages to a log.
 */
export interface Logger {
  /**
   * Writes a message to the log.
   * @param text Text of the message.
   */
  write(text: string): void;
}