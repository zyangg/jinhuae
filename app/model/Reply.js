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
    postId: {
      type: String,
      // mongoose.Types.ObjectId(id);
    },
  });
  return mongoose.model('Reply', OrderSchema, 'reply'); // 返回model，其中projects为数据库中表的名称
};
