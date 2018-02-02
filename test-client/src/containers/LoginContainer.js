import { connect } from 'react-redux';

import { loginUser } from '../actions';
import LoginComponent from '../components/routes/LoginComponent/LoginComponent';

const mapStateToProps = state => (
  {
    error: state.authReducer.error,
  }
);

const mapDispatchToProps = dispatch => (
  {
    login: (username, password) => {
      dispatch(loginUser(username, password));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
