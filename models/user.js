const mongoose = require('mongoose');
const uuidv1 = require('uuid');
const { encryptPassword } = require('../helpers/dbPasswordEncryption');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// virtual field

// userSchema
//   .virtual('password')
//   .set(async function (password) {
//     this._password = password;
//     this.salt = uuidv1.v1();
//     this.hashed_password = await encryptPassword(password, this.salt);
//   })
//   .get(function () {
//     return this._password;
//   });

// userSchema.methods = {
//   authenticate: function (plainText) {
//     return encryptPassword(plainText, this.salt) === this.hashed_password;
//   },
// };

module.exports = mongoose.model('User', userSchema);
