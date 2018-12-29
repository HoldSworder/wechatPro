exports.reply = async (ctx, next) => {
  const message = ctx.weixin

  if (message.MsgType === 'text') {
    let content = message.Content
    let reply = '我不知道你说的' + content + '是什么意思'

    if (content === '1') {
      reply = '111111'
    } else if (content === '2') {
      reply = '222222'
    }

    ctx.body = reply
  }

  await next()
}