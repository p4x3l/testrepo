import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import LoginContainer from '../../containers/LoginContainer';
import TopNavbarContainer from '../../containers/TopNavbarContainer';
import StatusComponent from '../../components/routes/Information/StatusComponent';
import MapComponent from '../../components/routes/Information/MapComponent';
import ReportsComponent from '../../components/routes/Information/ReportsComponent';
import GroupsComponent from '../../components/routes/Configuration/GroupsComponent';
import LightsComponent from '../../components/routes/Configuration/LightsComponent';
import SchedulesComponent from '../../components/routes/Configuration/SchedulesComponent';
import UsersContainer from '../../containers/UsersContainer';
import SupportContainer from '../../containers/SupportContainer';
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
                  <Route exact path="/information/status" component={StatusComponent} />
                  <Route exact path="/information/map" component={MapComponent} />
                  <Route exact path="/information/reports" component={ReportsComponent} />
                  <Route exact path="/configuration/groups" component={GroupsComponent} />
                  <Route exact path="/configuration/lights" component={LightsComponent} />
                  <Route exact path="/configuration/schedules" component={SchedulesComponent} />
                  <Route exact path="/users" component={UsersContainer} />
                  <Route exact path="/support" component={SupportContainer} />
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
