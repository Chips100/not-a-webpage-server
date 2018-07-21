import connect = require('connect');
import { Logger } from '../logging/logger';

/**
 * Logs incoming requests before passing them on to the next middleware.
 * @param logger Logger to use for writing log entries.
 */
export const logRequestHandle = (logger: Logger): connect.NextHandleFunction => {
  return (request, response, next) => {
    // Write request info to log.
    logger.write([
      'URL: ' + request.url, 
      'FROM: ' + request.connection.remoteAddress,
      'HEADERS: ' + request.rawHeaders.join('|')
    ].join('\n'));

    // Pass request on to actual middleware.
    next();
  };
};