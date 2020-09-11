import {Router} from 'aurelia-router';

import { TestServiceOne } from '../../services/testServiceOne/testServiceOne';
import { TestServiceTwo } from '../../services/testServiceTwo/testServiceTwo';

export class TestComponentOne {
  public persons: string[];
  static inject() { return [Router]; }

  constructor(private router: Router, private testServiceOne: TestServiceOne, private testServiceTwo: TestServiceTwo) {
    testServiceOne.getAll()
      .then((result) => {
        this.persons = result;
      });
  }

  public showPerson(id: string): void {
    this.router.navigateToRoute('personDetails', { id });
  }

  public calcNumbers(arg1: number, arg2: number): number {
    return this.testServiceTwo.test2(arg1, arg2);
  }

  public getNumberOfPersons(): number {
    return this.persons.length;
  }
}
