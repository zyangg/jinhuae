'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const OrderSchema = new Schema({
    name1: {
      type: String,
    },
    name2: {
      type: String,
    },
    desc: {
      type: String,
    },
    name1Id: {
      type: String,
      // mongoose.Types.ObjectId(id);
    },
    postId: {
      type: String,
      // mongoose.Types.ObjectId(id);
    },
  });
  return mongoose.model('Reply1', OrderSchema, 'reply1'); // 返回model，其中projects为数据库中表的名称
};
