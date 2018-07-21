import { Configuration } from './src/Configuration';
import { StaticFileServer } from './src/StaticFileServer';
import path = require('path');
import { Logger } from './src/logging/logger';
import { ConsoleLogger } from './src/logging/console.logger';
import { DbLogger } from './src/logging/db.logger';
import { CompositeLogger } from './src/logging/composite.logger';
import { FileLogger } from './src/logging/file.logger';

const configuration = Configuration.read('./config.json');
const logger = createLogger(configuration);
const staticFileServer = new StaticFileServer(path.join(__dirname, 'wwwroot'), logger);

if (configuration.useHttps) {
    staticFileServer.serveHttps(configuration.pfxFile, configuration.pfxPassphrase);
} else {
    staticFileServer.serveHttp();
}

function createLogger(configuration: Configuration): Logger {
    const loggers = [];

    if (configuration.logging.useConsole) {
        loggers.push(new ConsoleLogger());
    }

    //if (configuration.logging.useDb) {
    //    loggers.push(new DbLogger(new SqliteRepository(configuration.repository.sqliteFilename)));
    //}

    if (configuration.logging.useFile) {
        loggers.push(new FileLogger(configuration.logging.useFile));
    }

    return new CompositeLogger(loggers);
}