import React from 'react';
import PropTypes from 'prop-types';

import UserForm from '../UserForm/UserForm';

const HomeComponent = ({ user, token, refreshUserData }) => (
    <div>
        {user ? <UserForm user={user} /> : ''}
        <button
            className="btn btn-primary"
            onClick={() => refreshUserData(token)}
        >
            Refresh userdata
        </button>
    </div>
);

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
    refreshUserData: PropTypes.func.isRequired,
};

export default HomeComponent;
