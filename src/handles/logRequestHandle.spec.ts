import {logRequestHandle} from './logRequestHandle';

describe('logRequestHandle', () => {
  it('should log incoming requests and pass on to the next middleware', () => {
    const next = jest.fn();
    const loggerMock = {
      write: jest.fn()
    }

    // Simulate incoming request.
    const request = <any>{
      url: '/someurl',
      connection: { remoteAddress: 'someip' },
      rawHeaders: ['someheader']
    };
    const response = <any>{};
    const sut = logRequestHandle(loggerMock);
    sut(request, response, next);

    // Expect log and next middleware to be called.
    expect(loggerMock.write).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);

    // Expect log message with request details.
    const logMessage = <string>loggerMock.write.mock.calls[0][0];
    expect(logMessage.includes("someurl")).toBeTruthy();
    expect(logMessage.includes("someip")).toBeTruthy();
    expect(logMessage.includes("someheader")).toBeTruthy();
  });
});