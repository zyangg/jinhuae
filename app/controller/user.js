'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async getAllUser() {
    const { ctx } = this;
    const res = await ctx.service.user.getAllUser();
    ctx.body = {
      res,
    };
  }
  async DeleteUser() {
    const { ctx } = this;
    const data = ctx.request.body;
    const name = data.data;
    const res = await ctx.service.user.DeleteUser(name);
    ctx.body = {
      res,
    };
  }
  async ModifyUser() {
    const { ctx } = this;
    const data = ctx.request.body.data;
    const name = data.name;
    const password = data.password;
    const manager = data.manager;
    const res = await ctx.service.user.ModifyUser(name, password, manager);
    ctx.body = {
      res,
    };
  }
}

module.exports = UserController;
