import {
    LOGIN,
    LOGINCOMPLETE,
    LOGINERROR,
    LOGOUT,
    GETUSERDATA,
} from '../constants/actions';

const initialState = {
    token: localStorage.getItem('id_token') || '',
    user: null,
    loginError: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
    case LOGIN:
        localStorage.setItem('id_token', '');
        return Object.assign(
            {},
            state,
            {
                token: '',
                error: '',
            },
        );
    case LOGINCOMPLETE:
        localStorage.setItem('id_token', action.payload);
        return Object.assign(
            {},
            state,
            {
                token: action.payload,
            },
        );
    case LOGINERROR:
        return Object.assign(
            {},
            state,
            {
                error: 'Login failed, user does not exist or password was incorrect.',
            },
        );
    case LOGOUT:
        localStorage.setItem('id_token', '');
        return Object.assign(
            {},
            state,
            {
                token: '',
                user: null,
            },
        );
    case GETUSERDATA:
        return Object.assign(
            {},
            state,
            {
                user: action.payload,
            },
        );
    default:
        return state;
    }
};
