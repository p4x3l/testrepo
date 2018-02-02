import {
  GETUSERDATA,
  GETUSERDATACOMPLETE,
} from '../constants/actions';

import * as userService from '../services/userService';

export const fetchUserData = () => (
  {
    type: GETUSERDATA,
  }
);

export const storeUserData = payload => (
  {
    type: GETUSERDATACOMPLETE,
    payload,
  }
);

export const refreshUserData = token => (
  (dispatch) => {
    dispatch(fetchUserData());

    userService.getUserData(token)
      .then((response) => {
        dispatch(storeUserData(response));
      });
  }
);
