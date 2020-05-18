const { INTEGER, TEXT } = require('sequelize')

module.exports = {
  schema: {
    articleId: { type: INTEGER, allowNull: false },
    comment: { type: TEXT, allowNull: false },
    userId: { type: INTEGER, allowNull: false },
    like: { type: INTEGER, allowNull: false },
  },
}
