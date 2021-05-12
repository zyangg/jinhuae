'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/index', controller.home.index);
  router.post('/isManager', controller.manager.index);
  // 获取全部新闻
  router.get('/getNews', controller.news.index);
  // 查询新闻
  router.post('/findNewByValue', controller.news.findNew);
  router.post('/searchFindNew', controller.news.searchFindNew);
  // 新闻全部分页
  router.post('/findAllNewPage', controller.news.findAllNewPage);
  // 新闻类型分页
  router.post('/findTypeNewPage', controller.news.findTypeNewPage);
  router.post('/getPosts', controller.post.getPost);
  router.post('/getPostsOne', controller.post.getPostOne);
  router.post('/delPost', controller.post.delPost);
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
  // 获取单个用户
  router.post('/getOneUser', controller.user.getOneUser);
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
  // 删除新闻评论
  router.post('/delNewReply', controller.news.delNewReply);
  // 删除论坛评论
  router.post('/delPostComment', controller.post.delPostComment);
  // 删除论坛回复
  router.post('/delPostReply', controller.post.delPostReply);
  // 点赞帖子
  router.post('/likePost', controller.post.likePost);
  // 查询帖子
  router.post('/findPost', controller.post.findPost);
  // 根据分页查询用户
  router.post('/findUser', controller.user.findUser);
  router.post('/findUserByValue', controller.user.findUserByValue);
  // 查询单个新闻
  router.post('/findNewById', controller.news.findNewById);
  // 获取轮播图数据
  router.get('/getCarouselNewData', controller.news.getCarouselNewData);
  // 获取各个新闻数量
  router.get('/getTypeNewNum', controller.news.getTypeNewNum);
};
