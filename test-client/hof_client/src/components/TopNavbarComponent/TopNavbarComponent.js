import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TopNavbarComponent = ({ logout }) => (
  <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/settings">Settings</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/topics">Topics</Link>
        </li>
      </ul>
      <button
        className="btn btn-secondary pull-right"
        onClick={() => logout()}
      >
      Logout
      </button>
    </div>
  </nav>
);

TopNavbarComponent.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default TopNavbarComponent;
