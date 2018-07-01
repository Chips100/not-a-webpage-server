import connect = require('connect');
import serveStatic = require('serve-static');
import { StaticFileConfig } from './src/StaticFileConfig';

const wwwRootPath = StaticFileConfig.getDirectory(__dirname);
const port = StaticFileConfig.getPort();

// For now, this server should do nothing more than serve static files from a subdirectory.
connect().use(serveStatic(wwwRootPath)).listen(port, () => {
    console.log(`Serving files from directory '${wwwRootPath}' on port ${port}.`);
});