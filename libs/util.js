const fs = require('fs')

exports.readFileAsync = function (fpath, encodening) {
    return new Promise((resolve, reject) => {
        fs.readFile(fpath, encodening, (err, content) => {
            if (err) {
                reject(err)
            }
            resolve(content)
        })
    })
}

exports.writeFileAsync = function (fpath, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fpath, content, (err, content) => {
            if (err) {
                reject(err)
            }
            resolve()
        })
    })
}