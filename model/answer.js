const { TEXT, INTEGER, BOOLEAN } = require('sequelize')

module.exports = {
  schema: {
    questionId: { type: INTEGER, allowNull: false },
    comment: { type: TEXT, allowNull: false },
    isAnswer: { type: BOOLEAN, allowNull: false },
    userId: { type: INTEGER, allowNull: false },
    like: { type: INTEGER, allowNull: false },
  },
}
