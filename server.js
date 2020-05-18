const express = require('express')
const {
  initConfig,
  initController,
  initRouter,
  initService
} = require('./express-loader.js')

class Server {
  constructor(conf) {
    this.$app = express()
    this.conf = conf || {}
    initConfig(this)
    this.$ctrl = initController(this)
    this.$service = initService(this)
    initRouter(this)
  }

  start() {
    this.$app.listen(this.conf.port || 3000, () => {
      console.log('服务器启动成功,端口:', this.conf.port || 3000)
    })
  }
}

module.exports=Server
