export const signup = (user) =>
  fetch(`api/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });

export const signin = async (user) =>
  fetch(`api/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

export const accountLookup = (email) =>
  fetch(`api/account-lookup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => res.json())
    .catch((error) => error);

export const verifyLink = (id, token) =>
  fetch(`api/reset-password/${id}/${token}`, {
    method: 'GET',
  })
    .then((res) => {
      console.log(res);
      res.json();
    })
    .catch((err) => {
      console.error(err);
    });

export const resetPassword = (id, password, passwordVerify) =>
  fetch(`/api/reset-password/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${document.cookie.slice(2)}`,
    },
    body: JSON.stringify({ password, passwordVerify }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });

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
    })
      .then((response) => {
        console.log('signout', response);
      })
      .catch((err) => console.error(err));
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
