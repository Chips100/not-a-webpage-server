import { StaticFileConfig } from './StaticFileConfig';
import path = require('path');

// These tests are pretty worthless right now (because of the simplicity of the project).
// They just serve as the basic infrastructure to be able to add tests easily in the future.
describe('StaticFileConfig', () => {
    it('should return a subdirectory of the current working directory', () => {
        expect(StaticFileConfig.getDirectory('SOME_DIRECTORY')).toEqual(path.join('SOME_DIRECTORY', 'wwwroot'));
    });
});