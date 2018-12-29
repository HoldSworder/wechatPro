const sha1 = require('sha1')
// const Promise = require('bluebird')
const Wechat = require('./wechat')
const util = require('./util')
const getRawBody = require('raw-body')

module.exports = function (opts) {
	let wechat = new Wechat(opts)

	return async (ctx, next) => {
		let query = ctx.query
		request = ctx.request

		let token = opts.token
		signature = query.signature
		nonce = query.nonce
		timestamp = query.timestamp
		echostr = query.echostr

		let str = [token, timestamp, nonce].sort().join('')
		sha = sha1(str)

		let method = request.method
		if (sha === signature) {
			if (method === 'GET') {
				if (sha === signature) {
					ctx.body = echostr
				} else {
					ctx.body = 'Wrong'
				}
			} else if (method === 'POST') {
				try {
					const data = await getRawBody(ctx.req, {
						length: ctx.length,
						limit: '1mb',
						encodeing: ctx.charset
					})
					const content = await util.parseXMLAsync(data)
					const message = util.formatMessage(content.xml)

					const reply = util.tpl(replyBody, msg)
					let now = new Date().getTime()
					ctx.status = 200
					ctx.type = 'application/xml'
					var reply = util.tel()
					ctx.body = reply
				} catch (error) {
					console.log(error)
				}
			}
		} else {
			ctx.body = {
				code: -1,
				msg: "fail"
			}
		}
	}
}