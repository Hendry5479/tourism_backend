const JWTDecode = require('jwt-decode')
module.exports = app => ( {
  createComment: async (ctx) => {
    const { id: userId, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (!isAdmin) {
      if (!userId) {
        ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
      } else {
        const isArticleExist = await app.$service.article.isArticleExist(ctx.req.body.articleId)
        if (!isArticleExist) {
          ctx.res.send({ code: 9999, message: '文章不存在' })
        } else {
          await app.$service.commentInfo.createComment(ctx.req.body, userId)
          ctx.res.send({ code: 200, message: '发布评论成功' })
        }
      }
    } else {
      ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
    }
  },
  likeCommentInfo: async (ctx) => {
    const { id: userId, isAdmin } = JWTDecode(ctx.req.headers.authorization)
    if (!isAdmin) {
      if (!userId) {
        ctx.res.send({ code: 9999, message: 'token无效,请重新登录' })
      } else {
        const isUserLiked = await app.$service.likeCommentInfo.isUserLiked(ctx.req.body.id, userId)
        if (isUserLiked) {
          await app.$model.likeCommentInfo.like(false, ctx.req.body.id, userId, true)
          ctx.res.send({ code: 200, message: '取消点赞成功' })
        } else {
          const isDataExist = await app.$service.likeCommentInfo.isLikeExist(ctx.req.body.id, userId)
          if (isDataExist) {
            await app.$model.likeCommentInfo.like(true, ctx.req.body.id, userId, true)
            ctx.res.send({ code: 200, message: '点赞成功' })
          } else {
            await app.$model.likeCommentInfo.like(true, ctx.req.body.id, userId, false)
            ctx.res.send({ code: 200, message: '点赞成功' })
          }
        }
      }
    }
  }
  ,
} )
