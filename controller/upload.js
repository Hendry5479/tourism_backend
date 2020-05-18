const Formidable = require('formidable')
const path = require('path')
const fs = require('fs')
module.exports = () => ( {
  uploadImage: async (ctx, type) => {
    const form = new Formidable.IncomingForm()
    form.parse(ctx.req, (err, _, files) => {
      let data = []
      Object.keys(files).forEach(index => {
        const file = files[index]
        const fileName = /\/(upload\w*)/.exec(file.path)[1]
        const suffix = /\.\w+$/.exec(file.name)[0]
        const url = path.join(__dirname, `../static/${type}/${fileName}${suffix}`)
        data.push(`/${type}/${fileName}${suffix}`)
        fs.writeFileSync(url, fs.readFileSync(file.path))
      })
      ctx.res.send({
          code: 200,
          errorno: 0,
          data,
        },
      )
    })
  },
} )
