import fs = require('fs');

/**
 * Represents the configuration of the application.
 */
export class Configuration {
    // Private constructor to force creation with read method.
    private constructor() {}
    
    /**
     * Gets the path to the PFX file for SSL.
     */
    public readonly pfxFile: string;

    /**
     * Gets the passphrase to the PFX file for SSL.
     */
    public readonly pfxPassphrase: string;

    /**
     * True, if the Server should use HTTPS; otherwise false.
     */
    public readonly useHttps: boolean;

    /**
     * Reads the configuration from the specified file.
     * @param configFile File to read the configuration from.
     */
    public static read(configFile: string): Configuration {
        return JSON.parse(fs.readFileSync(configFile, "utf8"));
    }
}