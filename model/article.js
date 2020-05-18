const { STRING, INTEGER, DATE, BOOLEAN } = require('sequelize')
module.exports = {
  schema: {
    title: { type: STRING(255), allowNull: true },
    comment: { type: STRING(255), allowNull: true },
    imageUrl: { type: STRING(255), allowNull: true },
    richText: { type: STRING(255), allowNull: true },
    userId: { type: INTEGER, allowNull: true },
    time: { type: DATE, allowNull: true },
    days: { type: INTEGER, allowNull: true },
    people: { type: STRING(255), allowNull: true },
    fee: { type: STRING, allowNull: true },
    watch: { type: INTEGER, allowNull: true },
    like: { type: INTEGER, allowNull: true },
    isPub: { type: BOOLEAN, allowNull: true },
    isHot: { type: BOOLEAN, allowNull: true },
  },
}
