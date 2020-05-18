const JWTDecode = require('jwt-decode')
module.exports = app => ( {
  getUserInfoById: async (ctx) => {
    const data = await app.$service.user.getUserInfoById(ctx.req.query.id)
    ctx.res.send({ code: 200, data })
  },
  updateComment: async (ctx) => {
    const { id, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (!id && isAdmin) {
      ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
    } else {
      await app.$service.user.updateComment(ctx.req.body.comment, id)
      ctx.res.send({ code: 200, message: '更新个人简介成功' })
    }
  },
  getComment: async (ctx) => {
    const { id, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (!id && isAdmin) {
      ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
    } else {
      const data = await app.$service.user.getComment(id)
      ctx.res.send({ code: 200, data })
    }
  },
  getUserInfo: async (ctx) => {
    const { id, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (!id && isAdmin) {
      ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
    } else {
      const data = await app.$service.user.getUserInfo(id)
      ctx.res.send({ code: 200, data })
    }
  },
  setUserInfo: async (ctx) => {
    const { id, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (!id && isAdmin) {
      ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
    } else {
      const { beforePassword, ...rest } = ctx.req.body
      const isBeforePasswordCorrect = await app.$service.user.checkBeforePassword(id, beforePassword)
      if (isBeforePasswordCorrect) {
        await app.$service.user.setUserInfo({ ...rest, id })
        ctx.res.send({ code: 200, message: '修改个人资料成功' })
      } else {
        ctx.res.send({ code: 9999, message: '原始密码错误' })
      }
    }
  },
} )
