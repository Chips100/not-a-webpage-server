import {CompositeLogger} from './composite.logger';

describe('CompositeLogger', () => {
  it('should delegate writes to underlying loggers', () => {
    const logger1 = { write: jest.fn() };
    const logger2 = { write: jest.fn() };

    const sut = new CompositeLogger([logger1, logger2]);
    sut.write('sometext');

    expect(logger1.write).toHaveBeenCalledWith('sometext');
    expect(logger2.write).toHaveBeenCalledWith('sometext');
  });

  it('should allow to have no underlying loggers', () => {
    const sut = new CompositeLogger([]);
    sut.write('sometext');
  });
});