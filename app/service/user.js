'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async index(name, password, manager) {
    const { ctx } = this;
    ctx.model.Users.create({ name, password, manager });
  }
  async check(name) {
    const { ctx } = this;
    const length = await ctx.model.Users.find({ name }).count();
    return length;
  }
  async getAllUser() {
    const { ctx } = this;
    const res = ctx.model.Users.find();
    return res;
  }
  async login(name, password) {
    const { ctx } = this;
    const length = await ctx.model.Users.find({ name, password }).count();
    return length;
  }
  async isManager(name) {
    const { ctx } = this;
    const res = await ctx.model.Users.findOne({ name });
    return res.manager;
  }
  async DeleteUser(name) {
    const { ctx } = this;
    await ctx.model.Users.remove({ name });
  }
  async ModifyUser(name, password, manager) {
    const { ctx } = this;
    await ctx.model.Users.update({ name }, { $set: { password, manager } });
  }
  async addUserLike(name, type) {
    const { ctx } = this;
    const aaa = await ctx.model.Users.find({ name });
    let res = null;
    if (type === 'meishi') {
      res = await ctx.model.Users.update({ name }, {
        $set: { meishi: Number(aaa[0].meishi) + 1 },
      });
    }
    if (type === 'yule') {
      res = await ctx.model.Users.update({ name }, {
        $set: { yule: Number(aaa[0].yule) + 1 },
      });
    }
    if (type === 'caijing') {
      res = await ctx.model.Users.update({ name }, {
        $set: { caijing: Number(aaa[0].caijing) + 1 },
      });
    }
    if (type === 'shehui') {
      res = await ctx.model.Users.update({ name }, {
        $set: { shehui: Number(aaa[0].shehui) + 1 },
      });
    }
    if (type === 'shizheng') {
      res = await ctx.model.Users.update({ name }, {
        $set: { shizheng: Number(aaa[0].shizheng) + 1 },
      });
    }
    if (type === 'keji') {
      res = await ctx.model.Users.update({ name }, {
        $set: { keji: Number(aaa[0].keji) + 1 },
      });
    }
    return res;
  }
  async getOneUser(name) {
    const { ctx } = this;
    return await ctx.model.Users.findOne({ name });
  }
  async findUser(size, currentPage) {
    const { ctx } = this;
    const res1 = await ctx.model.Users.find().count();
    const res2 = await ctx.model.Users.find().limit(size).skip(size * (currentPage - 1));
    return {
      total: res1,
      res: res2,
      type: 1,
    };
  }
  async findUserByValue(size, currentPage, value) {
    const { ctx } = this;
    let managers = null;
    if (value === '管理员') {
      managers = true;
    }
    if (value === '用户') {
      managers = false;
    }
    const res1 = await ctx.model.Users.find(
      {
        $or: [
          { name: { $regex: value } },
          { password: { $regex: value } }, { manager: managers },
        ] }
    ).count();
    const res2 = await ctx.model.Users.find(
      {
        $or: [
          { name: { $regex: value } },
          { password: { $regex: value } }, { manager: managers },
        ] }
    ).limit(size).skip(size * (currentPage - 1));
    return {
      total: res1,
      res: res2,
      type: 2,
    };
  }
}

module.exports = UserService;
