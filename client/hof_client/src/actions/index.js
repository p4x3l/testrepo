import {
    LOGIN,
    LOGINCOMPLETE,
    LOGINERROR,
    LOGOUT,
    GETUSERDATA,
} from '../constants/actions';

export const resetLogin = () => (
    {
        type: LOGIN,
    }
)

export const storeUserCreds = payload => (
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

export const storeUserData = payload => (
    {
        type: GETUSERDATA,
        payload,
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
        fetch(
            'http://localhost:58805/api/auth/token',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            },
        )
            .then(r => r.json())
            .then((response) => {
                dispatch(storeUserCreds(response));
            })
            .catch(() => {
                dispatch(loginFailed());
            });
    }
);

export const getUserData = token => (
    (dispatch) => {
        dispatch(storeUserData({}));

        fetch(
            'http://localhost:58805/api/users/current',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        )
            .then(r => r.json())
            .then((response) => {
                dispatch(storeUserData(response));
            });
    }
);
