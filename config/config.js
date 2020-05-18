const bodyParser = require('body-parser')
const helmet = require('helmet')
const express = require('express')
const cors = require('cors')
const path = require('path')
const jwt = require('express-jwt')
const history = require('connect-history-api-fallback')
const errorHandler = require('../middleware/errorHandler')

module.exports = {
  db: {
    dialect: 'mysql',
    host: '101.132.159.200',
    username: 'root',
    password: 'yellow',
    database: 'tourism',
    define: {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
      timestamps: true,
    },
    timezone: '+08:00',
  },
  jwt: {
    secret: 'a&*38QthAKuiRwISGLoAStgq^3%^$zvA3A6Hfr8MF$jM*HY4*dWcwAW&9NGp7*b53!',
    options: { expiresIn: '6h' },
  },
  middleware: [],
  plugin: [
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    helmet(),
    express.static(path.join(__dirname, '../static')),
    cors(),
    jwt({ secret: 'a&*38QthAKuiRwISGLoAStgq^3%^$zvA3A6Hfr8MF$jM*HY4*dWcwAW&9NGp7*b53!' })
    .unless({ path: /^\/api\/(public)|(test)|(upload)/ }),
    errorHandler,
    history({
      htmlAcceptHeaders: [ 'text/html', 'application/xhtml+xml' ],
      rewrites: [
        {
          from: /^\/.*$/,
          to: function() {
            return '/'
          },
        },
      ],
    }),
  ],
}
