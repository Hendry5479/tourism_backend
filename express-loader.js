const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const { errorHandler } = require('./utils')
//聚合中间件
const { compose } = require('compose-middleware')
//三个 flush 用于开发模式的更新
const flushMysql = false
const flushApiConfig = false
const flushApiRouter = false

//加载目录
function load(dir, cb) {
  const url = path.resolve(__dirname, dir)
  const files = fs.readdirSync(url)
  files.forEach((fileName) => {
    //获取文件名 除去.js
    fileName = fileName.replace(/\.js/, '')
    //导入文件
    let module = require(`${url}/${fileName}`)
    cb(fileName, module)
  })
}

//初始化 router
function initRouter(app) {
  //自动化生成 frontend 的 api 文件
  const api = {}

  //admin
  load('routes', function(fileName, routes) {
    // /api/admin
    const prefix = `/api/${fileName}`
    // 避免生成的 API 文件报错
    api[fileName] = []
    //传入 app 返回对象
    routes = routes(app)
    //遍历键
    Object.keys(routes).forEach(key => {
      // /getRouterList get
      const [ route, method ] = key.split(' ')
      //后期导入到 API 文件用
      const router = { name: `${route.slice(1)}`, route: `${prefix}${route}`, method }
      //是否强制更新我们的文件
      if (flushApiRouter || flushApiConfig) api[fileName].push(router)
      console.log('正在映射地址', `${method.toLocaleUpperCase()} ${router.route}`)
      //注册路由
      //app.$app = express()
      //app.$app.get('/api/admin/getRouterList')
      app.$app[method](prefix + route, async (req, res) => {
        //将 req,res 赋值给 ctx
        app.ctx = { req, res }
        await errorHandler.global(app, fileName, method, route)(async function() {
          await routes[key]()
        })
      })
    })
  })
  //自动化生成文件
  if (flushApiRouter) {
    Object.keys(api).forEach(key => {
      let content = [ `import request from '@/utils/request'` ]
      api[key].forEach(router => {
        content.push(`export function ${router.name}() {
          return request({
            url:'${router.route}',
            method:'${router.method}'
          })
        }`)
      })
      //写入到前端 src/api.js
      fs.writeFileSync(path.join(__dirname, `../frontend/src/api/${key}.js`), content.join('\n'))
    })
  }

  if (flushApiConfig) {
    let apiContent = [ 'export default {' ]
    Object.keys(api).forEach(key => {
      let content = [ `${key}: {` ]
      api[key].forEach(router => {
        content.push(`${router.name}: '${router.route}',`)
      })
      content.push('},')
      apiContent.push(content.join('\r'))
    })
    apiContent.push('}')
    fs.writeFileSync(path.join(__dirname, `../frontend/src/config/api.js`), apiContent.join('\r'))

  }
}


//初始化 $ctrl
function initController(app) {
  const controllers = {}
  load('controller', (fileName, controller) => {
    controllers[fileName] = {}
    Object.keys(controller(app)).forEach(key => {
      controllers[fileName][key] = async (...args) => {
        return await errorHandler.error({
          controllerName: `$ctrl.${fileName}.${key}`,
        })(async function() {
          return await controller(app)[key](...args)
        })
      }
    })
  })
  return controllers
}

//初始化 $service
function initService(app) {
  const services = {}
  load('service', (fileName, service) => {
    services[fileName] = {}
    Object.keys(service(app)).forEach(key => {
      services[fileName][key] = async (...args) => {
        return await errorHandler.error({
          serviceName: `$service.${fileName}.${key}`,
        })(async function() {
          return await service(app)[key](...args)
        })
      }
    })
  })
  return services
}

//初始化配置文件
function initConfig(app) {
  load('config', function(_, conf) {
    if (conf.db) {
      app.$db = new Sequelize(conf.db)
      app.$model = {}
      load('model', function(modelName, { schema, options }) {
        modelName !== 'index' && ( app.$model[modelName] = app.$db.define(modelName, schema, options) )
      })
      createConnection(app)
      app.$db.sync({ force: flushMysql })
    }
    if (conf.jwt) {
      app.$jwt = conf.jwt
    }
    if (conf.middleware) {
      conf.middleware.forEach(mid => {
        const midPath = path.resolve(__dirname, 'middleware', mid)
        app.$app.use(require(midPath))
      })
    }
    if (conf.plugin) {
      app.$app.use(compose(conf.plugin))
    }
  })
}

function createConnection(app) {
  const createFunc = require('./model/index')
  createFunc(app)
}

/*
 function initSchedule() {
 load('schedule', (fileName, scheduleConfig) => {
 schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler)
 })
 }*/

module.exports = { initRouter, initController, initService, initConfig /*initSchedule*/ }
