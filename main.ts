import { Configuration } from './src/Configuration';
import { StaticFileServer } from './src/StaticFileServer';
import path = require('path');
import { SqliteRepository } from './src/repositories/sqlite/sqlite.repository';
import { Logger } from './src/logging/logger';
import { ConsoleLogger } from './src/logging/console.logger';
import { DbLogger } from './src/logging/db.logger';
import { CompositeLogger } from './src/logging/composite.logger';
import { DbRepository } from './src/repositories/db.repository';

const configuration = Configuration.read('./config.json');
const repository = new SqliteRepository(configuration.repository.sqliteFilename);
const logger = createLogger(configuration, repository);
const staticFileServer = new StaticFileServer(path.join(__dirname, 'wwwroot'), logger);

if (configuration.useHttps) {
    staticFileServer.serveHttps(configuration.pfxFile, configuration.pfxPassphrase);
} else {
    staticFileServer.serveHttp();
}

function createLogger(configuration: Configuration, repository: DbRepository): Logger {
    const loggers = [];

    if (configuration.logging.useConsole) {
        loggers.push(new ConsoleLogger());
    }

    if (configuration.logging.useDb) {
        loggers.push(new DbLogger(repository));
    }

    return new CompositeLogger(loggers);
}