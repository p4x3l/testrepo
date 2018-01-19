import {
    LOGIN,
    LOGINCOMPLETE,
    LOGINERROR,
    LOGOUT,
    GETUSERDATA,
    GETUSERDATACOMPLETE,
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

export const logoutUser = () => (
    {
        type: LOGOUT,
    }
);

export const refreshUserData = token => (
    (dispatch) => {
        dispatch(fetchUserData());

        authService.getUserData(token)
            .then((response) => {
                dispatch(storeUserData(response));
            });
    }
);

export const loginUser = (email, password) => (
    (dispatch) => {
        dispatch(resetLogin());
        authService.loginUser(email, password)
            .then((response) => {
                dispatch(storeUserToken(response));
                dispatch(refreshUserData(response));
            })
            .catch(() => {
                dispatch(loginFailed());
            });
    }
);

export const validateToken = token => (
    (dispatch) => {
        dispatch(resetLogin());
        authService.validateToken(token)
            .then((isTokenValid) => {
                dispatch(storeUserToken(isTokenValid ? token : ''));

                if (isTokenValid) {
                    dispatch(refreshUserData(token));
                }
            });
    }
);
