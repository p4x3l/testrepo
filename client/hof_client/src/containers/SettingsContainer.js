import { connect } from 'react-redux';
import { getUserData } from '../actions';
import SettingsComponent from '../components/SettingsComponent/SettingsComponent';

const mapStateToProps = state => (
    {
        token: state.authReducer.token,
    }
);

const mapDispatchToProps = dispatch => (
    {
        getUserData: (token) => {
            dispatch(getUserData(token));
        },
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
