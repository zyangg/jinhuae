'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const OrderSchema = new Schema({
    name: {
      type: String,
    },
    desc: {
      type: String,
    },
    author: {
      type: String,
    },
    img: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    like: {
      type: Number,
    },
    reply: {
      type: Number,
    },
  });
  return mongoose.model('Post', OrderSchema, 'post'); // 返回model，其中projects为数据库中表的名称
};
