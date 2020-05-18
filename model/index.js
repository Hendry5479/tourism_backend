function connect(app, { model, connectedModel, foreignKey, target = 'id' }) {
  app.$model[model].belongsTo(app.$model[connectedModel], { foreignKey })
  app.$model[connectedModel].hasMany(app.$model[model], { foreignKey, target })
}

const connectArr = [
  { model: 'article', connectedModel: 'user', foreignKey: 'userId' },
  { model: 'commentInfo', connectedModel: 'article', foreignKey: 'articleId' },
  { model: 'commentInfo', connectedModel: 'user', foreignKey: 'userId' },
  { model: 'question', connectedModel: 'user', foreignKey: 'userId' },
  { model: 'answer', connectedModel: 'user', foreignKey: 'userId' },
  { model: 'answer', connectedModel: 'question', foreignKey: 'questionId' },
  { model: 'likeAnswer', connectedModel: 'answer', foreignKey: 'answerId' },
  { model: 'likeAnswer', connectedModel: 'user', foreignKey: 'userId' },
  { model: 'likeQuestion', connectedModel: 'question', foreignKey: 'questionId' },
  { model: 'likeQuestion', connectedModel: 'user', foreignKey: 'userId' },
  { model: 'likeArticle', connectedModel: 'article', foreignKey: 'articleId' },
  { model: 'likeArticle', connectedModel: 'user', foreignKey: 'userId' },
  { model: 'likeCommentInfo', connectedModel: 'commentInfo', foreignKey: 'commentInfoId' },
  { model: 'likeCommentInfo', connectedModel: 'user', foreignKey: 'userId' },
]

module.exports = function(app) {
  connectArr.forEach(connection => {
    connect(app, connection)
  })
}
