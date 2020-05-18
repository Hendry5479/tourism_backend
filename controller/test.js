const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
module.exports = () => ( {
  decrypt: async (encryptedInfo) => {
    const privateKey = fs.readFileSync(path.join(__dirname, '../public/rsa_private_key.pem'), 'utf-8')
    let buffer2 = Buffer.from(encryptedInfo, 'base64')
    let decrypted = crypto.privateDecrypt({
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    }, buffer2)
    return decrypted.toString('utf-8')
  },
} )
