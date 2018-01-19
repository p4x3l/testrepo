import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserForm from '../UserForm/UserForm';

class HomeComponent extends Component {
    renderUser() {
        return <UserForm user={this.props.user} />;
    }

    renderButton() {
        return (
            <button
                className="btn btn-primary"
                onClick={() => this.props.getUserData(this.props.token)}
            >
                Get userdata
            </button>
        );
    }

    render() {
        const {
            user,
        } = this.props;

        return (
            <div>
                {user ? this.renderUser(user) : this.renderButton()}
            </div>
        );
    }
}

HomeComponent.defaultProps = {
    user: null,
};

HomeComponent.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        role: PropTypes.number,
        email: PropTypes.string,
        eliteProspectId: PropTypes.number,
    }),
    token: PropTypes.string.isRequired,
    getUserData: PropTypes.func.isRequired,
};

export default HomeComponent;
