import { Logger } from "./logger";

/**
 * Logger that delegates all writes to a sequence of other loggers.
 */
export class CompositeLogger implements Logger {
  /**
   * Creates a CompositeLogger.
   * @param logger Sequence of loggers that should be delegated to.
   */
  public constructor(private logger: Logger[]) { }

  /**
   * Writes a message to the log.
   * @param text Text of the message.
   */
  public write(text: string): void {
    this.logger.forEach(l => l.write(text));
  }
}