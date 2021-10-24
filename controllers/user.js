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
  req.body = { hashed_password: encryptPassword(req.body.password) };
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      const updateUser = user;
      if (err) {
        return res.status(400).json({
          error: 'You are not authorized to perform this action.',
        });
      }
      updateUser.hashed_password = undefined;
      updateUser.salt = undefined;
      return res.json(user);
    }
  );
};
