export const loginUser = (email, password) => (
  new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'token123');
  })
);

export const validateToken = token => (
  new Promise((resolve, reject) => {
    setTimeout(resolve, 100, true);
  })
);

export const getPrivileges = token => (
  new Promise((resolve, reject) => {
    setTimeout(resolve, 100, ['user']);
  })
);
