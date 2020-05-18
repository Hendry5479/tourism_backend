module.exports = app => ( {
  '/createAnswer post': async () => {
    await app.$ctrl.answer.createAnswer(app.ctx)
  },
  '/setAnswer post': async () => {
    await app.$ctrl.answer.setAnswer(app.ctx)
  },
  '/likeAnswer post': async () => {
    await app.$ctrl.answer.likeAnswer(app.ctx)
  },
} )
