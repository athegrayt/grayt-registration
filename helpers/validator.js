exports.userFormValidator = (req, res, next) => {
  Object.keys(req.body).forEach((key) => {
    switch (key) {
      case 'firstName':
        req.check('firstName', 'First name is required').notEmpty();
        break;
      case 'lastName':
        req.check('lastName', 'Last name is required').notEmpty();
        break;
      case 'email':
        req.check('email', 'Please enter a valid email').isEmail();
        break;
      case 'password':
        req.check('password', 'Password is required').notEmpty();
        req
          .check('password')
          .isLength({ min: 6 })
          .withMessage('Password must contain at least 6 characters')
          .matches(/\d/)
          .withMessage('Password must contain a number');
        break;
      case 'passwordVerify':
        req
          .check('passwordVerify', 'Passwords must match')
          .equals(req.body.password);
        break;
      default:
    }
  });
  const errors = req.validationErrors();

  if (errors) {
    const errorArray = errors.map((error) => error.msg);
    return res.status(400).json({ error: errorArray });
  }
  return next();
};
