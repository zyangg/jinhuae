'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  async index(title, describe, content, img, date, time, author, type) {
    const { ctx } = this;
    ctx.model.Article.create({ title, describe, content, img, date, time, author, type });
  }
  async find() {
    const { ctx } = this;
    const res = await ctx.model.Article.find();
    return res;
  }
  async findBySearch(datePick, checkedType) {
    const { ctx } = this;
    if (!datePick) {
      const res = await ctx.model.Article.find({
        type: { $in: checkedType },
      });
      return res;
    }
    if (datePick) {
      const res1 = await ctx.model.Article.find({
        date: { $lt: datePick[1], $gt: datePick[0] },
        type: { $in: checkedType },
      });
      return res1;
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
  async ModifyArticle(id, title, author, date, time) {
    const { ctx } = this;
    console.log('aaa', id, title, author, date, time);

    await ctx.model.Article.updateOne({ _id: id }, { $set: { title, author, date, time } });
  }
  async DeleteArticle(id) {
    const { ctx } = this;
    await ctx.model.Article.remove({ _id: id });
  }
}

module.exports = ArticleService;
