const util = require('../libs/util')
const path = require('path')

const wechat_file = path.join(__dirname, './config/wechat.txt')

module.exports = {
  port: 80,
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