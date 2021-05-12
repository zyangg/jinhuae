'use strict';

const Controller = require('egg').Controller;

class PostController extends Controller {
  async index() {
    const {
      ctx,
    } = this;
    const form = ctx.request.body;
    const name = form.data.name;
    const desc = form.data.desc;
    const img = form.data.dialogImageUrl;
    const author = form.data.author;
    const date = form.data.date;
    const time = form.data.time;
    const like = form.data.like;
    const reply = form.data.reply;
    const res = await ctx.service.post.index(name, desc, img, date, time, author, like, reply);
    ctx.body = {
      res,
    };
  }
  async getPost() {
    const { ctx } = this;
    const size = ctx.request.body.data.size;
    const currentPage = ctx.request.body.data.currentpage;
    const res = await ctx.service.post.getPost(size, currentPage);
    ctx.body = {
      res,
    };
  }
  async getPostOne() {
    const { ctx } = this;
    const id = ctx.request.body.data;
    const res = await ctx.service.post.getPostOne(id);
    ctx.body = {
      res,
    };
  }
  async delPost() {
    const { ctx } = this;
    const id = ctx.request.body.data;
    const res = await ctx.service.post.delPost(id);
    ctx.body = {
      res,
    };
  }
  async reply() {
    const {
      ctx,
    } = this;
    const form = ctx.request.body;
    const name = form.data.name;
    const desc = form.data.desc;
    const postId = form.data.postId;
    const reply = form.data.reply;
    const res = await ctx.service.post.reply(name, desc, postId, reply);
    ctx.body = {
      res,
    };
  }
  async reply1() {
    const {
      ctx,
    } = this;
    const form = ctx.request.body;
    const name1 = form.data.name1;
    const name2 = form.data.name2;
    const desc = form.data.desc;
    const name1Id = form.data.name1Id;
    const postId = form.data.postId;
    const res = await ctx.service.post.reply1(name1, name2, desc, name1Id, postId);
    ctx.body = {
      res,
    };
  }
  async getReply() {
    const {
      ctx,
    } = this;
    const data = ctx.request.body;
    const res = await ctx.service.post.getReply(data.data);
    ctx.body = {
      res,
    };
  }
  async getReply1() {
    const {
      ctx,
    } = this;
    const data = ctx.request.body;
    const res = await ctx.service.post.getReply1(data.data);
    ctx.body = {
      res,
    };
  }
  async delPostReply() {
    const { ctx } = this;
    const id = ctx.request.body.data;
    const res = await ctx.service.post.delPostReply(id);
    ctx.body = {
      res,
    };
  }
  async delPostComment() {
    const { ctx } = this;
    const id = ctx.request.body.data.id;
    const postId = ctx.request.body.data.postId;
    const reply = ctx.request.body.data.reply;
    const res = await ctx.service.post.delPostComment(id, postId, reply);
    ctx.body = {
      res,
    };
  }
  async likePost() {
    const { ctx } = this;
    const postId = ctx.request.body.data.postId;
    const like = ctx.request.body.data.like;
    const res = await ctx.service.post.likePost(postId, like);
    ctx.body = {
      res,
    };
  }
  async findPost() {
    const { ctx } = this;
    const size = ctx.request.body.data.size;
    const currentPage = ctx.request.body.data.currentPage;
    const value = ctx.request.body.data.value;
    const res = await ctx.service.post.findPost(size, currentPage, value);
    ctx.body = {
      res,
    };
  }
}

module.exports = PostController;
