import { TestServiceOne } from './../testServiceOne/testServiceOne';
export class TestServiceTwo {
  constructor(private testServiceOne: TestServiceOne) {

  }

  public test1(arg1: number): number {
    return arg1 * arg1;
  }

  public test2(arg1: number, arg2: number): number {
    return arg1 * arg2;
  }

  public test3(arg1: number[]): number {
    return arg1.reduce((a, b) => a * b, 1);
  }

  public test4(arg1: number): number {
    const result = this.testServiceOne.getList();
    return result.length * arg1;
  }
}
