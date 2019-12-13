import { Router } from 'aurelia-router';

import * as TypeMoq from 'typemoq';
import { mock, instance, when, verify, anything, anyString, objectContaining } from 'ts-mockito';

import { TestServiceOne } from '../../services/testServiceOne/testServiceOne';
import { TestServiceTwo } from '../../services/testServiceTwo/testServiceTwo';
import { TestComponentOne } from './test-component-one';
import { Matcher } from 'ts-mockito/lib/matcher/type/Matcher';

describe('TestComponentOne Mockito', () => {
  let component: TestComponentOne;
  let testServiceOne: TestServiceOne;
  let testServiceTwo: TestServiceTwo;
  let router: Router;

  beforeEach(() => {
    testServiceOne = mock(TestServiceOne);
    when(testServiceOne.getAll()).thenCall(() => Promise.resolve([ 'TestPerson1', 'TestPerson2', 'TestPerson3' ]));
    testServiceTwo = mock(TestServiceTwo);
    router = mock(Router);
    component = new TestComponentOne(instance(router), instance(testServiceOne), instance(testServiceTwo));
  });

  it('should preload persons', () => {
    // Assert
    expect(component.persons.length).toBe(3);
  });

  it('should route to person', () => {
    // Arrange
    when(router.navigateToRoute(anyString(), anyString())).thenCall(() => Promise.resolve(true));
    
    // Act
    component.showPerson('person');
    
    // Assert
    const testObj: Matcher = objectContaining({id: 'person'});
    verify(router.navigateToRoute(anyString(), testObj)).once();
  });
});

describe('TestComponentOne Typemoq', () => {
  let component: TestComponentOne;
  let testServiceOne: TypeMoq.IMock<TestServiceOne>;
  let testServiceTwo: TypeMoq.IMock<TestServiceTwo>;
  let router: TypeMoq.IMock<Router>;

  beforeEach(() => {
    testServiceOne = TypeMoq.Mock.ofType(TestServiceOne);
    testServiceOne.setup(x => x.getAll()).returns(() => Promise.resolve([ 'TestPerson1', 'TestPerson2', 'TestPerson3' ]));
    testServiceTwo = TypeMoq.Mock.ofType(TestServiceTwo);
    router = TypeMoq.Mock.ofType(Router);
    component = new TestComponentOne(router.object, testServiceOne.object, testServiceTwo.object);
  });

  it('should preload persons', () => {
    // Assert
    expect(component.persons.length).toBe(3);
  });

  it('should route to person', () => {
    // Arrange
    router.setup(x => x.navigateToRoute(TypeMoq.It.isAnyString(), TypeMoq.It.isAnyString())).returns(() => true);

    // Act
    component.showPerson('person');

    // Assert
    router.verify(x => x.navigateToRoute(TypeMoq.It.isAnyString(), { id: 'person' }), TypeMoq.Times.once());
  });
});
