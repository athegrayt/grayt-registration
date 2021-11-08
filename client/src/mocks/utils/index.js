const formValidate = (fields) => {
  const fieldKeys = Object.keys(fields);
  const errors = [];
  try {
    fieldKeys.forEach((field) => {
      if (!fields[field]) {
        let fieldName = field;
        if (field === 'firstName') {
          fieldName = 'first name';
        }
        if (field === 'lastName') {
          fieldName = 'last name';
        }
        return errors.push(`Please enter ${fieldName}`);
      }

      if (field === 'password') {
        const { password } = fields;

        if (password.length < 6) {
          return errors.push('Password must contain at least 6 characters');
        }
        if (!password.match(/\d/)) {
          return errors.push('Password must contain a number');
        }
      }
      if (
        field === 'passwordVerify' &&
        fields.password !== fields.passwordVerify
      ) {
        return errors.push('Passwords must match');
      }
      return null;
    });

    return errors.length > 0 && errors;
  } catch (error) {
    return console.log(error);
  }
};
module.exports = { formValidate };
