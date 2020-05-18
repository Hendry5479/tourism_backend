const jwt = require('jsonwebtoken')
module.exports = function(info, secret) {
  return jwt.sign(info, secret, { expiresIn: '6h' })
}
