module.exports = app => ( {
  createAnswer: async (params, userId) => {
    await app.$model.answer.create({ ...params, userId, like: 0, isAnswer: false })
  },
  setAnswer: async (id, questionId) => {
    await app.$model.answer.update({ isAnswer: false }, { where: { questionId } })
    await app.$model.answer.update({ isAnswer: true }, { where: { id } })
  },
} )
