const { decrypt } = require('../utils')

module.exports = app => ( {
  loginCheck: async ({ name = '', password = '' }) => {
    const info = await app.$model.admin.findOne({ raw: true, where: { name: name } })
    if (info === null) return null
    const { password: info_password, ...rest } = info
    return decrypt(info_password) === decrypt(password) ? rest : null
  },
} )
