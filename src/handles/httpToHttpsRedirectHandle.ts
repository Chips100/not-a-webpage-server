import connect = require('connect');

/**
 * Handle that redirects all requests to the https-version.
 * @param request Current HTTP request.
 * @param response Response for the current HTTP request.
 */
const httpToHttpsRedirectHandle: connect.SimpleHandleFunction = (request, response) => {
    // Change protocol to https.
    const httpsUrl = 'https://' + request.headers.host + request.url;

    // Redirect.
    response.writeHead(302, { Location: httpsUrl });
    response.end();
};

export {httpToHttpsRedirectHandle};