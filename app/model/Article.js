'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const OrderSchema = new Schema({
    title: {
      type: String,
    },
    describe: {
      type: String,
    },
    img: {
      type: Array,
    },
    content: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    author: {
      type: String,
    },
    type: {
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
  return mongoose.model('Article', OrderSchema, 'article'); // 返回model，其中projects为数据库中表的名称
};
