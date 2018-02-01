import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as authService from '../../services/authService';

class SettingsComponent extends Component {
  render() {
    return (
      <div>Settings component</div>
    );
  }
}

SettingsComponent.propTypes = {
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default SettingsComponent;
