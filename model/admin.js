const { STRING } = require('sequelize')
module.exports = {
  schema: {
    name: { type: STRING(255), allowNull: true },
    password: { type: STRING(255), allowNull: true },
  },
}
