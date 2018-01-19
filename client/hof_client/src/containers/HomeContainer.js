import { connect } from 'react-redux';
import { refreshUserData } from '../actions';
import HomeComponent from '../components/HomeComponent/HomeComponent';

const mapStateToProps = state => (
    {
        token: state.authReducer.token,
        user: state.authReducer.user,
        loadingData: state.authReducer.loadingData,
    }
);

const mapDispatchToProps = dispatch => (
    {
        refreshUserData: (token) => {
            dispatch(refreshUserData(token));
        },
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
