'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/index', controller.home.index);
  router.post('/isManager', controller.manager.index);
  router.get('/getNews', controller.news.index);
  router.post('/searchFindNew', controller.news.searchFindNew);
  router.get('/getPosts', controller.post.getPost);
  router.post('/getPosts', controller.post.delPost);
  // 用户注册
  router.post('/register', controller.register.index);
  // 用户登录
  router.post('/login', controller.login.index);
  router.post('/check', controller.check.index);
  router.post('/publish', controller.publish.index);
  router.post('/publishPost', controller.post.index);
  router.post('/publishReply', controller.post.reply);
  router.post('/publishReply1', controller.post.reply1);
  router.post('/getReply', controller.post.getReply);
  router.post('/getReply1', controller.post.getReply1);
  router.post('/addNewCount', controller.news.addCount);
  router.get('/newRanking', controller.news.newRank);
  router.post('/publishNewReply', controller.news.publishReply);
  router.post('/getNewReply', controller.news.getNewReply);
  router.post('/addUserLike', controller.news.addUserLike);
  // 获取所有用户
  router.get('/getAllUser', controller.user.getAllUser);
  // 删除用户
  router.post('/DeleteUser', controller.user.DeleteUser);
  // 编辑用户
  router.post('/ModifyUser', controller.user.ModifyUser);
  // 编辑文章
  router.post('/ModifyArticle', controller.news.ModifyArticle);
  // 编辑用户
  router.post('/DeleteArticle', controller.news.DeleteArticle);
  // 置顶新闻或者取消置顶
  router.post('/topArticle', controller.news.topArticle);
  router.post('/notopArticle', controller.news.notopArticle);
  router.get('/getTopArticle', controller.news.getTopArticle);
};
