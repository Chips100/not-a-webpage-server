import path = require('path');

/**
 * Provides configuration for serving static files.
 */
export module StaticFileConfig {
    /**
     * Gets the port on which the static files should be served.
     * @returns The port on which the static files should be served.
     */
    export function getPort(): number {
        return 80;
    }

    /**
     * Gets the directory from which the static files should be served.
     * @param workingDirectory The current working directory of the application.
     * @returns The directory from which the static files should be served.
     */
    export function getDirectory(workingDirectory: string): string {
        return path.join(workingDirectory, 'wwwroot');
    }
}