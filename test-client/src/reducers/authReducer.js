import {
  LOGIN,
  LOGINCOMPLETE,
  LOGINERROR,
  LOGOUT,
} from '../constants/actions';

const initialState = {
  token: '',
  privileges: [],
  user: null,
  loginError: '',
  loginLoading: false,
  loadingData: false,
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
          loginLoading: true,
        },
      );
    case LOGINCOMPLETE:
      localStorage.setItem('id_token', action.payload);
      return Object.assign(
        {},
        state,
        {
          token: action.payload.token,
          privileges: action.payload.privileges,
          loginLoading: false,
        },
      );
    case LOGINERROR:
      return Object.assign(
        {},
        state,
        {
          loginLoading: false,
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
          privileges: [],
          user: null,
        },
      );
    default:
      return state;
  }
};
