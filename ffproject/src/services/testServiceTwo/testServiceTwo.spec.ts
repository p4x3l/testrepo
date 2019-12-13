import * as TypeMoq from 'typemoq';
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { Substitute, Arg, SubstituteOf } from '@fluffy-spoon/substitute';

import { TestServiceOne } from '../testServiceOne/testServiceOne';
import { TestServiceTwo } from './testServiceTwo';

describe('TestServiceTwo Mockito', () => {
  let service: TestServiceTwo;
  let testServiceOne: TestServiceOne;

  beforeEach(() => {
    testServiceOne = mock(TestServiceOne);
    service = new TestServiceTwo(instance(testServiceOne));
  });

  it('should run test1', () => {
    // Act
    const result = service.test1(5);

    // Assert
    expect(result).toBe(25);
  });

  it('should run test2', () => {
    // Act
    const result = service.test2(2, 5);

    // Assert
    expect(result).toBe(10);
  });

  it('should run test3', () => {
    // Act
    const result = service.test3([ 2, 4, 3 ]);

    // Assert
    expect(result).toBe(24);
  });

  it('should run test4', () => {
    // Arrange
    when(testServiceOne.getList()).thenReturn([ 'a', 'b', 'c', 'd' ]);

    // Act
    const result = service.test4(4);

    // Assert
    expect(result).toBe(16);
    verify(testServiceOne.getList()).once();
  });
});

describe('TestServiceTwo Typermoq', () => {
  let service: TestServiceTwo
  let testServiceOne: TypeMoq.IMock<TestServiceOne>;;

  beforeEach(() => {
    testServiceOne = TypeMoq.Mock.ofType(TestServiceOne);
    service = new TestServiceTwo(testServiceOne.object);
  });

  it('should run test4', () => {
    // Arrange
    testServiceOne.setup(x => x.getList()).returns(() => [ 'a', 'b', 'c', 'd' ]);

    // Act
    const result = service.test1(5);

    // Assert
    expect(result).toBe(25);
  });
});

describe('TestServiceTwo substitute', () => {
  let service: TestServiceTwo
  let testServiceOne: SubstituteOf<TestServiceOne>;;

  beforeEach(() => {
    testServiceOne = Substitute.for<TestServiceOne>();
    service = new TestServiceTwo(testServiceOne);
  });

  it('should run test4', () => {
    // Arrange
    testServiceOne.getList().returns([ 'a', 'b', 'c', 'd' ]);

    // Act
    const result = service.test1(5);

    // Assert
    expect(result).toBe(25);
  });
});
