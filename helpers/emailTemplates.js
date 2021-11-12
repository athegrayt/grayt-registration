const accountData = (email, id, token) => ({
  email,
  message: `Please click on link to reset password`,
  link: `<a href="https://graytcommerce-registration.herokuapp.com/reset-password/${id}/${token}">https://graytcommerce-registration.herokuapp.com/reset-password/${id}/${token}</a>`,
});

const noAccountData = (email) => ({
  email,
  message: `We don't seem to have that email in our database. Please signup!`,
  link: `<a href="https://graytcommerce-registration.herokuapp.com/auth">https://graytcommerce-registration.herokuapp.com/auth</a>`,
});

module.exports = { accountData, noAccountData };
