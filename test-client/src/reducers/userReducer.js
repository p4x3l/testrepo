import {
  GETUSERDATA,
  GETUSERDATACOMPLETE,
} from '../constants/actions';

const initialState = {
  user: null,
  loadingData: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
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
