const User = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken'); //generate webtoken
const expressJwt = require('express-jwt'); //authorization check
const { errorHandler } = require('../helpers/dbErrorsHandler');
const user = require('../models/user');
const { SERVER } = '../../ecommerce-frontend/src/config.js';

exports.signup = (req, res) => {
  const user = User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};
exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: `We don't seem to have that email in our database. Please signup!`,
      });
    }
    // if user is found make sure the email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: `Email and password don't match`,
      });
    }
    //generate a signed token with user
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 108000 });
    //return response with user and token to front client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
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
  console.log(`isAuth-body: ${req.body.password}`);
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Admin resource! Access denied',
    });
  }
  next();
};
exports.sendEmail = (req, res) => {
  const { email, message, link } = req.accountData;
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email, // Change to your recipient
    from: 'graytcommerce@gmail.com', // Change to your verified sender
    subject: 'Graytcommerce Password Reset',
    text: message,
    html: `<strong>${link}</strong>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      res.send('success');
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send('fail');
    });
};

exports.accountLookup = (req, res, next) => {
  const { email } = req.body;
  if (email !== undefined) {
    User.findOne({ email }, (error, user) => {
      if (error || !user) {
        req.accountData = {
          email,
          message: `We don't seem to have that email in our database. Please signup!`,
          link: `<a href="${SERVER}/signup">Create a new account.</a>`,
        };
        next();
      } else {
        const payload = {
          id: user._id,
          email,
        };
        const secret = user.password + '-' + user.createdAt.getTime();
        const token = jwt.sign(payload, secret);

        // '<a href="/resetpassword/' + payload.id + '/' + token + '">Reset password</a>'
        req.accountData = {
          email,
          message: `Please click on link to reset password`,
          link: `<a href="${SERVER}/reset-password/${payload.id}/${token}">Reset password</a>`,
        };
        next();
      }
    });
  }
};

exports.verifyLink = (req, res) => {
  const { id, token } = req.params;
  User.findById(id, (err, user) => {
    if (err) {
      console.log(err);
      res
        .status(400)
        .json({ error: "You don't seem to be authorized to access this link" });
    } else {
      const { password, createdAt } = user;
      const secret = password + '-' + createdAt.getTime();
      const payload = jwt.decode(token, secret);
      return res.json({ payload });
    }
  });
};

exports.linkSignin = (req, res, next) => {
  console.log(`linkSignin-body: ${req.body}`);
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  //persist the token as 't' in cookie with expiry date
  res.cookie('t', token, { expire: new Date() + 108000 });
  next();
};
