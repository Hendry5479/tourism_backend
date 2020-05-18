module.exports = app => ( {
    '/getRouterList get': async () => {
      await app.$ctrl.admin.getRouterList(app.ctx)
    },
    '/addRouter post': async () => {
      await app.$ctrl.admin.addRouter(app.ctx)
    },
    '/deleteRouter post': async () => {
      await app.$ctrl.admin.deleteRouter(app.ctx)
    },
    '/updateRouter post': async () => {
      await app.$ctrl.admin.updateRouter(app.ctx)
    },
    '/getAdminList get': async () => {
      await app.$ctrl.admin.getAdminList(app.ctx)
    },
    '/addAdmin post': async () => {
      await app.$ctrl.admin.addAdmin(app.ctx)
    },
    '/deleteAdmin post': async () => {
      await app.$ctrl.admin.deleteAdmin(app.ctx)
    },
    '/updateAdmin post': async () => {
      await app.$ctrl.admin.updateAdmin(app.ctx)
    },
    '/getAnswerList get': async () => {
      await app.$ctrl.admin.getAnswerList(app.ctx)
    },
    '/deleteAnswer post': async () => {
      await app.$ctrl.admin.deleteAnswer(app.ctx)
    },
    '/getArticleList get': async () => {
      await app.$ctrl.admin.getArticleList(app.ctx)
    },
    '/deleteArticle post': async () => {
      await app.$ctrl.admin.deleteArticle(app.ctx)
    },
    '/getCommentInfoList get': async () => {
      await app.$ctrl.admin.getCommentInfoList(app.ctx)
    },
    '/deleteCommentInfo post': async () => {
      await app.$ctrl.admin.deleteCommentInfo(app.ctx)
    },
    '/getLikeAnswerList get':async  ()=>{
     await app.$ctrl.admin.getLikeAnswerList(app.ctx)
    },
    '/getLikeArticleList get': async () => {
      await app.$ctrl.admin.getLikeArticleList(app.ctx)
    },
    '/getLikeCommentInfoList get': async () => {
      await app.$ctrl.admin.getLikeCommentInfoList(app.ctx)
    },
    '/getLikeQuestionList get': async () => {
      await app.$ctrl.admin.getLikeQuestionList(app.ctx)
    },
    '/getQuestionList get': async () => {
      await app.$ctrl.admin.getQuestionList(app.ctx)
    },
    '/deleteQuestion post': async () => {
      await app.$ctrl.admin.deleteQuestion(app.ctx)
    },
    '/getUserList get': async () => {
      await app.$ctrl.admin.getUserList(app.ctx)
    },
    '/deleteUser post': async () => {
      await app.$ctrl.admin.deleteUser(app.ctx)
    },
  }
)
