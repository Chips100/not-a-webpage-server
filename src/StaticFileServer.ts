import connect = require('connect');
import fs = require('fs');
import https = require('https');
import serveStatic = require('serve-static');
import * as express from "express-serve-static-core";
import { httpToHttpsRedirectHandle } from './handles/httpToHttpsRedirectHandle';
import { Ports } from './Ports';

/**
 * Serves static files from a directory.
 */
export module StaticFileServer {
    /**
     * Serves static files for the specified directory via HTTP.
     * @param serveDirectory Directory to serve files from.
     */
    export function serveHttp(serveDirectory: string) {
        connect().use(serveStaticWithFallbackToRoot(serveDirectory)).listen(Ports.HTTP, () => {
            console.log(`Serving files from directory '${serveDirectory}' on port ${Ports.HTTP}.`);
        });
    }

    /**
     * Serves static files for the specified directory via HTTPS.
     * HTTP requests will automatically be redirected to HTTPS.
     * @param serveDirectory Directory to serve files from.
     * @param pxfFile Path to the PFX file with the SSL certificate.
     * @param pfxPassPhrase Passphrase that the PFX file is protected with.
     */
    export function serveHttps(serveDirectory: string, pxfFile: string, pfxPassPhrase: string) {
        https.createServer({
            pfx: fs.readFileSync(pxfFile),
            passphrase: pfxPassPhrase
        }, serveStaticWithFallbackToRoot(serveDirectory)).listen(Ports.HTTPS, () => {
            console.log(`Serving files from directory '${serveDirectory}' on port ${Ports.HTTPS}.`);
        });

        // Redirect all non-HTTPS requests to the HTTPS version.
        connect().use(httpToHttpsRedirectHandle).listen(Ports.HTTP, () => {
            console.log(`Redirecting to https on port ${Ports.HTTP}.`)
        });
    }

    /**
     * Creates a server that serves files from the specified directory;
     * falling back to the root Url '/' if the requested file could not be found (NOT redirecting).
     * @param serveDirectory Directory to serve files from.
     */
    function serveStaticWithFallbackToRoot(serveDirectory: string): connect.Server {
        const serveStaticHandler = serveStatic(serveDirectory);
        const fallbackToDefaultHandler: express.RequestHandler = (req, res, next) => {
            req.url = '/';
            return serveStaticHandler(req, res, next);
        };

        // First Middleware is the built-in serveStatic handler.
        // If the file is not found, try the built-in handler again with the root url.
        return connect().use(serveStaticHandler).use(fallbackToDefaultHandler);
    }
}