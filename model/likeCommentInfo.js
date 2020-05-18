const { INTEGER, BOOLEAN } = require('sequelize')
module.exports = {
  schema: {
    commentInfoId: { type: INTEGER, allowNull: false },
    userId: { type: INTEGER, allowNull: false },
    like: { type: BOOLEAN, allowNull: false },
  },
}
