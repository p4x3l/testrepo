export const loginUser = (email, password) => (
    fetch(
        'http://localhost:58805/api/auth/token',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        },
    )
        .then(r => r.json())
);

export const getUserData = token => (
    fetch(
        'http://localhost:58805/api/users/current',
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    )
        .then(r => r.json())
);

export const changePassword = (token, userId, newPassword, oldPassword) => (
    fetch(
        'http://localhost:58805/api/auth/password',
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                id: userId,
                password: newPassword,
                oldPassword,
            }),
        },
    )
);

export const validateToken = token => (
    fetch(
        'http://localhost:58805/api/auth/validatetoken',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
            }),
        },
    )
        .then(r => r.json())
);
