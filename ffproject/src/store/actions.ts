import Address from 'models/Address';
import produce from 'immer';
import { dispatchify, State } from "./state";

const _updateContactAddress = (oldState: State, address: Address) => {
  const fn = (newState: State) => {
    newState.contact.address = address;
  };

  return produce(oldState, fn);
};

const _updateContactName = (oldState: State, name: string) => {
  const fn = (newState: State) => {
    newState.contact.name = name;
  };

  return produce(oldState, fn);
};

export const updateContactAddress = dispatchify(_updateContactAddress, "test");
export const updateContactName = dispatchify(_updateContactName, "test");
