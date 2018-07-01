import connect = require('connect');

/**
 * Handle that redirects all requests to the https-version.
 */
export module HttpToHttpsRedirectHandle {
    /**
     * Creates the handle that redirects all requests to the https-version.
     * @returns A handle that redirects all requests to the https-version.
     */
    export function create(): connect.SimpleHandleFunction {
        return (req, res) => {
            // Change protocol to https.
            const httpsUrl = 'https://' + req.headers.host + req.url;

            // Redirect.
            res.writeHead(302, { Location: httpsUrl });
            res.end();
        };
    }
}