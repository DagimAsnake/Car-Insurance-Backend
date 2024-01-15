const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserShema = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserShema);

module.exports = User;
