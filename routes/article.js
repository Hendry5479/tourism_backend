module.exports = app => ( {
  '/createArticle post': async () => {
    await app.$ctrl.article.createArticle(app.ctx)
  },
  '/saveArticle post': async () => {
    await app.$ctrl.article.saveArticle(app.ctx)
  },
  '/publishArticle post': async () => {
    await app.$ctrl.article.publishArticle(app.ctx)
  },
  '/previewArticle get': async () => {
    await app.$ctrl.article.previewArticle(app.ctx)
  },
  '/likeArticle post': async () => {
    await app.$ctrl.article.likeArticle(app.ctx)
  },
  '/getArticleEdit get': async () => {
    await app.$ctrl.article.getArticleEdit(app.ctx)
  },
  '/deleteArticle get': async () => {
    await app.$ctrl.article.deleteArticle(app.ctx)
  },
} )
