'use strict';

const Service = require('egg').Service;

class PostService extends Service {
  async index(name, desc, img, date, time, author, like, reply) {
    const { ctx } = this;
    ctx.model.Post.create({ name, desc, img, date, time, author, like, reply });
  }
  async reply(name, desc, postId, reply) {
    const { ctx } = this;
    ctx.model.Reply.create({ name, desc, postId });
    return ctx.model.Post.update({ _id: postId }, {
      $set: { reply: reply + 1 },
    });
  }
  async reply1(name1, name2, desc, name1Id, postId) {
    const { ctx } = this;
    ctx.model.Reply1.create({ name1, name2, desc, name1Id, postId });
  }
  async getReply(data) {
    const { ctx } = this;
    return ctx.model.Reply.find({ postId: data });
  }
  async getReply1(data) {
    const { ctx } = this;
    return ctx.model.Reply1.find({ name1Id: data });
  }
  async delPost(id) {
    const { ctx } = this;
    return ctx.model.Post.remove({ _id: id });
  }
  async getPost(size, currentPage) {
    const { ctx } = this;
    const res1 = await ctx.model.Post.find().count();
    const res2 = await ctx.model.Post.find().limit(size).skip(size * (currentPage - 1));
    return {
      total: res1,
      res: res2,
    };
  }
  async getPostOne(id) {
    const { ctx } = this;
    const res = await ctx.model.Post.find({ _id: id });
    return res;
  }
  async delPostComment(id, postId, reply) {
    const { ctx } = this;
    await ctx.model.Reply.remove({ _id: id });
    return ctx.model.Post.update({ _id: postId }, {
      $set: { reply: reply - 1 },
    });
  }
  async likePost(postId, likes) {
    const { ctx } = this;
    return await ctx.model.Post.update({ _id: postId }, {
      $set: { like: likes + 1 },
    });
  }
  async delPostReply(id) {
    const { ctx } = this;
    const res = await ctx.model.Reply1.remove({ _id: id });
    return res;
  }
  async findPost(size, currentPage, value) {
    const { ctx } = this;
    const res1 = await ctx.model.Post.find(
      {
        $or: [
          { name: { $regex: value } },
          { author: { $regex: value } }, { desc: { $regex: value } },
        ] }
    ).count();
    const res2 = await ctx.model.Post.find(
      {
        $or: [
          { name: { $regex: value } },
          { author: { $regex: value } }, { desc: { $regex: value } },
        ] }
    ).limit(size).skip(size * (currentPage - 1));
    return {
      total: res1,
      res: res2,
    };
  }

}

module.exports = PostService;
