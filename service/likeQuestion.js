module.exports = app => ( {
  isUserLiked: async (questionId, userId) => {
    const data = await app.$model.likeQuestion.findAll({ raw: true, where: { questionId, userId, like: true } })
    return data.length > 0
  },
  isLikeExist: async (questionId, userId) => {
    const data = await app.$model.likeQuestion.findAll({ raw: true, where: { questionId, userId } })
    return data.length > 0
  },
  like: async (like, questionId, userId, isExist) => {
    if (isExist) {
      await app.$model.likeQuestion.update({ like }, { where: { questionId, userId } })
    } else {
      await app.$model.likeQuestion.create({ like, questionId, userId })
    }
  },
} )
