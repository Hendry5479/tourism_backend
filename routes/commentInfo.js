module.exports = app => ( {
  '/createComment post': async () => {
    await app.$ctrl.commentInfo.createComment(app.ctx)
  },
  '/likeComment post': async () => {
    await app.$ctrl.commentInfo.likeComment(app.ctx)
  },
} )
