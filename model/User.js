const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
