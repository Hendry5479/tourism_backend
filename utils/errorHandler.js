const { status } = require('./index')
console.log(status)
module.exports = {
  global: (app, moduleName, method, path) => async cb => {
    try {
      return await cb()
    } catch (e) {
      console.log(e)
      app.ctx.res.send({
        code: 9999, message: {
          path: `错误来源:${method.toUpperCase()} ${moduleName}${path}`,
          info: e,
        },
      })
    }
  },
  error: (error) => async cb => {
    try {
      return await cb()
    } catch (e) {
      console.log(e)
      throw {
        ...e,
        ...error,
      }
    }
  },
}
