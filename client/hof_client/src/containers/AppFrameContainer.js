import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../actions';
import AppFrameComponent from '../components/AppFrameComponent/AppFrameComponent';

const mapStateToProps = state => (
    {
        token: state.authReducer.token,
        error: state.authReducer.error,
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
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(AppFrameComponent);
