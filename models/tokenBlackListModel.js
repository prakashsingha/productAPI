const mongoose = require('mongoose');

const { Schema } = mongoose;

const tokenBlackListModel = new Schema(
  {
    username: String,
    token: String
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model('TokenBlackList', tokenBlackListModel);
