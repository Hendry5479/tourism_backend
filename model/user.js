const { STRING, INTEGER } = require('sequelize')
module.exports = {
  schema: {
    nickName: { type: STRING(30), allowNull: false },
    name: { type: STRING(30), allowNull: false },
    password: { type: STRING(255), allowNull: false },
    age: { type: INTEGER, allowNull: true },
    email: { type: STRING(30), allowNull: true },
    phoneNumber: { type: STRING(11), allowNull: true },
    roleId: { type: INTEGER, allowNull: true },
    comment: { type: STRING(30), allowNull: true },
    avatar_url: { type: STRING(255), allowNull: true },
  },
}
