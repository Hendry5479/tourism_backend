const JWTDecode = require('jwt-decode')
const Sequelize = require('sequelize')
module.exports = app => ( {
  getRouterList: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      const data = await app.$model.router.findAll({ raw: true })
      ctx.res.send({ code: 200, data })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  addRouter: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      await app.$model.router.create(ctx.req.body)
      ctx.res.send({ code: 200, message: '添加路由成功' })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  deleteRouter: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      await app.$model.router.destroy({ where: { id: ctx.req.body.id } })
      ctx.res.send({ code: 200, message: '删除路由成功' })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  updateRouter: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      const { id, ...rest } = ctx.req.body
      await app.$model.router.update({ ...rest }, { where: { id } })
      ctx.res.send({ code: 200, message: '更新路由成功' })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  getAdminList: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      const data = await app.$model.admin.findAll({ raw: true })
      ctx.res.send({ code: 200, data })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  addAdmin: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      await app.$model.admin.create(ctx.req.body)
      ctx.res.send({ code: 200, message: '添加管理员成功' })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  deleteAdmin: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      await app.$model.admin.destroy({ where: { id: ctx.req.body.id } })
      ctx.res.send({ code: 200, message: '删除管理员成功' })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  updateAdmin: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      const { id, ...rest } = ctx.req.body
      await app.$model.admin.update({ ...rest }, { where: { id } })
      ctx.res.send({ code: 200, message: '更新管理员成功' })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  getAnswerList: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      const data = await app.$model.answer.findAll({
        raw: true,
        include: [
          { model: app.$model.question, as: 'question', attributes: [] },
          { model: app.$model.user, as: 'user', attributes: [] },
        ],
        attributes: [
          'id',
          'isAnswer',
          'questionId',
          Sequelize.col('question.title'),
          'userId',
          Sequelize.col('user.nickName'),
          'createdAt',
          'updatedAt',
        ],
      })
      ctx.res.send({ code: 200, data: data.map(item => ( { ...item, isAnswer: item.isAnswer ? '是' : '否' } )) })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  deleteAnswer: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      await app.$model.likeAnswer.destroy({ where: { answerId: ctx.req.body.id } })
      await app.$model.answer.destroy({ where: { id: ctx.req.body.id } })
      ctx.res.send({ code: 200, message: '删除答案成功' })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  getArticleList: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      const data = await app.$model.article.findAll({
        raw: true,
        include: [
          { model: app.$model.user, as: 'user', attributes: [] },
        ],
        attributes: [
          'id',
          'title',
          'comment',
          'userId',
          Sequelize.col('user.nickName'),
          'createdAt',
          'updatedAt',
        ],
      })
      ctx.res.send({ code: 200, data })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  deleteArticle: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      await app.$model.likeArticle.destroy({ where: { articleId: ctx.req.body.id } })
      const data = app.$model.commentInfo.findAll({ raw: true, where: { articleId: ctx.req.body.id } })
      await data.map(async item => {
        await app.$model.likeCommentInfo.destroy({ where: { commentInfoId: item.id } })
      })
      await app.$model.commentInfo.destroy({ where: { articleId: ctx.req.body.id } })
      await app.$model.article.destroy({ where: { id: ctx.req.body.id } })
      ctx.res.send({ code: 200, message: '删除文章成功' })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  getCommentInfoList: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      const data = await app.$model.commentInfo.findAll({
        raw: true,
        include: [
          { model: app.$model.article, as: 'article', attributes: [] },
          { model: app.$model.user, as: 'user', attributes: [] },
        ],
        attributes: [
          'id',
          'articleId',
          Sequelize.col('article.title'),
          'userId',
          Sequelize.col('user.nickName'),
          Sequelize.col('user.comment'),
          'updatedAt',
          'createdAt',
        ],
      })
      ctx.res.send({ code: 200, data })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  deleteCommentInfo: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      await app.$model.likeCommentInfo.destroy({ where: { commentInfoId: ctx.req.body.id } })
      await app.$model.commentInfo.destroy({ where: { id: ctx.req.body.id } })
      ctx.res.send({ code: 200, message: '删除评论成功' })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  getLikeArticleList: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      const data = await app.$model.likeArticle.findAll({
        raw: true,
        include: [
          { model: app.$model.article, as: 'article', attributes: [] },
          { model: app.$model.user, as: 'user', attributes: [] },
        ],
        attributes: [
          'id',
          'articleId',
          'userId',
          'like',
          Sequelize.col('user.nickName'),
          Sequelize.col('article.title'),
          'updatedAt',
          'createdAt',
        ],
      })
      ctx.res.send({ code: 200, data: data.map(item => ( { ...item, like: item.like ? '是' : '否' } )) })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  getLikeCommentInfoList: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      const data = await app.$model.likeCommentInfo.findAll({
        raw: true,
        include: [
          { model: app.$model.commentInfo, as: 'commentInfo', attributes: [] },
          { model: app.$model.user, as: 'user', attributes: [] },
        ],
        attributes: [
          'id',
          'commentInfoId',
          'userId',
          'like',
          Sequelize.col('user.nickName'),
          Sequelize.col('commentInfo.articleId'),
          'updatedAt',
          'createdAt',
        ],
      })
      ctx.res.send({ code: 200, data: data.map(item => ( { ...item, like: item.like ? '是' : '否' } )) })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  getLikeQuestionList: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      const data = await app.$model.likeQuestion.findAll({
        raw: true,
        include: [
          { model: app.$model.question, as: 'question', attributes: [] },
          { model: app.$model.user, as: 'user', attributes: [] },
        ],
        attributes: [
          'id',
          'questionId',
          'userId',
          'like',
          Sequelize.col('user.nickName'),
          Sequelize.col('question.title'),
          'updatedAt',
          'createdAt',
        ],
      })
      ctx.res.send({ code: 200, data: data.map(item => ( { ...item, like: item.like ? '是' : '否' } )) })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  getLikeAnswerList: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      const data = await app.$model.likeAnswer.findAll({
        raw: true,
        include: [
          { model: app.$model.answer, as: 'answer', attributes: [] },
          { model: app.$model.user, as: 'user', attributes: [] },
        ],
        attributes: [
          'id',
          'answerId',
          'userId',
          'like',
          Sequelize.col('user.nickName'),
          Sequelize.col('answer.comment'),
          'updatedAt',
          'createdAt',
        ],
      })
      ctx.res.send({ code: 200, data: data.map(item => ( { ...item, like: item.like ? '是' : '否' } )) })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  getQuestionList: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      const data = await app.$model.question.findAll({
        raw: true,
        include: [
          { model: app.$model.user, as: 'user', attributes: [] },
        ],
        attributes: [
          'id',
          'title',
          'userId',
          Sequelize.col('user.nickName'),
          'updatedAt',
          'createdAt',
        ],
      })
      ctx.res.send({ code: 200, data })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  deleteQuestion: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      await app.$model.likeQuestion.destroy({ where: { questionId: ctx.req.body.id } })
      const data = app.$model.answer.findAll({ raw: true, where: { questionId: ctx.req.body.id } })
      await data.map(async item => {
        await app.$model.likeAnswer.destroy({ where: { answerId: item.id } })
      })
      await app.$model.answer.destroy({ where: { questionId: ctx.req.body.id } })
      await app.$model.question.destroy({ where: { id: ctx.req.body.id } })
      ctx.res.send({ code: 200, message: '删除问题成功' })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  getUserList: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      const data = await app.$model.user.findAll({ raw: true })
      ctx.res.send({ code: 200, data })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
  deleteUser: async (ctx) => {
    const { isAdmin } = ctx.req.headers.authorization ? JWTDecode(ctx.req.headers.authorization) : {}
    if (isAdmin) {
      await app.$model.likeArticle.destroy({ where: { userId: ctx.req.body.id } })
      await app.$model.likeQuestion.destroy({ where: { userId: ctx.req.body.id } })
      await app.$model.likeAnswer.destroy({ where: { userId: ctx.req.body.id } })
      await app.$model.likeCommentInfo.destroy({ where: { userId: ctx.req.body.id } })
      await app.$model.answer.destroy({ where: { userId: ctx.req.body.id } })
      await app.$model.question.destroy({ where: { userId: ctx.req.body.id } })
      await app.$model.commentInfo.destroy({ where: { userId: ctx.req.body.id } })
      const articles = await app.$model.article.findAll({ where: { userId: ctx.req.body.id } })
      await Promise.all(articles.map(async item => {
        await app.$model.likeArticle.destroy({ where: { articleId: item.id } })
        const commentInfos = await app.$model.commentInfo.findAll({ raw: true, where: { articleId: item.id } })
        await Promise.all(commentInfos.map(async commentInfo => {
          await app.$model.likeCommentInfo.destroy({ where: { commentInfoId: commentInfo.id } })
        }))
        await app.$model.commentInfo.destroy({ where: { articleId: item.id } })
      }))
      await app.$model.article.destroy({ where: { userId: ctx.req.body.id } })
      await app.$model.user.destroy({ where: { id: ctx.req.body.id } })
      ctx.res.send({ code: 200, message: '删除用户成功' })
    } else {
      ctx.res.send({ code: 9999, message: '无权限访问' })
    }
  },
} )
