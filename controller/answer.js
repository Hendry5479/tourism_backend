const JWTDecode = require('jwt-decode')
module.exports = (app) => ( {
  createAnswer: async (ctx) => {
    const { id: userId, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (!userId && !isAdmin) {
      ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
    } else {
      const isQuestionExist = await app.$service.question.isQuestionExist(ctx.req.body.questionId)
      if (!isQuestionExist) {
        ctx.res.send({
          code: 9999,
          message: '问题不存在',
        })
      } else {
        await app.$service.answer.createAnswer(ctx.req.body, userId)
        ctx.res.send({ code: 200, message: '发布回答成功' })
      }
    }
  },
  setAnswer: async (ctx) => {
    const { id: userId, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (!userId && !isAdmin) {
      ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
    } else {
      const isQuestionExist = await app.$service.question.isQuestionExist(ctx.req.body.questionId)
      if (!isQuestionExist) {
        ctx.res.send({
          code: 9999,
          message: '问题不存在',
        })
      } else {
        const isQuestioner = await app.$service.question.isQuestioner(ctx.req.body.questionId, userId)
        if (isQuestioner) {
          await app.$service.answer.setAnswer(ctx.req.body.id, ctx.req.body.questionId)
          ctx.res.send({ code: 200, message: '设置最佳回答成功' })
        } else {
          ctx.res.send({ code: 9999, message: '您无权限设置' })
        }
      }
    }
  },
  likeAnswer: async (ctx) => {
    const { id: userId, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (!userId && !isAdmin) {
      ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
    } else {
      const isUserLiked = await app.$service.likeAnswer.isUserLiked(ctx.req.body.id, userId)
      if (isUserLiked) {
        await app.$service.likeAnswer.like(false, ctx.req.body.id, userId, true)
        ctx.res.send({ code: 200, message: '取消点赞成功' })
      } else {
        const isDataExist = await app.$service.likeAnswer.isLikeExist(ctx.req.body.id, userId)
        if (isDataExist) {
          await app.$service.likeAnswer.like(true, ctx.req.body.id, userId, true)
          ctx.res.send({ code: 200, message: '点赞成功' })
        } else {
          await app.$service.likeAnswer.like(true, ctx.req.body.id, userId, false)
          ctx.res.send({ code: 200, message: '点赞成功' })
        }
      }
    }
  },
} )
