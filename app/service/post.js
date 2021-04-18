'use strict';

const Service = require('egg').Service;

class PostService extends Service {
  async index(name, desc, img, date, time, author, like, reply) {
    const { ctx } = this;
    ctx.model.Post.create({ name, desc, img, date, time, author, like, reply });
  }
  async getPost() {
    const { ctx } = this;
    const res = await ctx.model.Post.find();
    return res;
  }
  async reply(name, desc, postId) {
    const { ctx } = this;
    ctx.model.Reply.create({ name, desc, postId });
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
    return ctx.model.Reply1.remove({ _id: id });
  }
}

module.exports = PostService;
