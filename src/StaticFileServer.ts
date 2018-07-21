import connect = require('connect');
import fs = require('fs');
import https = require('https');
import serveStatic = require('serve-static');
import * as express from "express-serve-static-core";
import { httpToHttpsRedirectHandle } from './handles/httpToHttpsRedirectHandle';
import { Ports } from './Ports';
import { Logger } from './logging/logger';
import { logRequestHandle } from './handles/logRequestHandle';

/**
 * Serves static files from a directory.
 */
export class StaticFileServer {
    /**
     * Creates a StaticFileServer.
     * @param serveDirectory Directory to serve files from.
     * @param logger Logger for writing log messages.
     */
    public constructor(
        private serveDirectory: string, 
        private logger: Logger) { }

    /**
     * Serves static files for the specified directory via HTTP.
     */
    public serveHttp(): void {
        connect().use(this.serveStaticWithFallbackToRoot(this.serveDirectory)).listen(Ports.HTTP, () => {
            this.logger.write(`Serving files from directory '${this.serveDirectory}' on port ${Ports.HTTP}.`);
        });
    }

    /**
     * Serves static files for the specified directory via HTTPS.
     * HTTP requests will automatically be redirected to HTTPS.
     * @param pxfFile Path to the PFX file with the SSL certificate.
     * @param pfxPassPhrase Passphrase that the PFX file is protected with.
     */
    public serveHttps(pxfFile: string, pfxPassPhrase: string) {
        https.createServer({
            pfx: fs.readFileSync(pxfFile),
            passphrase: pfxPassPhrase
        }, this.serveStaticWithFallbackToRoot(this.serveDirectory)).listen(Ports.HTTPS, () => {
            this.logger.write(`Serving files from directory '${this.serveDirectory}' on port ${Ports.HTTPS}.`);
        });

        // Redirect all non-HTTPS requests to the HTTPS version.
        connect().use(logRequestHandle(this.logger)).use(httpToHttpsRedirectHandle).listen(Ports.HTTP, () => {
            this.logger.write(`Redirecting to https on port ${Ports.HTTP}.`)
        });
    }

    /**
     * Creates a server that serves files from the specified directory;
     * falling back to the root Url '/' if the requested file could not be found (NOT redirecting).
     * @param serveDirectory Directory to serve files from.
     */
    private serveStaticWithFallbackToRoot(serveDirectory: string): connect.Server {
        const serveStaticHandler = serveStatic(serveDirectory);
        const fallbackToDefaultHandler: express.RequestHandler = (req, res, next) => {
            req.url = '/';
            return serveStaticHandler(req, res, next);
        };

        // First Middleware is the built-in serveStatic handler.
        // If the file is not found, try the built-in handler again with the root url.
        return connect().use(logRequestHandle(this.logger)).use(serveStaticHandler).use(fallbackToDefaultHandler);
    }
}