const { STRING } = require('sequelize')
module.exports = {
  schema: {
    name: { type: STRING(30), allowNull: false },
    url: { type: STRING(255), allowNull: false },
  },
}
