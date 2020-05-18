const { INTEGER, BOOLEAN } = require('sequelize')
module.exports = {
  schema: {
    answerId: { type: INTEGER, allowNull: false },
    userId: { type: INTEGER, allowNull: false },
    like: { type: BOOLEAN, allowNull: false },
  },
}
