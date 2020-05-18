const nodemailer = require('nodemailer')

async function main(to, subject, text) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false, //
    auth: {
      user: '843006076@qq.com',
      pass: 'lekjbvctotezbeei',
    },
  })

  let info = await transporter.sendMail({
    from: '"四川旅游网管理员" <843006076@qq.com>',
    to,
    subject,
    text,
  })
}

main().catch(console.error)

module.exports = {
  mailer: main,
}
