import {dbProperty, getDbPropertiesOf} from './db.property.decorator';
import {dbType} from './db.type';

describe('dbProperty', () => {
  it('should provide information about decorated properties', () => {
    const properties = getDbPropertiesOf(TestEntity);

    expect(properties.length).toEqual(3);

    const someStringProp = properties.find(x => x.propertyName === 'someString');
    expect(someStringProp).toBeTruthy();
    expect(someStringProp.dbName).toEqual('someString');

    expect(someStringProp.dbType).toEqual(dbType.string);
    const someStringProp2 = properties.find(x => x.propertyName === 'someString2');
    expect(someStringProp2).toBeTruthy();
    expect(someStringProp2.dbName).toEqual('othername');
    expect(someStringProp2.dbType).toEqual(dbType.string);
    
    const someNumberProp = properties.find(x => x.propertyName === 'someNumber');
    expect(someNumberProp).toBeTruthy();
    expect(someNumberProp.dbName).toEqual('someNumber');
    expect(someNumberProp.dbType).toEqual(dbType.number);
  });

  class TestEntity {
    @dbProperty(dbType.string)
    public someString: string;

    @dbProperty(dbType.string, 'othername')
    public someString2: string;
    
    @dbProperty(dbType.number)
    public someNumber: number;
  }
});