const uuidv1 = require('uuid');
const User = require('../models/user');
const { encryptPassword } = require('../helpers/dbPasswordEncryption');

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }
    req.profile = user;
    return next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findById(req.profile._id, (err, user) => {
    const updateUser = user;
    const updateFields = Object.keys(req.body);
    if (err) {
      return res.status(400).json({
        error: 'You are not authorized to perform this action.',
      });
    }
    updateFields.forEach(async (key) => {
      if (key === 'password') {
        const salt = uuidv1.v1();
        updateUser.salt = salt;
      }
      updateUser[key] = req.body[key];
    });
    if (updateFields.includes('password')) {
      return encryptPassword(req.body.password, updateUser.salt).then(
        (hashedPassword) => {
          updateUser.hashed_password = hashedPassword;
          updateUser.save((error, updatedData) => {
            if (error) {
              return res.status(400).json({
                error,
              });
            }
            return res.json(updatedData);
          });
        }
      );
    }
    return null;
  });
};
