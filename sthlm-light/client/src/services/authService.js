export const loginUser = (email, password) => (
    new Promise(function(resolve, reject) {
        setTimeout(resolve, 100, 'token123');
    })
);

export const getUserData = token => (
    new Promise(function(resolve, reject) {
        setTimeout(resolve, 100, { /*replace for userdata*/ });
    })
);

export const validateToken = token => (
    new Promise(function(resolve, reject) {
        setTimeout(resolve, 100, true);
    })
);
