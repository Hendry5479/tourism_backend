const { decrypt } = require('../utils')

module.exports = (app) => ( {
  getName: async () => {
    const data = await app.$model.user.findAll({ raw: true })
    return data
  },
  setInfo: async (data) => {
    console.log(data)
    await app.$model.user.create(data)
    return true
  },
  isUserExist: async (name) => {
    const info = await app.$model.user.findAll({ raw: true, where: { name } })
    return info.length > 0
  },
  register: async (info) => {
    await app.$model.user.create(info)
    return true
  },
  loginCheck: async ({ name = '', password = '' }) => {
    const info = await app.$model.user.findOne({ raw: true, where: { name: name } })
    if (info === null) return null
    const { password: info_password, ...rest } = info
    return decrypt(info_password) === decrypt(password) ? rest : null
  },
  getUserInfoById: async (id) => {
    const info = await app.$model.user.findOne({
      raw: true,
      where: { id },
      attributes: [
        'avatar_url',
        'nickName',
        'phoneNumber',
        'age',
        'email',
        'comment',
      ],
    })
    return info
  },
  updateComment: async (comment, id) => {
    await app.$model.user.update({ comment }, { where: { id } })
  },
  getComment: async (id) => {
    const data = await app.$model.user.findOne({ raw: true, where: { id }, attributes: [ 'comment' ] })
    return data
  },
  getUserInfo: async (id) => {
    const data = await app.$model.user.findOne({
      raw: true,
      where: { id },
      attributes: [
        'id',
        'nickName',
        'email',
        'phoneNumber',
        'age',
        'avatar_url',
      ],
    })
    return data
  },
  checkBeforePassword: async (id, pwd) => {
    const data = await app.$model.user.findOne({ raw: true, where: { id } })
    return decrypt(data.password) === decrypt(pwd)
  },
  setUserInfo: async (body) => {
    const { nickName, avatar_url, email, phoneNumber, age, password, id } = body
    await app.$model.user.update({ nickName, avatar_url, email, phoneNumber, age, password }, { where: { id } })

  },
} )
