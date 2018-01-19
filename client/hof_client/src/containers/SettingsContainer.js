import { connect } from 'react-redux';
import { refreshUserData } from '../actions';
import SettingsComponent from '../components/SettingsComponent/SettingsComponent';

const mapStateToProps = state => (
    {
        token: state.authReducer.token,
        userId: (state.authReducer.user || {}).id,
    }
);

const mapDispatchToProps = dispatch => (
    {
        refreshUserData: (token) => {
            dispatch(refreshUserData(token));
        },
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
