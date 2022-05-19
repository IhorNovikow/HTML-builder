const fs = require('fs')
const path = require('path')

fs.readdir(path.join(__dirname,'files'),{ withFileTypes: true },(err,file1)=>{
  if(err){throw err}
  fs.mkdir(path.join(__dirname,'files-copy'),(err)=>{
    if(err){

      fs.readdir(path.join(__dirname,'files-copy'),(err,file2)=>{
        if(err){throw err}
        for(let i=0; i<file2.length;i++){
          fs.unlink(path.join(__dirname,'files-copy',`${path.parse(path.join(__dirname,'files-copy',`${file2[i]}`)).name+path.parse(path.join(__dirname,'files-copy',`${file2[i]}`)).ext}`),(err)=>{
            if(err){throw err}
          })
        }
      })
      for(let i=0; i<file1.length; i++){
        fs.writeFile(path.join(__dirname,'files-copy',`${file1[i].name.toString()}`),'', (err)=>{
          if(err){throw err}
        }) 
        const readStream = fs.createReadStream(path.join(__dirname,'files', `${file1[i].name.toString()}`))
        readStream.on('data', (chunk) => {
          fs.writeFile(path.join(__dirname,'files-copy',`${file1[i].name.toString()}`),`${chunk.toString()}`, (err)=>{
            if(err){throw err}
          })        
      })
      }
    }else{
      for(let i=0; i<file1.length; i++){
        fs.writeFile(path.join(__dirname,'files-copy',`${file1[i].name.toString()}`),'', (err)=>{
          if(err){throw err}
        }) 
        const readStream = fs.createReadStream(path.join(__dirname,'files', `${file1[i].name.toString()}`))
        readStream.on('data', (chunk) => {
          fs.writeFile(path.join(__dirname,'files-copy',`${file1[i].name.toString()}`),`${chunk.toString()}`, (err)=>{
            if(err){throw err}
          })        
      })
      }
    }
  }
  )
})

//node 04-copy-directory