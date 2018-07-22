import {DbLogger} from './db.logger';

describe('DbLogger', () => {
  it('should store log entries to a repository', () => {
    const repositoryMock = { insert: jest.fn(x => Promise.resolve()) };

    const sut = new DbLogger(repositoryMock);
    sut.write('sometext');

    expect(repositoryMock.insert).toHaveBeenCalled();
    const logEntity = repositoryMock.insert.mock.calls[0][0];
    expect(logEntity.message).toEqual('sometext');
    expect(+logEntity.timestamp / 1000).toBeCloseTo(+new Date() / 1000, 0);
  });
});