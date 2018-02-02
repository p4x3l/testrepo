import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import './TopNavbarComponent.css';

const TopNavbarComponent = ({ logout }) => (
  <div className="topBar">
    <div className="logoSection">
      <img className="logo" src={logo} alt="" />
    </div>
    <div className="menuSection">
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded topNav">
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/information/status">
                <span className="menu-header">Information</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/configuration/groups">
                <span className="menu-header">Configuration</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                <span className="menu-header">Users</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/support">
                <span className="menu-header">Support</span>
              </Link>
            </li>
          </ul>
          <div className="pull-right">
            <Link className="nav-link topBarButton" to="/messages">
              <i
                className="fa fa-envelope topBarIcon"
              />
            </Link>
            <Link className="nav-link topBarButton" to="/settings">
              <i
                className="fa fa-user-o topBarIcon"
              />
            </Link>
            <button className="btn btn-link topBarButton" onClick={() => logout()}>
              <i
                className="fa fa-cog topBarIcon"
              />
            </button>
          </div>
        </div>
      </nav>
    </div>
  </div>
);

TopNavbarComponent.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default TopNavbarComponent;
