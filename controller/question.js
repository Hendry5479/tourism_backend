const JWTDecode = require('jwt-decode')
module.exports = app => ( {
  createQuestion: async (ctx) => {
    const { id: userId, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (!userId && isAdmin) {
      ctx.res.send({
        code: 9999,
        message: 'token无效,请重新登录',
      })
    } else {
      await app.$service.question.createQuestion(ctx.req.body, userId)
      ctx.res.send({
          code: 200,
          message: '发布问题成功',
        },
      )
    }
  },
  deleteQuestion: async (ctx) => {
    const { id: userId, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (!userId && isAdmin) {
      ctx.res.send({
        code: 9999,
        message: 'token无效,请重新登录',
      })
    } else {
      const { id } = ctx.req.body
      const isUserQuestion = await app.$service.question.isUserQuestion(id, userId)
      if (!isUserQuestion) {
        ctx.res.send({
          code: 9999,
          message: '无权限删除他人的提问',
        })
      } else {
        const infoList = await app.$model.answer.findAll({ raw: true, where: { questionId: id } })
        await Promise.all(infoList.map(async item => {
          await app.$model.likeAnswer.destroy({ where: { answerId: item.id } })
        }))
        await app.$model.answer.destroy({ where: { questionId: id } })
        await app.$model.likeQuestion.destroy({ where: { questionId: id } })
        await app.$model.question.destroy({ where: { id } })
        ctx.res.send({
            code: 200,
            message: '删除问题成功',
          },
        )
      }
    }
  },
  likeQuestion: async (ctx) => {
    const { id: userId, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (!userId && isAdmin) {
      ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
    } else {
      const isUserLiked = await app.$service.likeQuestion.isUserLiked(ctx.req.body.id, userId)
      if (isUserLiked) {
        await app.$service.likeQuestion.like(false, ctx.req.body.id, userId, true)
        ctx.res.send({ code: 200, message: '取消点赞成功' })
      } else {
        const isDataExist = await app.$service.likeQuestion.isLikeExist(ctx.req.body.id, userId)
        if (isDataExist) {
          await app.$service.likeQuestion.like(true, ctx.req.body.id, userId, true)
          ctx.res.send({ code: 200, message: '点赞成功' })
        } else {
          await app.$service.likeQuestion.like(true, ctx.req.body.id, userId, false)
          ctx.res.send({ code: 200, message: '点赞成功' })
        }
      }
    }
  },
  getRecommend: async (ctx) => {
    const { id: userId, isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}

    const data = await app.$service.question.getRecommend(6, isAdmin ? '' : userId || '')
    ctx.res.send({
      code: 200,
      data,
    })
  },
  getQuestionList: async (ctx) => {
    const { id: userId, isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    const data = await app.$service.question.getQuestionList(isAdmin ? '' : userId || '')
    ctx.res.send({ code: 200, data })
  },
  getQuestionDetail: async (ctx) => {
    const { id: userId, isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    const isExist = await app.$service.question.isQuestionExist(ctx.req.query.id)
    if (isExist) {
      const data = await app.$service.question.getQuestionDetail(ctx.req.query.id, isAdmin ? '' : userId || '')
      ctx.res.send({ code: 200, data })
    } else {
      ctx.res.send({ code: 9999, message: '问题已不存在' })
    }
  },
  getUserQuestion: async (ctx) => {
    const { id: userId, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (!userId && isAdmin) {
      ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
    } else {
      const data = await app.$service.question.getQuestionListById(userId)
      ctx.res.send({ code: 200, data })
    }
  },
  getQuestionByUserId: async (ctx) => {
    const { id: userId, isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}

    const data = await app.$service.question.getQuestionListById(ctx.req.query.id, isAdmin ? '' : userId || '')
    ctx.res.send({ code: 200, data })
  },
  search: async (ctx) => {
    const { id: userId, isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    const data = await app.$service.question.search(ctx.req.query.search, isAdmin ? {} : userId || {})
    ctx.res.send({ code: 200, data })
  },
} )
