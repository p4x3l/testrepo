import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginComponent extends Component {
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

    this.setState({
      password: '',
    });

    this.props.login(this.state.email, this.state.password);
  }

  render() {
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
}

LoginComponent.defaultProps = {
  error: '',
};

LoginComponent.propTypes = {
  error: PropTypes.string,
  login: PropTypes.func.isRequired,
};

export default LoginComponent;
