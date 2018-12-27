const Koa = require('koa2')
const link = require('./src/link')
const path = require('path')
const util = require('./libs/util')

const wechat_file = path.join(__dirname, './config/wechat.txt')

let config = {
    wechat: {
        appID: 'wxf122221dc8bfbfdb',
        appSecret: 'ef79ffe81efd6dd5d8d527d12258e7b4',
        token: 'qzrisreallyagenius',
        getAccessToken() {
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken(data) {
            data = JSON.stringify(data)
            return util.writeFileAsync(wechat_file, data)
        }
    }
}

let app = new Koa()

app.use(link(config.wechat))

app.listen(80)
console.log('Listening: 80')