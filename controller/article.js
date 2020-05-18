const JWTDecode = require('jwt-decode')
module.exports = (app) => ( {
  createArticle: async (ctx) => {
    const { id, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (id && !isAdmin) {
      const data = await app.$service.article.createArticle({ ...ctx.req.body, userId: id, isPub: false })
      ctx.res.send({
        code: 200,
        data,
        message: '创建攻略成功,已保存至草稿箱',
      })
    } else {
      ctx.res.send({ code: 9999, message: '无权限' })
    }
  },
  saveArticle: async (ctx) => {
    const { id, ...rest } = ctx.req.body
    const isExist = await app.$service.article.isArticleExist(id)
    if (isExist) {
      await app.$service.article.edit({ ...rest, isPub: false }, id)
      ctx.res.send({
        code: 200,
        message: '保存草稿箱成功',
      })
    } else {
      ctx.res.send({
        code: 200,
        message: '保存草稿箱失败,攻略异常',
      })
    }
  },
  publishArticle: async (ctx) => {
    const { id } = ctx.req.query
    const isExist = await app.$service.article.isArticleExist(id)
    if (isExist) {
      await app.$service.article.edit({ isPub: true }, id)
      ctx.res.send({
        code: 200,
        message: '发布攻略成功',
      })
    } else {
      ctx.res.send({
        code: 200,
        message: '发布攻略失败,攻略异常',
      })
    }
  },
  previewArticle: async (ctx) => {
    const { id } = ctx.req.query
    const data = await app.$service.article.preview(id)
    ctx.res.send({
      code: 200,
      data,
    })
  },
  getUserArticle: async (ctx) => {
    const { id, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    console.log(isAdmin)
    if (id && !isAdmin) {
      const data = await app.$service.article.getListByUserId(id)
      ctx.res.send({
        code: 200,
        data,
      })
    } else {
      ctx.res.send({ code: 9999, message: '无权限' })
    }
  },
  getUserArticleByUserId: async (ctx) => {
    const { id: userId, isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}

    const data = await app.$service.article.getListByUserId(ctx.req.query.id, isAdmin ? '' : userId || '')
    ctx.res.send({
      code: 200,
      data,
    })
  },
  getHotList: async (ctx, num) => {
    const data = await app.$service.article.getRandomList(num)
    ctx.res.send({
      code: 200,
      data,
    })
  },
  likeArticle: async (ctx) => {
    const { id: userId, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (!isAdmin) {
      if (!userId) {
        ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
      } else {
        const isUserLiked = await app.$service.likeArticle.isUserLiked(ctx.req.body.id, userId)
        if (isUserLiked) {
          await app.$service.likeArticle.like(false, ctx.req.body.id, userId, true)
          ctx.res.send({ code: 200, message: '取消点赞成功' })
        } else {
          const isDataExist = await app.$service.likeArticle.isLikeExist(ctx.req.body.id, userId)
          if (isDataExist) {
            await app.$service.likeArticle.like(true, ctx.req.body.id, userId, true)
            ctx.res.send({ code: 200, message: '点赞成功' })
          } else {
            await app.$service.likeArticle.like(true, ctx.req.body.id, userId, false)
            ctx.res.send({ code: 200, message: '点赞成功' })
          }
        }
      }
    } else {
      ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
    }
  },
  getRecommend: async (ctx) => {
    const { id: userId, isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}

    const data = await app.$service.article.getRecommend(6, isAdmin ? '' : userId || '')
    ctx.res.send({
      code: 200,
      data,
    })

  },
  getArticleDetail: async (ctx) => {
    const data = await app.$service.article.getArticleDetail(ctx.req.query.id)
    ctx.res.send({ code: 200, data })
  },
  getArticleEdit: async (ctx) => {
    const { id: userId, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (!isAdmin) {
      if (!userId) {
        ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
      } else {
        const data = await app.$service.article.getEditListById(userId)
        ctx.res.send({ code: 200, data })
      }
    } else {
      ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
    }
  },
  search: async (ctx) => {
    const { id: userId, isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}

    const data = await app.$service.article.search(ctx.req.query.search, isAdmin ? {} : userId || {})
    ctx.res.send({ code: 200, data })
  },
  deleteArticle: async (ctx) => {
    const { id: userId, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (!isAdmin) {
      const isUserArticle = await app.$service.article.isUserArticle(ctx.req.query.id, userId)
      if (isUserArticle) {
        await app.$service.article.deleteArticle(ctx.req.query.id)
        ctx.res.send({ code: 200, message: '删除成功' })
      } else {
        ctx.res.send({ code: 9999, message: '无权限删除他人的攻略' })
      }
    } else {
      ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
    }
  },
} )
