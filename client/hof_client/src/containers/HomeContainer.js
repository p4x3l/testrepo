import { connect } from 'react-redux';
import { getUserData } from '../actions';
import HomeComponent from '../components/HomeComponent/HomeComponent';

const mapStateToProps = state => (
    {
        token: state.authReducer.token,
        user: state.authReducer.user,
    }
);

const mapDispatchToProps = dispatch => (
    {
        getUserData: (token) => {
            dispatch(getUserData(token));
        },
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
