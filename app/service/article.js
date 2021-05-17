'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  async index(title, describe, content, img, date, time, author, type, classs, videoAudio, cartoonType) {
    const { ctx } = this;
    ctx.model.Article.create({ title, describe, content, img, date, time, author, type, class: classs, videoAudio, cartoonType });
  }
  async find() {
    const { ctx } = this;
    const res = await ctx.model.Article.find();
    return res;
  }
  async findBySearch(datePick, checkedType, size, currentPage) {
    const { ctx } = this;
    if (!datePick) {
      const res = await ctx.model.Article.find({
        type: { $in: checkedType },
      }).count();
      const res2 = await ctx.model.Article.find({
        type: { $in: checkedType },
      }).limit(size).skip(size * (currentPage - 1));
      return {
        res: res2,
        total: res,
        type: 2,
      };
    }
    if (datePick) {
      const res1 = await ctx.model.Article.find({
        date: { $lt: datePick[1], $gt: datePick[0] },
        type: { $in: checkedType },
      }).count();
      const res3 = await ctx.model.Article.find({
        date: { $lt: datePick[1], $gt: datePick[0] },
        type: { $in: checkedType },
      }).limit(size).skip(size * (currentPage - 1));
      return {
        res: res3,
        total: res1,
        type: 2,
      };
    }
  }
  async addCount(id, count) {
    const { ctx } = this;
    const res = await ctx.model.Article.update({
      _id: id,
    }, { $set: { count: Number(count) + 1 } });
    return res;
  }
  async newRank() {
    const { ctx } = this;
    const res = await ctx.model.Article.find().sort({ count: -1 }).limit(5);
    return res;
  }
  async publishReply(desc, newId, name) {
    const { ctx } = this;
    const res = await ctx.model.NewReply.create({ desc, newId, name });
    return res;
  }
  async getNewReply(id) {
    const { ctx } = this;
    const res = await ctx.model.NewReply.find({ newId: id });
    return res;
  }
  async ModifyArticle(id, title, author, date, time, count) {
    const { ctx } = this;
    await ctx.model.Article.updateOne({ _id: id }, { $set: { title, author, date, time, count } });
  }
  async DeleteArticle(id) {
    const { ctx } = this;
    await ctx.model.Article.remove({ _id: id });
  }
  async topArticle(id) {
    const { ctx } = this;
    await ctx.model.Article.updateOne({ _id: id }, { $set: { top: true } });
  }
  async notopArticle(id) {
    const { ctx } = this;
    await ctx.model.Article.updateOne({ _id: id }, { $set: { top: false } });
  }
  async getTopArticle() {
    const { ctx } = this;
    const res = await ctx.model.Article.find({ top: true });
    return res;
  }
  async delNewReply(id) {
    const { ctx } = this;
    const res = await ctx.model.NewReply.remove({ _id: id });
    return res;
  }
  async findNew(value, size, currentPage) {
    const { ctx } = this;
    const res1 = await ctx.model.Article.find({
      $or: [
        { title: { $regex: value } },
        { content: { $regex: value } }, { describe: { $regex: value } },
      ] }).count();
    const res2 = await ctx.model.Article.find({
      $or: [
        { title: { $regex: value } },
        { content: { $regex: value } }, { describe: { $regex: value } },
      ] }).limit(size).skip(size * (currentPage - 1));
    return {
      total: res1,
      res: res2,
      type: 1,
    };
  }
  async findNewById(id) {
    const { ctx } = this;
    const res = await ctx.model.Article.findOne({ _id: id });
    return res;
  }
  async findAllNewPage(size, currentPage) {
    const { ctx } = this;
    const res1 = await ctx.model.Article.find().count();
    const res2 = await ctx.model.Article.find().limit(size).skip(size * (currentPage - 1));
    return {
      total: res1,
      res: res2,
      flag: 1,
    };
  }
  async findTypeNewPage(size, currentPage, type) {
    const { ctx } = this;
    const res1 = await ctx.model.Article.find({ type }).count();
    const res2 = await ctx.model.Article.find({ type }).limit(size).skip(size * (currentPage - 1));
    return {
      total: res1,
      res: res2,
      flag: 2,
    };
  }
  async getCarouselNewData() {
    const { ctx } = this;
    const res = await ctx.model.Article.find().sort({ _id: -1 }).limit(5);
    return res;
  }
  async getTypeNewNum() {
    const { ctx } = this;
    const yule = await ctx.model.Article.find({ type: 'yule' }).count();
    const meishi = await ctx.model.Article.find({ type: 'meishi' }).count();
    const keji = await ctx.model.Article.find({ type: 'keji' }).count();
    const caijing = await ctx.model.Article.find({ type: 'caijing' }).count();
    const shizheng = await ctx.model.Article.find({ type: 'shizheng' }).count();
    const shehui = await ctx.model.Article.find({ type: 'shehui' }).count();
    return {
      yule,
      meishi,
      keji,
      caijing,
      shizheng,
      shehui,
    };
  }
  async getNewByClass(size, currentPage, classs) {
    const { ctx } = this;
    const res1 = await ctx.model.Article.find({ class: classs }).count();
    const res2 = await ctx.model.Article.find({ class: classs }).limit(size).skip(size * (currentPage - 1));
    return {
      total: res1,
      res: res2,
    };
  }
  async getNewByCartoonType(size, currentPage, classs, chType) {
    const { ctx } = this;
    console.log('aaaaaaa', classs, chType);
    const res1 = await ctx.model.Article.find({ class: classs, cartoonType: chType }).count();
    const res2 = await ctx.model.Article.find({ class: classs, cartoonType: chType }).limit(size).skip(size * (currentPage - 1));
    return {
      total: res1,
      res: res2,
    };
  }
}

module.exports = ArticleService;
