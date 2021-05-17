'use strict';

const Controller = require('egg').Controller;

class PublishController extends Controller {
  async index() {
    const {
      ctx,
    } = this;
    const form = ctx.request.body;
    const title = form.data.title;
    const describe = form.data.describe;
    const content = form.data.content;
    const imgUrl = form.data.dialogImageUrl;
    const author = form.data.author;
    const date = form.data.date;
    const time = form.data.time;
    const type = form.data.type;
    const classs = form.data.class;
    const cartoonType = form.data.cartoonType;
    const videoAudio = form.data.videoAudio;
    const res = await ctx.service.article.index(title, describe, content, imgUrl, date, time, author, type, classs, videoAudio, cartoonType);
    ctx.body = {
      res,
    };
  }
}

module.exports = PublishController;
