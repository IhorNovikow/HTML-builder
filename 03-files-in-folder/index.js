const fs = require('fs')
const path = require('path')

fs.readdir(path.join(__dirname,'secret-folder'),{ withFileTypes: true }, (err,file)=>{
     if(err){throw err}

file.forEach((el)=>{
    if(el.isDirectory()){
        true
    }else{
        fs.stat(path.join(__dirname, 'secret-folder', `${el.name}`),(err,stats)=>{if(err){throw err} 
          console.log(`< ${path.parse(path.join(__dirname, 'secret-folder', `${el.name}`)).name} >-< ${path.parse(path.join(__dirname, 'secret-folder', `${el.name}`)).ext} >-< ${stats.size}b>`)
            
        })       
    }
})
})
//node 03-files-in-folder