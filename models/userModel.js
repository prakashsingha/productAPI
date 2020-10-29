const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema(
  {
    username: String,
    password: String,
    name: String,
    email: String
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model('user', userModel);
