'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.service.article.find();
    ctx.body = {
      res,
    };
    return res;
  }
  async searchFindNew() {
    const { ctx } = this;
    const data = ctx.request.body;
    const datePick = data.data.datePick;
    const checkedType = data.data.checkedType;
    const size = data.data.size;
    const currentPage = data.data.currentPage;
    const res = await ctx.service.article.findBySearch(datePick, checkedType, size, currentPage);
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
    const res = await ctx.service.article.ModifyArticle(data.id, data.title, data.author, data.date, data.time, data.count);
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
  async topArticle() {
    const { ctx } = this;
    const id = ctx.request.body.data;
    const res = await ctx.service.article.topArticle(id);
    ctx.body = {
      res,
    };
  }
  async notopArticle() {
    const { ctx } = this;
    const id = ctx.request.body.data;
    const res = await ctx.service.article.notopArticle(id);
    ctx.body = {
      res,
    };
  }
  async getTopArticle() {
    const { ctx } = this;
    const res = await ctx.service.article.getTopArticle();
    ctx.body = {
      res,
    };
  }
  async delNewReply() {
    const { ctx } = this;
    const id = ctx.request.body.data;
    const res = await ctx.service.article.delNewReply(id);
    ctx.body = {
      res,
    };
  }
  async findNew() {
    const { ctx } = this;
    const value = ctx.request.body.data.value;
    const size = ctx.request.body.data.size;
    const currentPage = ctx.request.body.data.currentPage;
    const res = await ctx.service.article.findNew(value, size, currentPage);
    ctx.body = {
      res,
    };
  }
  async findNewById() {
    const { ctx } = this;
    const id = ctx.request.body.data.id;
    const res = await ctx.service.article.findNewById(id);
    ctx.body = {
      res,
    };
  }
  async findAllNewPage() {
    const { ctx } = this;
    const size = ctx.request.body.data.size;
    const currentPage = ctx.request.body.data.currentPage;
    const res = await ctx.service.article.findAllNewPage(size, currentPage);
    ctx.body = {
      res,
    };
  }
  async findTypeNewPage() {
    const { ctx } = this;
    const size = ctx.request.body.data.size;
    const currentPage = ctx.request.body.data.currentPage;
    const type = ctx.request.body.data.type;
    const res = await ctx.service.article.findTypeNewPage(size, currentPage, type);
    ctx.body = {
      res,
    };
  }
  async getCarouselNewData() {
    const { ctx } = this;
    const res = await ctx.service.article.getCarouselNewData();
    ctx.body = {
      res,
    };
  }
  async getTypeNewNum() {
    const { ctx } = this;
    const res = await ctx.service.article.getTypeNewNum();
    ctx.body = {
      res,
    };
  }
}

module.exports = NewsController;
