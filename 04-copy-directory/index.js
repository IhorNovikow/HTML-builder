const fs = require('fs')
const path = require('path')

fs.readdir(path.join(__dirname,'files'),(err,file)=>{if(err){throw err}
fs.mkdir(path.join(__dirname,'files-copy'),(err)=>{
  if(err){
    fs.readdir(path.join(__dirname,'files-copy'),(err,file1)=>{if(err){throw err}
    file1.forEach((elem)=>{
      fs.unlink(path.join(__dirname, 'files-copy', `${elem}`),(err)=>{if(err){throw err}})
      })
      file.forEach((el)=>{
        fs.copyFile(path.join(__dirname, 'files', `${el}`),path.join(__dirname, 'files-copy', `${el}`),(err)=>{if(err){throw err}} )
      })
    })
  }else{
    file.forEach((el)=>{
      fs.copyFile(path.join(__dirname, 'files', `${el}`),path.join(__dirname, 'files-copy', `${el}`),(err)=>{if(err){throw err}} )
    })    
  }
})
})
//node 04-copy-directory