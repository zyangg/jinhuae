'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const OrderSchema = new Schema({
    desc: {
      type: String,
    },
    newId: {
      type: String,
    },
    name: {
      type: String,
    },
  });
  return mongoose.model('NewReply', OrderSchema, 'newReply'); // 返回model，其中projects为数据库中表的名称
};
