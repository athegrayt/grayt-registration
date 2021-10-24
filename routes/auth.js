const express = require('express');

const router = express.Router();

const {
  signup,
  signin,
  signout,
  requireSignin,
  accountLookup,
  sendEmail,
  verifyLink,
  linkSignin,
  isAuth,
} = require('../controllers/auth');
const { update, userById } = require('../controllers/user');
const { userSignupValidator } = require('../helpers/validator');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.post('/account-lookup', accountLookup, sendEmail);
router.get('/reset-password/:id/:token', verifyLink);
router.put(
  '/reset-password/:userId',
  linkSignin,
  requireSignin,
  isAuth,
  update
);
router.param('userId', userById);

module.exports = router;
