import {
    LOGIN,
    LOGOUT,
    GETUSERDATA,
} from '../constants/actions';


export const loginUser = (username, password) => {
    return (dispatch) => {
        dispatch(storeUserCreds(username+password));
    }
}

export const getUserData = () => {
    return (dispatch) => {
        dispatch(storeUserData({ id: 'id', firstName: 'firstName', lastName: 'lastName', role: 2, email: 'nicklas.lidstrom@nhl.com', eliteProspectId: 722 }));
    }
}

export const storeUserCreds = (payload) => {
    return {
        type: LOGIN,
        payload,
    };
};

export const storeUserData = (payload) => {
    return {
        type: GETUSERDATA,
        payload,
    };
}

export const logoutUser = () => {
    return {
        type: LOGOUT,
    };
}
