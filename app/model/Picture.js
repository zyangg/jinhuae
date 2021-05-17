'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const OrderSchema = new Schema({
    title: {
      type: String,
    },
    date: {
      type: String,
    },
    img: {
      type: Array,
    },
    time: {
      type: String,
    },
    author: {
      type: String,
    },
    count: {
      type: Number,
      default: 0,
    },
    top: {
      type: Boolean,
      default: false,
    },
  });
  return mongoose.model('Picture', OrderSchema, 'picture'); // 返回model，其中projects为数据库中表的名称
};
