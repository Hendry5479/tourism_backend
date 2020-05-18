const Sequelize = require('sequelize')
module.exports = app => ( {
  createQuestion: async (params, userId) => {
    await app.$model.question.create({ ...params, userId, like: 0 })
  },
  isUserQuestion: async (id, userId) => {
    const info = await app.$model.question.findAll({ raw: true, where: { userId, id } })
    return info.length > 0
  },
  deleteQuestion: async (id) => {
    await app.$model.likeQuestion.destroy({ where: { questionId: id } })
    await app.$model.question.destroy({ where: id })
  },
  isQuestionExist: async (id) => {
    const info = await app.$model.question.findAll({ where: { id } })
    return info.length > 0
  },
  isQuestioner: async (id, userId) => {
    const info = await app.$model.question.findAll({ where: { id, userId } })
    return info.length > 0

  },
  getRecommend: async (num, userId) => {
    let data = await app.$model.question.findAll({
      raw: true,
      limit: num,
      include: [
        { model: app.$model.user, as: 'user', attributes: [] },
      ],
      attributes: [
        'id',
        'title',
        'userId',
        'updatedAt',
        Sequelize.col('user.nickName'),
        Sequelize.col('user.avatar_url'),
      ],
    })
    data = await Promise.all(data.map(async item => {
      item.isUserLike = false
      const likeList = await app.$model.likeQuestion.findAndCountAll({
        raw: true,
        where: { questionId: item.id, like: true },
      })
      const { count } = likeList
      if (userId) {
        const userLikeList = likeList.rows.filter(item => item.userId === userId)
        if (userLikeList.length > 0) {
          item.isUserLike = true
        }
      }
      item.like = count
      return item
    }))
    return data
  },
  getQuestionList: async (userId) => {
    let data = await app.$model.question.findAll({
      raw: true,
      include: [
        { model: app.$model.user, as: 'user', attributes: [] },
      ],
      attributes: [
        'id',
        'title',
        'comment',
        'userId',
        'createdAt',
        Sequelize.col('user.nickName'),
        Sequelize.col('user.avatar_url'),
      ],
    })
    data = await Promise.all(data.map(async item => {
      item.isUserLike = false
      const likeList = await app.$model.likeQuestion.findAndCountAll({
        raw: true,
        where: { questionId: item.id, like: true },
      })
      const { count } = likeList
      if (userId) {
        const userLikeList = likeList.rows.filter(item => item.userId === userId)
        if (userLikeList.length > 0) {
          item.isUserLike = true
        }
      }
      item.like = count
      return item
    }))
    return data
  },
  getQuestionListById: async (userId, id) => {
    let data = await app.$model.question.findAll({
      raw: true,
      where: { userId },
      include: [
        { model: app.$model.user, as: 'user', attributes: [] },
      ],
      attributes: [
        'id',
        'title',
        'like',
        'comment',
        'userId',
        'createdAt',
        Sequelize.col('user.nickName'),
        Sequelize.col('user.avatar_url'),
      ],
    })
    data = await Promise.all(data.map(async item => {
      item.isUserLike = false
      const likeList = await app.$model.likeQuestion.findAndCountAll({
        raw: true,
        where: { questionId: item.id, like: true },
      })
      const { count } = likeList
      if (id) {
        console.log(item.userId, userId)
        const userLikeList = likeList.rows.filter(item => item.userId === id)
        if (userLikeList.length > 0) {
          item.isUserLike = true
        }
      }
      item.like = count
      return item
    }))

    return data
  },
  getQuestionDetail: async (id, userId) => {
    const data = await app.$model.question.findOne({
      raw: true,
      where: { id },
      include: [
        { model: app.$model.user, as: 'user', attributes: [] },
      ],
      attributes: [
        'id',
        'title',
        'like',
        'comment',
        'userId',
        'createdAt',
        Sequelize.col('user.nickName'),
        Sequelize.col('user.avatar_url'),
      ],
    })
    let answerList = await app.$model.answer.findAll({
      raw: true,
      where: { questionId: id },
      include: [
        { model: app.$model.user, as: 'user', attributes: [] },
      ],
      attributes: [
        'id',
        'comment',
        'isAnswer',
        'userId',
        'createdAt',
        'like',
        Sequelize.col('user.nickName'),
        Sequelize.col('user.avatar_url'),
      ],
    })
    answerList = await Promise.all(answerList.map(async item => {
      item.isUserLike = false
      const likeList = await app.$model.likeAnswer.findAndCountAll({
        raw: true,
        where: { answerId: item.id, like: true },
      })
      const { count } = likeList
      if (userId) {
        const userLikeList = likeList.rows.filter(item => item.userId === userId)
        if (userLikeList.length > 0) {
          item.isUserLike = true
        }
      }
      item.like = count
      return item
    }))
    data.questionList = answerList
    return data
  },
  search: async (search, userId) => {
    let data = await app.$model.question.findAll({
      raw: true,
      where: {
        title: { [Sequelize.Op.like]: `%${search}%` },
      },
      include: [
        { model: app.$model.user, as: 'user', attributes: [] },
      ],
      attributes: [
        'id',
        'title',
        'comment',
        'userId',
        'createdAt',
        Sequelize.col('user.nickName'),
        Sequelize.col('user.avatar_url'),
      ],
    })
    data = await Promise.all(data.map(async item => {
      item.isUserLike = false
      const likeList = await app.$model.likeQuestion.findAndCountAll({
        raw: true,
        where: { questionId: item.id, like: true },
      })
      const { count } = likeList
      if (userId) {
        const userLikeList = likeList.rows.filter(item => item.userId === userId)
        if (userLikeList.length > 0) {
          item.isUserLike = true
        }
      }
      item.like = count
      return item
    }))
    return data
  },
} )
