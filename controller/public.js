const fs = require('fs')
const path = require('path')
const JWTDecode = require('jwt-decode')
const { setValue, getValue } = require('../utils/redisUtils')
const { sign } = require('../utils')
const { mailer } = require('../utils/nodemailer')

module.exports = (app) => ( {
  index: async (ctx) => {
    ctx.res.send(await app.$service.user.getName())
  },
  getPublicKey: async (ctx) => {
    const publicKey = fs.readFileSync(path.join(__dirname, '../public/rsa_public_key.pem'), 'utf-8')
    ctx.res.send({
      code: 200,
      data: publicKey,
    })
  },
  login: async (ctx) => {
    const info = await app.$service.user.loginCheck(ctx.req.body)
    if (info === null) {
      ctx.res.send({
        code: 9999,
        message: '账号或密码错误',
      })
    } else {
      const token = sign(info, app.$jwt.secret, app.$jwt.options)
      ctx.res.send({
        code: 200,
        message: '登录成功',
        data: token,
      })
    }
  },
  register: async (ctx) => {
    const isExist = await app.$service.user.isUserExist(ctx.req.body.name)
    if (isExist) {
      ctx.res.send({
        code: 9999,
        message: '账号已注册',
      })
    } else {
      await app.$service.user.register(ctx.req.body)
      ctx.res.send({
        code: 200,
        message: '注册成功',
      })
    }
  },
  getHomeArticleList: async (ctx) => {
    const { id: userId, isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}

    const articleList = await app.$service.article.getListByOrderType(
      ctx.req.query.type || 'hot',
      isAdmin ? '' : userId || '',
    )
    ctx.res.send({ code: 200, data: { articleList } })
  },
  getDestinationList: async (ctx) => {
    const JSON = require('../utils/destinationJSON')
    ctx.res.send({
      code: 200,
      data: JSON,
    })
  },
  forget: async (ctx) => {
    const userInfo = await app.$model.user.findOne({ raw: true, where: { email: ctx.req.body.email } })
    if (userInfo) {
      const validateCode = Math.floor(( ( Math.random() * 9000 ) + 999 )).toString()
      await setValue(userInfo.id, validateCode, 60 * 30)
      await mailer(`${ctx.req.body.email}`, `[账号找回]四川旅游网`, `请在30分钟内在相关网页输入此验证码${validateCode}以重置密码`)
      ctx.res.send({ code: 200, message: `请在30分钟内登录${ctx.req.body.email}邮箱查看验证码` })
    } else {
      ctx.res.send({
        code: 9999,
        message: '系统内部错误',
      })
    }
  },
  checkForgetValidate: async (ctx) => {
    const userInfo = await app.$model.user.findOne({ raw: true, where: { email: ctx.req.body.email } })
    if (userInfo) {
      const value = await getValue(userInfo.id)
      if (value === ctx.req.body.validateCode) {
        ctx.res.send({
          code: 200,
          message: '验证成功,请重置密码',
        })
      } else {
        ctx.res.send({
          code: 9999,
          message: '验证失败,请输入正确的验证码',
        })
      }
    } else {
      ctx.res.send({
        code: 9999,
        message: '系统内部错误',
      })
    }
  },
  resetPassword: async (ctx) => {
    const userInfo = await app.$model.user.findOne({ raw: true, where: { email: ctx.req.body.email } })
    if (userInfo) {
      const value = await getValue(userInfo.id)
      if (value === ctx.req.body.validateCode) {
        await app.$model.user.update({ password: ctx.req.body.password }, { where: { id: userInfo.id } })
        ctx.res.send({
          code: 200,
          message: '重置密码成功',
        })
      } else {
        ctx.res.send({
          code: 9999,
          message: '验证失败,请输入正确的验证码',
        })
      }
    } else {
      ctx.res.send({
        code: 9999,
        message: '系统内部错误',
      })
    }
  },
  adminLogin: async (ctx) => {
    const info = await app.$service.admin.loginCheck(ctx.req.body)
    if (info === null) {
      ctx.res.send({
        code: 9999,
        message: '账号或密码错误',
      })
    } else {
      const token = sign({ ...info, isAdmin: true }, app.$jwt.secret, app.$jwt.options)
      console.log(token)
      ctx.res.send({
        code: 200,
        message: '登录成功',
        data: token,
      })
    }
  },
} )
