'use strict';

const Controller = require('egg').Controller;

class CheckController extends Controller {
  async index() {
    const { ctx } = this;
    const name = ctx.request.body;
    const res = await ctx.service.user.check(name.data);
    ctx.body = {
      res,
    };
  }
}

module.exports = CheckController;
