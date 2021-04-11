'use strict';

const Controller = require('egg').Controller;

class RegisterController extends Controller {
  async index() {
    const { ctx } = this;
    const { data } = ctx.request.body;
    const name = data.name;
    const password = data.pass;
    const manager = data.manager;
    await ctx.service.user.index(name, password, manager);
    ctx.body = {
      aaa: 'bbbbbb',
    };
  }
}

module.exports = RegisterController;
