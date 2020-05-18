module.exports = app => ( {
  isUserLiked: async (articleId, userId) => {
    const data = await app.$model.likeArticle.findAll({ raw: true, where: { articleId, userId, like: true } })
    return data.length > 0
  },
  isLikeExist: async (articleId, userId) => {
    const data = await app.$model.likeArticle.findAll({ raw: true, where: { articleId, userId } })
    return data.length > 0
  },
  like: async (like, articleId, userId, isExist) => {
    if (isExist) {
      await app.$model.likeArticle.update({ like }, { where: { articleId, userId } })
    } else {
      await app.$model.likeArticle.create({ like, articleId, userId })
    }
  },
} )
