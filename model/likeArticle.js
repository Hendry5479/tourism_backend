const { INTEGER, BOOLEAN } = require('sequelize')
module.exports = {
  schema: {
    articleId: { type: INTEGER, allowNull: false },
    userId: { type: INTEGER, allowNull: false },
    like: { type: BOOLEAN, allowNull: false },
  },
}
