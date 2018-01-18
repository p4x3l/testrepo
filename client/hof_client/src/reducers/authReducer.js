import {
    LOGIN,
    LOGOUT,
    GETUSERDATA,
} from '../constants/actions';
  
const initialState = {
    token: '',
    user: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log('login');
            return Object.assign(
                {},
                state,
                {
                    token: action.payload,
                },
            );
        case LOGOUT:
            console.log('logout');
            return Object.assign(
                {},
                state,
                {
                    token: '',
                },
            );
        case GETUSERDATA:
            console.log('getUser');
            console.log(action.payload);
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
