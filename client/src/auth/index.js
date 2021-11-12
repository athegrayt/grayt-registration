export const signup = (user) =>
  fetch(`api/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());

export const signin = async (user) =>
  fetch(`api/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());

export const accountLookup = (email) =>
  fetch(`api/account-lookup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  }).then((res) => res.json());

export const resetPassword = (id, token, password, passwordVerify) =>
  fetch(`/api/reset-password/${id}/${token}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password, passwordVerify }),
  }).then((res) => res.json());

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    next();
    return fetch(`api/signout`, {
      method: 'GET',
    });
  }
  return null;
};

export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('jwt')) {
      return JSON.parse(localStorage.getItem('jwt'));
    }
    return false;
  }
  return false;
};
