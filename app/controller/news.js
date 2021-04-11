'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.service.article.find();
    ctx.body = {
      res,
    };
  }
  async searchFindNew() {
    const { ctx } = this;
    const data = ctx.request.body;
    const datePick = data.data.datePick;
    const checkedType = data.data.checkedType;
    const res = await ctx.service.article.findBySearch(datePick, checkedType);
    ctx.body = {
      res,
    };
  }
  async addCount() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.article.addCount(data.data.id, data.data.count);
    ctx.body = {
      res,
    };
  }
  async newRank() {
    const { ctx } = this;
    const res = await ctx.service.article.newRank();
    ctx.body = {
      res,
    };
  }
  async publishReply() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.article.publishReply(data.data.desc, data.data.NewId, data.data.name);
    ctx.body = {
      res,
    };
  }
  async getNewReply() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.article.getNewReply(data.data);
    ctx.body = {
      res,
    };
  }
  async addUserLike() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.user.addUserLike(data.data.name, data.data.type);
    ctx.body = {
      res,
    };
  }
  async ModifyArticle() {
    const { ctx } = this;
    const data = ctx.request.body.data;
    const res = await ctx.service.article.ModifyArticle(data.id, data.title, data.author, data.date, data.time);
    ctx.body = {
      res,
    };
  }
  async DeleteArticle() {
    const { ctx } = this;
    const data = ctx.request.body.data;
    const res = await ctx.service.article.DeleteArticle(data);
    ctx.body = {
      res,
    };
  }
}

module.exports = NewsController;
