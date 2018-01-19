import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as authService from '../../services/authService';

class SettingsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            oldPassword: '',
            error: '',
        };

        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
        this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNewPasswordChange(event) {
        this.setState({ newPassword: event.target.value });
    }

    handleOldPasswordChange(event) {
        this.setState({ oldPassword: event.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        authService.changePassword(
            this.props.token,
            this.props.userId,
            this.state.newPassword,
            this.state.oldPassword,
        )
            .catch(() => {
                this.setState({ error: 'Failed to change password' });
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="oldpassword">
                        Old password
                        <input
                            className="form-control"
                            type="password"
                            id="oldpassword"
                            value={this.state.oldPassword}
                            onChange={this.handleOldPasswordChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="newpassword">
                        New Password
                        <input
                            className="form-control"
                            type="password"
                            id="newpassword"
                            value={this.state.newPassword}
                            onChange={this.handleNewPasswordChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btnPrimary">Sumbit</button>
                </div>
                {this.state.error ? <div>{this.state.error}</div> : ''}
            </form>
        );
    }
}

SettingsComponent.propTypes = {
    token: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
};

export default SettingsComponent;
