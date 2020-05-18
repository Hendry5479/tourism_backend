const { TEXT, STRING, INTEGER } = require('sequelize')

module.exports = {
  schema: {
    title: { type: STRING(255), allowNull: false },
    comment: { type: TEXT, allowNull: false },
    userId: { type: INTEGER, allowNull: false },
    like: { type: INTEGER, allowNull: false },

  },
}
