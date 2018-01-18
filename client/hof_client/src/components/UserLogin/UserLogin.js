import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserForm from '../UserForm/UserForm';
import './UserLogin.css';

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

    renderLoginForm() {
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

    renderUserForm() {
        const {
            token,
            user,
            logout,
            getUserData,
        } = this.props;

        return (
            <div>
                <div className="section">
                    {
                        user ?
                            <UserForm user={user} /> :
                            <button
                                className="btn btn-primary"
                                onClick={() => getUserData(token)}
                            >
                                Get userdata
                            </button>
                    }
                </div>
                <div>
                    <button className="btn btn-secondary" onClick={() => logout()}>Logout</button>
                </div>
            </div>
        );
    }

    render() {
        const { token } = this.props;
        return (
            <div>
                {token ? this.renderUserForm() : this.renderLoginForm()}
            </div>
        );
    }
}

UserLogin.defaultProps = {
    user: {},
    error: '',
};

UserLogin.propTypes = {
    token: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        role: PropTypes.number,
        email: PropTypes.string,
        eliteProspectId: PropTypes.number,
    }),
    error: PropTypes.string,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    getUserData: PropTypes.func.isRequired,
};

export default UserLogin;
