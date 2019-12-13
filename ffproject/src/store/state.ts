import Address from "models/Address";
import { Reducer, Store } from "aurelia-store";
import { Container } from "aurelia-framework";
import { ignoreElements } from "rxjs/operators";

export interface UserState {
  value1: string,
  value2: number,
  value3: boolean
}

export interface ContactState {
  name: string,
  address: Address
}

export interface State {
  contact: ContactState,
  user: UserState
}

export const initialState: State = {
  user: {
    value1: null,
    value2: null,
    value3: null
  },
  contact: {
    name: null,
    address: null
  }
};

export const dispatchify = <T, P extends any[]>(r: Reducer<T, P>, prefix: string) => {
  const store: Store<State> = Container.instance.get(Store) as Store<State>;
  if (!store.isActionRegistered(r as any)) {
      store.registerAction(prefix + r.name, r as any);
  }

  // @ts-ignore
  return (...params: P) => store.dispatch(r as any, ...params);
}
