import connect = require('connect');
import serveStatic = require('serve-static');
import https = require('https');
import fs = require('fs');
import { StaticFileConfig } from './src/StaticFileConfig';
import { HttpToHttpsRedirectHandle } from './src/HttpToHttpsRedirectHandle';
import { Configuration } from './src/Configuration';

const configuration = Configuration.read('./config.json');
const wwwRootPath = StaticFileConfig.getDirectory(__dirname);
const httpPort = 80;
const httpsPort = 443;

// For now, this server should do nothing more than serve static files from a subdirectory.
// This will be done with SSL.
https.createServer({
    pfx: fs.readFileSync(configuration.pfxFile),
    passphrase: configuration.pfxPassphrase
}, connect().use(serveStatic(wwwRootPath))).listen(httpsPort, () => {
    console.log(`Serving files from directory '${wwwRootPath}' on port ${httpsPort}.`);
});

// Redirect all non-HTTPS requests to the HTTPS version.
connect().use(HttpToHttpsRedirectHandle.create()).listen(httpPort, () => {
    console.log(`Redirecting to https on port ${httpPort}.`)
});