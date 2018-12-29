const Koa = require('koa2')
const link = require('./src/link')
const config = require('./config/config')

let app = new Koa()

app.use(link(config.wechat))

app.listen(config.port)
console.log('Listening: 80')