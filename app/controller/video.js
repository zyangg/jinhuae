'use strict';

const Controller = require('egg').Controller;

class VideoController extends Controller {
  async publishVideoNew() {
    const { ctx } = this;
    const { data } = ctx.request.body;
    const title = data.title;
    const describe = data.describe;
    const video = data.video;
    const date = data.date;
    const time = data.time;
    const author = data.author;
    const res = await ctx.service.video.publishVideoNew(title, describe, video, date, time, author);
    ctx.body = {
      res,
    };
  }
  async downLoadUrl() {
    const { ctx } = this;
    const { data } = ctx.request.body;
    const url = data;
    const res = await ctx.service.video.downLoadUrl(url);
    ctx.body = {
      res,
    };
  }
  async getVideoText() {
    const { ctx } = this;
    const res = await ctx.service.video.getVideoText();
    ctx.body = {
      res,
    };
  }
}

module.exports = VideoController;
