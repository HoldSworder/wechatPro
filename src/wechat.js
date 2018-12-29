const koa2Req = require('koa2-request')

let prefix = 'https://api.weixin.qq.com/cgi-bin/'
let api = {
  accessToken: prefix + 'token?grant_type=client_credential'
}

module.exports = class Wechat {
  constructor(opts) {
    this.appID = opts.appID
    this.appSecret = opts.appSecret
    this.getAccessToken = opts.getAccessToken
    this.saveAccessToken = opts.saveAccessToken

    this.init()
  }

  async init() {
    let data = await this.getAccessToken()

    if (data && data.length != 0) {
      data = JSON.parse(data)
      if (!this.isValidAccessToken(data)) {
        data = await this.updateAccessToken()
      }
    } else {
      data = await this.updateAccessToken()
    }

    this.access_token = data.access_token
    this.expires_in = data.expires_in
    this.saveAccessToken(JSON.stringify(data))
  }

  isValidAccessToken(data) {
    if (!data || !data.access_token || !data.expires_in) {
      return false
    }

    let expires_in = data.expires_in
    let now = (new Date().getTime())

    if (now < expires_in) {
      return true
    } else {
      return false
    }
  }

  updateAccessToken() {
    let appID = this.appID
    let appSecret = this.appSecret
    let url = api.accessToken + '&appID=' + appID + '&secret=' + appSecret

    return new Promise(async (resolve, reject) => {
      let res = await koa2Req(url)
      let data = JSON.parse(res.body)
      data.expires_in = new Date().getTime() + (data.expires_in - 20) * 1000
      resolve(data)
    })
  }
}