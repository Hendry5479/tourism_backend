const Sequelize = require('sequelize')

module.exports = (app) => ( {
  getListByOrderType: async (type, userId) => {
    let data = await app.$model.article.findAll({
      raw: true,
      where: { isPub: true },
      include: [
        { model: app.$model.user, as: 'user', attributes: [] },
      ],
      order: type === 'hot'
        ? [ 'watch' ]
        : [ 'createdAt' ],

      attributes: [
        'id',
        'title',
        'comment',
        'imageUrl',
        'userId',
        'updatedAt',
        'watch',
        Sequelize.col('user.nickName'),
        Sequelize.col('user.avatar_url'),
      ],
    })
    data = await Promise.all(data.map(async item => {
      item.isUserLike = false
      const likeList = await app.$model.likeArticle.findAndCountAll({
        raw: true,
        where: { articleId: item.id, like: true },
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
  createArticle: async (data) => {
    const result = await app.$model.article.create({ ...data })
    return result.dataValues
  },
  edit: async (data, id) => {
    await app.$model.article.update(data, { where: { id } })
  },
  isArticleExist: async (id) => {
    const info = await app.$model.article.findAll({ raw: true, where: { id } })
    return info.length > 0
  },
  preview: async (id) => {
    const info = await app.$model.article.findOne({
      raw: true,
      include: [
        { model: app.$model.user, as: 'user', attributes: [] },
      ],
      where: { id },
      attributes: [
        'id',
        'title',
        'comment',
        'imageUrl',
        'richText',
        'userId',
        'time',
        'days',
        'fee',
        'people',
        'watch',
        'like',
        'updatedAt',
        Sequelize.col('user.nickName'),
        Sequelize.col('user.avatar_url'),
      ],
    })
    return info
  },
  getListByUserId: async (userId, id) => {
    let data = await app.$model.article.findAll({
      raw: true,
      include: [
        { model: app.$model.user, as: 'user', attributes: [] },
      ],
      where: { userId, isPub: true },
      attributes: [
        'id',
        'title',
        'comment',
        'imageUrl',
        'userId',
        'updatedAt',
        'watch',
        Sequelize.col('user.nickName'),
        Sequelize.col('user.avatar_url'),
      ],
    })
    data = await Promise.all(data.map(async item => {
      item.isUserLike = false
      const likeList = await app.$model.likeArticle.findAndCountAll({
        raw: true,
        where: { articleId: item.id, like: true },
      })
      console.log(likeList)
      const { count } = likeList
      if (id) {
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
  getRandomList: async (num) => {
    const data = await app.$model.article.findAll({
      raw: true,
      where: { isPub: true },
      limit: num,
      order: Sequelize.fn('RAND'),
      include: [
        { model: app.$model.user, as: 'user', attributes: [] },
      ],
      attributes: [
        'id',
        'title',
        'comment',
        'imageUrl',
        'userId',
        'updatedAt',
        'watch',
        'like',
        Sequelize.col('user.nickName'),
        Sequelize.col('user.avatar_url'),
      ],
    })
    return data
  },
  getRecommend: async (num, userId) => {
    let data = await app.$model.article.findAll({
      raw: true,
      limit: num,
      order: [ 'watch' ],
      include: [
        { model: app.$model.user, as: 'user', attributes: [] },
      ],
      where: {
        isPub: true,
      },
      attributes: [
        'id',
        'title',
        'comment',
        'imageUrl',
        'userId',
        'updatedAt',
        'watch',
        Sequelize.col('user.nickName'),
        Sequelize.col('user.avatar_url'),
      ],
    })
    data = await Promise.all(data.map(async item => {
      item.isUserLike = false
      const likeList = await app.$model.likeArticle.findAndCountAll({
        raw: true,
        where: { articleId: item.id, like: true },
      })
      console.log(likeList)
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
  getArticleDetail: async (id) => {
    const data = await app.$model.article.findOne({
      raw: true,
      where: { id },
      include: [
        { model: app.$model.user, as: 'user', attributes: [] },
      ],
      attributes: [
        'id',
        'title',
        'comment',
        'imageUrl',
        'richText',
        'userId',
        'time',
        'days',
        'fee',
        'people',
        'watch',
        'like',
        'updatedAt',
        Sequelize.col('user.nickName'),
        Sequelize.col('user.avatar_url'),
      ],
    })
    const watch = data.watch || 0
    await app.$model.article.update({ watch: watch + 1 }, { where: { id } })
    const commentList = await app.$service.commentInfo.getCommentById(id)
    data.commentList = commentList
    return data
  },
  getEditListById: async (userId) => {
    const data = await app.$model.article.findAll({
      raw: true,
      include: [
        { model: app.$model.user, as: 'user', attributes: [] },
      ],
      where: { userId, isPub: false },
      attributes: [
        'id',
        'title',
        'comment',
        'imageUrl',
        'userId',
        'updatedAt',
        'watch',
        'like',
        Sequelize.col('user.nickName'),
        Sequelize.col('user.avatar_url'),
      ],
    })
    return data
  },
  search: async (search, userId) => {
    let data = await app.$model.article.findAll({
      raw: true,
      include: [
        { model: app.$model.user, as: 'user', attributes: [] },
      ],
      where: {
        title: { [Sequelize.Op.like]: `%${search}%` },
        isPub: true,
      },
      attributes: [
        'id',
        'title',
        'comment',
        'imageUrl',
        'userId',
        'updatedAt',
        'watch',
        'like',
        Sequelize.col('user.nickName'),
        Sequelize.col('user.avatar_url'),
      ],
    })
    data = await Promise.all(data.map(async item => {
      item.isUserLike = false
      const likeList = await app.$model.likeArticle.findAndCountAll({
        raw: true,
        where: { articleId: item.id, like: true },
      })
      console.log(likeList)
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
  isUserArticle: async (id, userId) => {
    const data = await app.$model.article.findAll({ raw: true, where: { id, userId } })
    return data.length > 0
  },
  deleteArticle: async (id) => {
    await app.$model.likeArticle.destroy({ where: { articleId: id } })
    await app.$model.article.destroy({ where: { id } })
  },
} )
