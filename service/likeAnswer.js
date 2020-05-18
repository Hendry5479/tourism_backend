module.exports = app => ( {
  isUserLiked: async (id, userId) => {
    const data = await app.$model.likeAnswer.findAll({ raw: true, where: { answerId: id, userId, like: true } })
    return data.length > 0
  },
  isLikeExist: async (id, userId) => {
    const data = await app.$model.likeAnswer.findAll({ raw: true, where: { answerId: id, userId } })
    return data.length > 0
  },
  like: async (like, id, userId, isExist) => {
    if (isExist) {
      await app.$model.likeAnswer.update({ like }, { where: { answerId: id, userId } })
    } else {
      await app.$model.likeAnswer.create({ like, answerId: id, userId })
    }
  },
} )
