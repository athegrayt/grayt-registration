const { validate } = require('email-validator');

const formValidate = (fields) => {
  const fieldKeys = Object.keys(fields);
  const errors = [];
  fieldKeys.forEach((field) => {
    if (!fields[field]) {
      let fieldName = field;
      if (field === 'firstName') {
        fieldName = 'first name';
      }
      if (field === 'lastName') {
        fieldName = 'last name';
      }
      errors.push(`Please enter ${fieldName}`);
    }
    if (field === 'email' || (field === 'email' && fields[field])) {
      if (!validate(fields[field])) {
        errors.push('Please enter a valid email');
      }
    }
  });
  return errors.length > 0 && errors;
};
module.exports = { formValidate };
