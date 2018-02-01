import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import LoginContainer from '../../containers/LoginContainer';
import TopNavbarContainer from '../../containers/TopNavbarContainer';
import HomeContainer from '../../containers/HomeContainer';
import SettingsContainer from '../../containers/SettingsContainer';
import './AppFrameComponent.css';

class AppFrameComponent extends Component {
  componentWillMount() {
    const token = localStorage.getItem('id_token');
    if (token) {
      this.props.validateToken(token);
    }
  }

  renderAppView() {
    const { loadingData } = this.props;

    return (
      <Router>
        <div>
          <TopNavbarContainer />
          {
            loadingData ?
              'loading data' :
              (
                <div className="section">
                  <Route exact path="/" component={HomeContainer} />
                  <Route exact path="/settings" component={SettingsContainer} />
                </div>
              )
          }
        </div>
      </Router>
    );
  }

  render() {
    const { token, loginLoading } = this.props;
    return (
      <div>
        {loginLoading ?
          'loading' :
          (
            <div>
              {token ? this.renderAppView() : <LoginContainer />}
            </div>
          )
        }
      </div>
    );
  }
}

AppFrameComponent.propTypes = {
  token: PropTypes.string.isRequired,
  loginLoading: PropTypes.bool.isRequired,
  loadingData: PropTypes.bool.isRequired,
  validateToken: PropTypes.func.isRequired,
};

export default AppFrameComponent;
