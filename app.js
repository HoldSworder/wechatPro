const Koa = require('koa')
const link = require('./src/link')

let config = {
    wechat: {
        appId: 'wxf122221dc8bfbfdb',
        appSecret: 'ef79ffe81efd6dd5d8d527d12258e7b4',
        token: 'qzrisreallyagenius'
    }
}

let app = new Koa()

app.use(link(config))

app.listen(80)
console.log('Listening: 80')