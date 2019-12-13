import { initialState, State } from './../../store/state';
import { Container } from 'aurelia-dependency-injection';
import { Store } from 'aurelia-store';

declare type SUT = import('./store-component').StoreComponent;

describe('StoreComponent', () => {
  let container: Container;
  let store: Store<State>;
  let sut: SUT;

  beforeEach(() => {
    container = new Container().makeGlobal();
    store = new Store<State>(initialState);
    container.registerInstance(Store, store);
  });

  it('should preload persons', async () => {
    const ctor = (await import('./store-component')).StoreComponent;
    sut = new ctor(store);

    const name = 'test';
    (sut as any).name = name;
    (sut as any).changeName();

    expect((sut as any).name).not.toEqual(name);
  });
});
