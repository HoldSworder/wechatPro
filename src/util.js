let xml2js = require('xml2js')

exports.parseXMLAsync = function (xml) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, {
      trim: true
    }, (err, content) => {
      if (err) {
        reject(err)
      }
      resolve(content)
    })
  })
}

const formatMessage = function (result) {
  let message = {}

  if (typeof result === 'object') {
    const keys = Object.keys(result)

    for (let i = 0; i < keys.length; i++) {
      let item = result[keys[i]]
      let key = keys[i]

      if (!(item instanceof Array) || item.length === 0) {
        continue
      } else if (item.length === 1) {
        let val = item[0]

        if (typeof val === 'object') {
          messgae[key] = formatMessage(val)
        } else {
          message[key] = (val || '').trim()
        }
      } else {
        message[key] = [];
        for (var j = 0, k = item.length; j < k; j++) {
          message[key].push(formatMessage(item[j]))
        }
      }
    }
  }

  return message
}

exports.formatMessage = formatMessage

exports.tpl = function () {
  let xml = `<xml> 
              <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
              <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
              <CreateTime>${now}</CreateTime>
              <MsgType><![CDATA[text]]></MsgType>
              <Content><![CDATA[${message.Content}]]></Content>
            </xml>`
}