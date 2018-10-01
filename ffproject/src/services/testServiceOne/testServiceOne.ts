export class TestServiceOne {
  constructor(private mockApi: MockApi) {

  }

  public async get(arg1: string): Promise<string> {
    try {
      const response = await this.mockApi.get(arg1);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getAll(): Promise<string[]> {
    try {
      const response = await this.mockApi.getAll();
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async create(arg1: string): Promise<string> {
    try {
      const response = await this.mockApi.create(arg1);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async delete(arg1: string): Promise<void> {
    try {
      await this.mockApi.delete(arg1);
    } catch (error) {
      throw error;
    }
  }

  public getList(): string[] {
    return [ 'a', 'b', 'c' ];
  }
}

export class MockApi {
  public get(arg1: string): Promise<string> {
    return Promise.resolve("Bob");
  }

  public getAll(): Promise<string[]> {
    return Promise.resolve([ "Bob", "Scott" ]);
  }

  public create(arg1: string): Promise<string> {
    return Promise.resolve(arg1);
  }

  public delete(arg1: string): Promise<void> {
    return Promise.resolve();
  }
}
