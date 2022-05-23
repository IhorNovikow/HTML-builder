const fs = require('fs')
const path = require('path')


fs.readdir(path.join(__dirname,'styles'),(err,file1)=>{
    if(err){throw err}
    fs.writeFile(path.join(__dirname,'project-dist',`bundle.css`),``, (err)=>{
        if(err){throw err}
      }) 
    file1.forEach((el)=>{
        if(path.parse(path.join(__dirname,'styles',`${el}`)).ext=='.css'){
            const readStream = fs.createReadStream(path.join(__dirname,'styles', `${el}`))
            readStream.on('data', (chunk) => {
              fs.appendFile(path.join(__dirname,'project-dist',`bundle.css`),`${chunk.toString()}`, (err)=>{
                if(err){throw err}
              })        
          })
        }

    })
})

//console.log(1)
//node 05-merge-styles