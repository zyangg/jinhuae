'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    const { data } = ctx.request.body;
    const name = data.username;
    const password = data.password;
    const res = await ctx.service.user.login(name, password);
    ctx.body = {
      res,
    };
  }
}

module.exports = LoginController;
