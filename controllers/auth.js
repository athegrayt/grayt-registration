require('dotenv').config();
const uuidv1 = require('uuid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { sendEmail } = require('../services/sendEmail');
const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorsHandler');
const { encryptPassword } = require('../helpers/dbPasswordEncryption');
const { noAccountData, accountData } = require('../helpers/emailTemplates');

exports.signup = async (req, res) => {
  const userData = req.body;
  userData.salt = uuidv1.v1();
  userData.hashed_password = await encryptPassword(
    userData.password,
    userData.salt
  );

  const user = User(userData);
  return user.save((error, data) => {
    const newUser = data;
    if (error) {
      if (errorHandler(error).includes('email already exists')) {
        return res.status(400).json({
          error: 'Email already exists',
        });
      }
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    newUser.salt = undefined;
    newUser.hashed_password = undefined;
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
    res.cookie('t', token, { expire: new Date() + 108000 });
    return res.json({
      user,
    });
  });
};
exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, async (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: `We don't seem to have that email in our database.`,
      });
    }
    const enteredPassword = await encryptPassword(password, user.salt);
    if (enteredPassword !== user.hashed_password) {
      return res.status(401).json({
        error: `You have entered an invalid email or password`,
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie('t', token, { expire: new Date() + 108000 });
    const { _id, name, role } = user;
    return res.json({ token, user: { _id, email: user.email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Signout Success' });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'], // added later
  userProperty: 'auth',
});

exports.isAuth = (req, res, next) => {
  const user = req.profile && req.auth && req.profile._id === req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  return next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Admin resource! Access denied',
    });
  }
  return next();
};

exports.accountLookup = (req, res) => {
  const { email } = req.body;
  if (email !== undefined) {
    User.findOne({ email }, async (error, user) => {
      if (error || !user) {
        const noAccount = noAccountData(email);
        const sendNoAccountEmail = await sendEmail(noAccount);
        res.json(sendNoAccountEmail);
      } else {
        const payload = {
          id: user._id,
          email,
        };
        const secret = `${user.password}-${user.createdAt.getTime()}`;
        const token = jwt.sign(payload, secret);
        const account = accountData(email, payload.id, token);
        const sendAccountEmail = await sendEmail(account);
        res.json(sendAccountEmail);
      }
    });
  }
};

exports.verifyLink = (req, res, next) => {
  const { token } = req.params;
  const { hashed_password, createdAt } = req.profile;
  const secret = `${hashed_password}-${createdAt.getTime()}`;
  jwt.decode(token, secret, (err, decoded) => {
    if (err || !decoded) {
      res.status(401).json({
        error: 'You are not authorized to perform this action.',
      });
    }
    req.payload = decoded;
  });
  next();
};

exports.linkSignin = (req, res, next) => {
  const user = req.body;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.cookie('t', token, { expire: new Date() + 108000 });
  next();
};
