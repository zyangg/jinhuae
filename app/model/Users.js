'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const OrderSchema = new Schema({
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    manager: {
      type: Boolean,
      default: false,
    },
    yule: {
      type: Number,
      default: 0,
    },
    meishi: {
      type: Number,
      default: 0,
    },
    shehui: {
      type: Number,
      default: 0,
    },
    caijing: {
      type: Number,
      default: 0,
    },
    shizheng: {
      type: Number,
      default: 0,
    },
    keji: {
      type: Number,
      default: 0,
    },
  });
  return mongoose.model('Users', OrderSchema, 'users'); // 返回model，其中projects为数据库中表的名称
};
