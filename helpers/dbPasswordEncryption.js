const { createHmac } = require('crypto');

exports.encryptPassword = async (password, salt) => {
  if (!password) return ``;
  try {
    const hashPassword = createHmac('sha1', salt)
      .update(password)
      .digest('hex');
    return hashPassword;
  } catch (error) {
    return { error };
  }
};
