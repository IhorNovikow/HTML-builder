const fs = require('fs')
const path = require('path')

let a = path.join(__dirname, 'secret-folder')
let q = [];

fs.readdir(a, { withFileTypes: true }, (err,file)=>{
    if(err){throw err}     
    let j = 0
    let num =0
    for(let i=0; i<file.length; i++){
        if(file[i].isDirectory()){
            let a = path.join(__dirname, 'secret-folder', `${file[i].name}`)
            fs.readdir(a, (err,file2)=>{
                if(err){throw err} 
                for(let k = 0; k<file2.length; k++){
                    let wey2 = path.join(__dirname, 'secret-folder',`${file[i].name.toString()}`,`${file2[k]}`)              
                    let reshirenie = path.parse(wey2).ext
                    let name = path.parse(wey2).name
                    q[j]=`< ${name} >-< ${reshirenie} >` 
                    
                    fs.stat(wey2,(err,stats)=>{
                        if(err){throw err} 
                        q[j]=q[j]+`-< ${stats.size}b>`
                        console.log(q)
                        j++
                    })
                }
            })
        }else{
            let wey2 = path.join(__dirname, 'secret-folder',`${file[i].name.toString()}`)              
            let reshirenie = path.parse(wey2).ext
            let name = path.parse(wey2).name    
            q[j]=`< ${name} >-< ${reshirenie} >` 
            fs.stat(wey2,(err,stats)=>{
                if(err){throw err} 
                q[num]=q[num]+`-< ${stats.size}b>`
                num++
            })           
            j++
        }
    }
})
//node 03-files-in-folder