module.exports = app => ( {
  '/getUserName get': async () => {
    await app.$ctrl.public.index(app.ctx)
  },
  '/getPublicKey get': async () => {
    await app.$ctrl.public.getPublicKey(app.ctx)
  },
  '/login post': async () => {
    await app.$ctrl.public.login(app.ctx)
  },
  '/adminLogin post': async () => {
    await app.$ctrl.public.adminLogin(app.ctx)
  },
  '/register post': async () => {
    await app.$ctrl.public.register(app.ctx)
  },
  '/getArticleList get': async () => {
    await app.$ctrl.public.getHomeArticleList(app.ctx)
  },
  '/getHotList get': async () => {
    await app.$ctrl.article.getHotList(app.ctx, 6)
  },
  '/getDestinationArticle get': async () => {
    await app.$ctrl.article.getHotList(app.ctx, 1)
  },
  '/getHotQuestionRecommend get': async () => {
    await app.$ctrl.question.getRecommend(app.ctx)
  },
  '/getHotArticleRecommend get': async () => {
    await app.$ctrl.article.getRecommend(app.ctx)
  },
  '/getQuestionList get': async () => {
    await app.$ctrl.question.getQuestionList(app.ctx)
  },
  '/getQuestionDetail get': async () => {
    await app.$ctrl.question.getQuestionDetail(app.ctx)
  },
  '/getArticleDetail get': async () => {
    await app.$ctrl.article.getArticleDetail(app.ctx)
  },
  '/getDestinationList get': async () => {
    await app.$ctrl.public.getDestinationList(app.ctx)
  },
  '/getUserInfoById get': async () => {
    await app.$ctrl.user.getUserInfoById(app.ctx)
  },
  '/getUserArticleByUserId get': async () => {
    await app.$ctrl.article.getUserArticleByUserId(app.ctx)
  },
  '/getQuestionByUserId get': async () => {
    await app.$ctrl.question.getQuestionByUserId(app.ctx)
  },
  '/searchArticle get': async () => {
    await app.$ctrl.article.search(app.ctx)
  },
  '/searchQuestion get': async () => {
    await app.$ctrl.question.search(app.ctx)
  },
  '/forget post': async () => {
    await app.$ctrl.public.forget(app.ctx)
  },
  '/checkForgetValidate post': async () => {
    await app.$ctrl.public.checkForgetValidate(app.ctx)
  },
  '/resetPassword post': async () => {
    await app.$ctrl.public.resetPassword(app.ctx)
  },
} )
