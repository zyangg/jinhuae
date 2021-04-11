'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
  async index() {
    const { ctx } = this;
    const { data } = ctx.request.body;
    const res = await ctx.service.user.isManager(data);
    ctx.body = {
      res,
    };
  }
}

module.exports = ManagerController;
