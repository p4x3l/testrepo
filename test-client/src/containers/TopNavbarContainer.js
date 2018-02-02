import { connect } from 'react-redux';

import { logoutUser } from '../actions';
import TopNavbarComponent from '../components/TopNavbarComponent/TopNavbarComponent';

const mapDispatchToProps = dispatch => (
  {
    logout: (username, password) => {
      dispatch(logoutUser(username, password));
    },
  }
);

export default connect(null, mapDispatchToProps)(TopNavbarComponent);
