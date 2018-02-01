import {
  LOGIN,
  LOGINCOMPLETE,
  LOGINERROR,
  LOGOUT,
  GETUSERDATA,
  GETUSERDATACOMPLETE,
} from '../constants/actions';

const initialState = {
  token: '',
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
        token: action.payload,
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
        user: null,
      },
    );
  case GETUSERDATA:
    return Object.assign(
      {},
      state,
      {
        user: null,
        loadingData: true,
      },
    );
  case GETUSERDATACOMPLETE:
    return Object.assign(
      {},
      state,
      {
        user: action.payload,
        loadingData: false,
      },
    );
  default:
    return state;
  }
};
