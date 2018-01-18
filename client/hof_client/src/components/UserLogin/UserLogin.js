import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserForm from '../UserForm/UserForm'

class UserLogin extends Component {

    renderLoginForm() {
        const { login } = this.props;
        return (
            <div>
                <div>
                    <label>Username</label>
                    <input />
                </div>
                <div>
                    <label>Password</label>
                    <input />
                </div>
                <div>
                    <button onClick={() => login('username', 'password')}>Login</button>
                </div>
            </div>
        );
    }

    renderUserForm() {
        const { token, user, logout, getUserData } = this.props;
        return (
            <div>
                <div>
                    <button onClick={() => logout()}>Logout</button>
                </div>
                <div>
                    <div>
                        Your token is {token}
                    </div>
                    {user ? <UserForm user={user} /> : <button onClick={() => getUserData()}>Get userdata</button>}
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

UserLogin.propTypes = {
    token: PropTypes.string.isRequired,
    user: PropTypes.object,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    getUserData: PropTypes.func.isRequired,
}

export default UserLogin;