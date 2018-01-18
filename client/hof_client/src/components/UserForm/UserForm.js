import React from 'react';
import PropTypes from 'prop-types';

const UserForm = ({ user }) => (
    <div>
        <div>
            Id: {user.id}
        </div>
        <div>
            Firstname: {user.firstName}
        </div>
        <div>
            Lastname: {user.lastName}
        </div>
        <div>
            Email: {user.email}
        </div>
        <div>
            <a href={'http:////www.eliteprospects.com/player.php?player=' + user.eliteProspectId}>More info</a>
        </div>
    </div>
  );

UserForm.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UserForm;
