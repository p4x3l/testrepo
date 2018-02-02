import {
  LOGIN,
  LOGINCOMPLETE,
  LOGINERROR,
  LOGOUT,
} from '../constants/actions';

import * as authService from '../services/authService';

export const resetLogin = () => (
  {
    type: LOGIN,
  }
);

export const storeUserToken = payload => (
  {
    type: LOGINCOMPLETE,
    payload,
  }
);

export const loginFailed = () => (
  {
    type: LOGINERROR,
  }
);

export const logoutUser = () => (
  {
    type: LOGOUT,
  }
);

export const loginUser = (email, password) => (
  (dispatch) => {
    dispatch(resetLogin());
    authService.loginUser(email, password)
      .then((token) => {
        authService.getPrivileges(token)
          .then(privileges => dispatch(storeUserToken({ token, privileges })))
          .catch(() => dispatch(loginFailed()));
      })
      .catch(() => dispatch(loginFailed()));
  }
);

export const validateToken = token => (
  (dispatch) => {
    dispatch(resetLogin());
    authService.validateToken(token)
      .then((isTokenValid) => {
        if (isTokenValid) {
          authService.getPrivileges(token)
            .then(privileges => dispatch(storeUserToken({ token, privileges })))
            .catch(() => dispatch(loginFailed()));
        }
      });
  }
);
