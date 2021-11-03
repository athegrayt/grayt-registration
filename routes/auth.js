const express = require('express');

const router = express.Router();

const {
  signup,
  signin,
  signout,
  requireSignin,
  accountLookup,
  verifyLink,
  linkSignin,
} = require('../controllers/auth');
const { update, userById } = require('../controllers/user');
const { userFormValidator } = require('../helpers/validator');

router.post('/signup', userFormValidator, signup);
router.post('/signin', userFormValidator, signin);
router.get('/signout', signout);
router.post('/account-lookup', userFormValidator, accountLookup);
router.get('/reset-password/:id/:token', verifyLink);
router.put(
  '/reset-password/:userId',
  linkSignin,
  requireSignin,
  userFormValidator,
  update
);
router.param('userId', userById);

module.exports = router;
