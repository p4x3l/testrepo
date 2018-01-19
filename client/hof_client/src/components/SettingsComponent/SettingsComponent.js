import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SettingsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            oldPassword: '',
        };

        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
        this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNewPasswordChange(event) {
        this.setState({ oldPassword: event.target.value });
    }

    handleOldPasswordChange(event) {
        this.setState({ newPassword: event.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        const {
            error,
        } = this.props;

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
                {error ? <div>{error}</div> : ''}
            </form>
        );
    }
}

SettingsComponent.defaultProps = {
    error: '',
};

SettingsComponent.propTypes = {
    token: PropTypes.string.isRequired,
    error: PropTypes.string,
};

export default SettingsComponent;
