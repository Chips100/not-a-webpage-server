import { Configuration } from './src/Configuration';
import { StaticFileServer } from './src/StaticFileServer';
import path = require('path');

const configuration = Configuration.read('./config.json');
const serveDirectory = path.join(__dirname, 'wwwroot');

if (configuration.useHttps) {
    StaticFileServer.serveHttps(serveDirectory, configuration.pfxFile, configuration.pfxPassphrase);
} else {
    StaticFileServer.serveHttp(serveDirectory);
}