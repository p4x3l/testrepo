import * as TypeMoq from 'typemoq';
import { mock, instance, when, verify, anything } from 'ts-mockito';

import { TestServiceOne, MockApi } from './testServiceOne'

describe('TestServiceOne Mockito', () => {
  let service: TestServiceOne;
  let mockApi: MockApi;

  beforeEach(() => {
    mockApi = mock(MockApi);
    service = new TestServiceOne(instance(mockApi));
  });

  it('should get person', async () => {
    // Arrange
    when(mockApi.get(anything())).thenCall(() => Promise.resolve('TestPerson'));

    // Act
    const result = await service.get('Person');

    // Assert
    expect(result).toEqual('TestPerson');
    verify(mockApi.get('Person')).once();
  });

  it('should throw on error when fetching person', async () => {
    // Arrange
    when(mockApi.get(anything())).thenCall(() => Promise.reject('Failed'));

    // Act
    try {
      const result = await service.get('Person');
    } catch (error) {
      expect(error).toEqual('Failed');
    }

    // Assert
    verify(mockApi.get('Person')).once();
  });

  it('should get personlist', async () => {
    // Arrange
    when(mockApi.getAll()).thenCall(() => Promise.resolve([ 'TestPerson1', 'TestPerson2', 'TestPerson3' ]));

    // Act
    const result = await service.getAll();

    // Assert
    expect(result.length).toBe(3);
    verify(mockApi.getAll()).once();
  });

  it('should throw on error when fetching personlist', async () => {
     // Arrange
     when(mockApi.getAll()).thenCall(() => Promise.reject('Failed'));
 
     // Act
     try {
       const result = await service.getAll();
     } catch (error) {
       expect(error).toEqual('Failed');
     }
 
     // Assert
     verify(mockApi.getAll()).once();
  });

  it('should delete person', async () => {
    // Arrange
    when(mockApi.delete(anything())).thenCall(() => Promise.resolve(null));

    // Act
    await service.delete('Person');

    // Assert
    verify(mockApi.delete('Person')).once();
  });
});

describe('TestServiceOne Typermoq', () => {
  let service: TestServiceOne;
  let mockApi: TypeMoq.IMock<MockApi>;;

  beforeEach(() => {
    mockApi = TypeMoq.Mock.ofType(MockApi);
    service = new TestServiceOne(mockApi.object);
  });

  it('should get person', async () => {
    // Arrange
    mockApi.setup(x => x.get(TypeMoq.It.isAnyString())).returns(() => Promise.resolve('TestPerson'));

    // Act
    const result = await service.get('Person');

    // Assert
    expect(result).toEqual('TestPerson');
    mockApi.verify(x => x.get('Person'), TypeMoq.Times.once());
  });

  it('should throw on error when fetching person', async () => {
    // Arrange
    mockApi.setup(x => x.get(TypeMoq.It.isAnyString())).returns(() => Promise.reject('Failed'));

    // Act
    try {
      const result = await service.get('Person');
    } catch (error) {
      expect(error).toEqual('Failed');
    }

    // Assert
    mockApi.verify(x => x.get('Person'), TypeMoq.Times.once());
  });

  it('should get personlist', async () => {
    // Arrange
    mockApi.setup(x => x.getAll()).returns(() => Promise.resolve(['TestPerson1', 'TestPerson2', 'TestPerson3']));

    // Act
    const result = await service.getAll();

    // Assert
    expect(result.length).toBe(3);
    mockApi.verify(x => x.getAll(), TypeMoq.Times.once());
  });

  it('should throw on error when fetching personlist', async () => {
     // Arrange
     mockApi.setup(x => x.getAll()).returns(() => Promise.reject('Failed'));
 
     // Act
     try {
       const result = await service.getAll();
     } catch (error) {
       expect(error).toEqual('Failed');
     }
 
     // Assert
     mockApi.verify(x => x.getAll(), TypeMoq.Times.once());
  });

  it('should delete person', async () => {
    // Arrange
    mockApi.setup(x => x.delete(TypeMoq.It.isAnyString())).returns(() => Promise.resolve(null));

    // Act
    const result = await service.delete('Person');

    // Assert
    mockApi.verify(x => x.delete('Person'), TypeMoq.Times.once());
  });
});
