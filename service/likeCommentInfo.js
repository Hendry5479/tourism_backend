module.exports = app => ( {
  isUserLiked: async (commentInfoId, userId) => {
    const data = await app.$model.commentInfo.findAll({ raw: true, where: { commentInfoId, userId, like: true } })
    return data.length > 0
  },
  isLikeExist: async (commentInfoId, userId) => {
    const data = await app.$model.commentInfo.findAll({ raw: true, where: { commentInfoId, userId } })
    return data.length > 0
  },
  like: async (like, commentInfoId, userId, isExist) => {
    if (isExist) {
      await app.$model.commentInfo.update({ like, where: { commentInfoId, userId } })
    } else {
      await app.$model.commentInfo.create({ like, commentInfoId, userId })
    }
  },
} )
