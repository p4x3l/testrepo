import { connect } from 'react-redux';

import { loginUser, logoutUser, validateToken } from '../actions';
import AppFrameComponent from '../components/AppFrameComponent/AppFrameComponent';

const mapStateToProps = state => (
    {
        token: state.authReducer.token,
        error: state.authReducer.error,
        loginLoading: state.authReducer.loginLoading,
        loadingData: state.authReducer.loadingData,
    }
);

const mapDispatchToProps = dispatch => (
    {
        login: (username, password) => {
            dispatch(loginUser(username, password));
        },
        logout: () => {
            dispatch(logoutUser());
        },
        validateToken: (token) => {
            dispatch(validateToken(token));
        },
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(AppFrameComponent);
