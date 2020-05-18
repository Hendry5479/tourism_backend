module.exports = (app) => ( {
  '/decrypt post': async () => {
    app.ctx.res.send({
      code: 200,
      data: await app.$ctrl.test.decrypt(app.ctx.req.body.info),
    })
  },
} )
