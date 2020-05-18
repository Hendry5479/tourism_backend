module.exports = (app) => ( {
  '/getArticle get': async () => {
    await app.$ctrl.article.getUserArticle(app.ctx)
  },
  '/updateComment post': async () => {
    await app.$ctrl.user.updateComment(app.ctx)
  },
  '/getComment get': async () => {
    await app.$ctrl.user.getComment(app.ctx)
  },
  '/getUserInfo get': async () => {
    await app.$ctrl.user.getUserInfo(app.ctx)
  },
  '/setUserInfo post': async () => {
    await app.$ctrl.user.setUserInfo(app.ctx)
  },
} )
