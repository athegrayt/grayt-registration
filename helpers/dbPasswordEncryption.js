const crypto = require('crypto');

exports.encryptPassword = function (password, salt) {
  if (!password) return ``;
  try {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
  } catch (err) {
    return ``;
  }
};
