import { httpToHttpsRedirectHandle } from './httpToHttpsRedirectHandle';

describe('httpToHttpsRedirectHandle', () => {
    it('should redirect to the fully qualified HTTPS version of the url.', () => {
        const requestMock: any = {
            url: '/path',
            headers: { host: 'test.test' }
        };

        const responseMock: any = {
            code: -1,
            headers: {},
            ended: false,
            end: () => { responseMock.ended = true; },
            writeHead: (code, headers) => {
                // Ensure end is called after writeHead.
                if (responseMock.ended) throw new Error('Response has been ended.');

                responseMock.code = code;
                responseMock.headers = headers;
            }
        };

        httpToHttpsRedirectHandle(requestMock, responseMock);

        expect(responseMock.headers.Location).toEqual('https://test.test/path');
        expect(responseMock.code).toEqual(302);
        expect(responseMock.ended).toBeTruthy();
    });
});