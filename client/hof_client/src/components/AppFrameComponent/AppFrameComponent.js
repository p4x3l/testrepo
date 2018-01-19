import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';

import HomeContainer from '../../containers/HomeContainer';
import SettingsContainer from '../../containers/SettingsContainer';
import './AppFrameComponent.css';

class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
    }

    renderLoginView() {
        const {
            error,
        } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">
                        Username
                        <input
                            className="form-control"
                            type="text"
                            id="username"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="password">
                        Password
                        <input
                            className="form-control"
                            type="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btnPrimary">Login</button>
                </div>
                {error ? <div>{error}</div> : ''}
            </form>
        );
    }

    renderAppView() {
        const {
            logout,
        } = this.props;

        return (
            <Router>
                <div>
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
                    <div className="section">
                        <Route exact path="/" component={HomeContainer} />
                        <Route exact path="/settings" component={SettingsContainer} />
                    </div>
                </div>
            </Router>
        );
    }

    render() {
        const { token } = this.props;
        return (
            <div>
                {token ? this.renderAppView() : this.renderLoginView()}
            </div>
        );
    }
}

UserLogin.defaultProps = {
    error: '',
};

UserLogin.propTypes = {
    token: PropTypes.string.isRequired,
    error: PropTypes.string,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};

export default UserLogin;
