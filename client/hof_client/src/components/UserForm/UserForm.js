import React from 'react';
import PropTypes from 'prop-types';

const UserForm = ({ user }) => (
    <ul className="list-unstyled">
        <li>
            <span>Id: {user.id}</span>
        </li>
        <li>
            <span>Firstname: {user.firstName}</span>
        </li>
        <li>
            <span>Lastname: {user.lastName}</span>
        </li>
        <li>
            <span>Email: {user.email}</span>
        </li>
        <li>
            <a href={`http:////www.eliteprospects.com/player.php?player=${user.eliteProspectId}`}>More info</a>
        </li>
    </ul>
);

UserForm.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        role: PropTypes.number,
        email: PropTypes.string,
        eliteProspectId: PropTypes.number,
    }).isRequired,
};

export default UserForm;
