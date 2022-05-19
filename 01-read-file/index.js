const fs = require('fs')
const path = require('path')

const a = path.join(__dirname, 'text.txt')
const readStream = fs.createReadStream(a)

readStream.on('data', (chunk) => {
    console.log(chunk.toString())
})
