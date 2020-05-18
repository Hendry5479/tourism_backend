module.exports = app => ( {
  '/createQuestion post': async () => {
    await app.$ctrl.question.createQuestion(app.ctx)
  },
  '/deleteQuestion post': async () => {
    await app.$ctrl.question.deleteQuestion(app.ctx)
  },
  '/likeQuestion post': async () => {
    await app.$ctrl.question.likeQuestion(app.ctx)
  },
  '/getUserQuestion get':async()=>{
    await  app.$ctrl.question.getUserQuestion(app.ctx)
  }
} )
