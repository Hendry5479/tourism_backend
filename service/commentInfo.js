const Sequelize = require('sequelize')
module.exports = app => ( {
  createComment: async (params, userId) => {
    await app.$model.commentInfo.create({ ...params, userId, like: 0 })
  },
  getCommentById: async (articleId) => {
    const data = await app.$model.commentInfo.findAll({
      raw: true,
      where: { articleId },
      include: [
        { model: app.$model.user, as: 'user', attributes: [] },
      ],
      attributes: [
        'id',
        'comment',
        'userId',
        'createdAt',
        'like',
        Sequelize.col('user.nickName'),
        Sequelize.col('user.avatar_url'),
      ],
    })
    return data
  },
} )
