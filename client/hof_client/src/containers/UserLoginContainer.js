import { connect } from 'react-redux';
import { loginUser, logoutUser, getUserData } from '../actions';
import UserLogin from '../components/UserLogin/UserLogin';

const mapStateToProps = state => (
    {
        token: state.authReducer.token,
        user: state.authReducer.user,
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
        getUserData: () => {
            dispatch(getUserData());
        },
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);