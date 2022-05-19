const fs = require('fs')
const path = require('path')

fs.mkdir(path.join(__dirname,'project-dist'),(err)=>{
  if(err){
    fs.readdir(path.join(__dirname,'project-dist'),{ withFileTypes: true },(err,file1)=>{//читаем project-dist
      file1.forEach((el)=>{
        if(el.isDirectory()){

          fs.readdir(path.join(__dirname,'project-dist',`${el.name}`),{ withFileTypes: true },(err,file2)=>{//читаем project-dist/assets
            file2.forEach((elem)=>{
              if(elem.isDirectory()){
                fs.readdir(path.join(__dirname,'project-dist',`${el.name}`,`${elem.name}`),{ withFileTypes: true },(err,file3)=>{//читаем project-dist/assets/fonts itc
                  file3.forEach((element)=>{
                    fs.unlink((path.join(__dirname,'project-dist',`${el.name}`,`${elem.name}`,`${element.name}`)),(err)=>{if(err){throw err}})
                  })
                  fs.rmdir((path.join(__dirname,'project-dist',`${el.name}`,`${elem.name}`)),(err)=>{})

                  fs.readdir(path.join(__dirname,'styles'),(err,file1)=>{
                    if(err){throw err}
                    fs.writeFile(path.join(__dirname,'project-dist',`style.css`),``, (err)=>{
                        if(err){throw err}
                      }) 
                    file1.forEach((el)=>{
                        if(path.parse(path.join(__dirname,'styles',`${el}`)).ext=='.css'){
                            const readStream = fs.createReadStream(path.join(__dirname,'styles', `${el}`))
                            readStream.on('data', (chunk) => {
                              fs.appendFile(path.join(__dirname,'project-dist',`style.css`),`${chunk.toString()}`, (err)=>{
                                if(err){throw err}
                              })        
                          })
                        }
                    })
                  })//собираем стили 
                  const readStream = fs.createReadStream(path.join(__dirname,'template.html'))
                  readStream.on('data', (chunk) => { 
                    const readStream1 = fs.createReadStream(path.join(__dirname,'components', 'articles.html'))
                    readStream1.on('data', (chunk1) => { 
                      const readStream2 = fs.createReadStream(path.join(__dirname,'components', 'footer.html'))
                      readStream2.on('data', (chunk2) => {
                        const readStream3 = fs.createReadStream(path.join(__dirname,'components', 'header.html'))
                        readStream3.on('data', (chunk3) => { 
              
                          let a = chunk.toString().replace('{{header}}',chunk3.toString())
                          a = a.replace('{{articles}}',chunk1.toString())
                          a = a.replace('{{footer}}',chunk2.toString())
              
                          fs.writeFile(path.join(__dirname,'project-dist',`index.html`),`${a}`, (err)=>{
                            if(err){throw err}
                          })
                        })   
                      })  
                    })    
                  })//заменяем html код
                  fs.readdir(path.join(__dirname,'assets'),{ withFileTypes: true },(err,file1)=>{if(err){throw err}
                  for(let i = 0; i<file1.length; i++){
                    if(file1[i].isDirectory()){
                      fs.mkdir(path.join(__dirname,'project-dist','assets',`${file1[i].name}`),(err)=>{})
                      fs.readdir(path.join(__dirname,'assets',`${file1[i].name}`),(err,file2)=>{if(err){throw err}
                      file2.forEach((el)=>{
                        //console.log(el)
                        fs.copyFile(path.join(__dirname,'assets',`${file1[i].name}`,`${el}`), path.join(__dirname,'project-dist','assets',`${file1[i].name}`,`${el}`),(err)=>{if(err){throw err}})
                      })
                    })
                    }
                  }
              
                  })//копируем assets
                                    
                })                
              }else{fs.unlink((path.join(__dirname,'project-dist',`${el.name}`,`${elem.name}`)),(err)=>{if(err){throw err}})}
            })
          })
        }else{
          fs.unlink((path.join(__dirname,'project-dist',`${el.name}`)),(err)=>{if(err){throw err}})
        }
      })
    })

  }else{
    fs.mkdir(path.join(__dirname,'project-dist','assets'),(err)=>{if(err){throw err}}) //создаем каталог асетс
    //fs.readdir(path.join(__dirname,'assets'),{ withFileTypes: true },(err,file1)=>{if(err){throw err}
    fs.readdir(path.join(__dirname,'styles'),(err,file1)=>{
      if(err){throw err}
      fs.writeFile(path.join(__dirname,'project-dist',`style.css`),``, (err)=>{
          if(err){throw err}
        }) 
      file1.forEach((el)=>{
          if(path.parse(path.join(__dirname,'styles',`${el}`)).ext=='.css'){
              const readStream = fs.createReadStream(path.join(__dirname,'styles', `${el}`))
              readStream.on('data', (chunk) => {
                fs.appendFile(path.join(__dirname,'project-dist',`style.css`),`${chunk.toString()}`, (err)=>{
                  if(err){throw err}
                })        
            })
          }
      })
    })//собираем стили 
    const readStream = fs.createReadStream(path.join(__dirname,'template.html'))
    readStream.on('data', (chunk) => { 
      const readStream1 = fs.createReadStream(path.join(__dirname,'components', 'articles.html'))
      readStream1.on('data', (chunk1) => { 
        const readStream2 = fs.createReadStream(path.join(__dirname,'components', 'footer.html'))
        readStream2.on('data', (chunk2) => {
          const readStream3 = fs.createReadStream(path.join(__dirname,'components', 'header.html'))
          readStream3.on('data', (chunk3) => { 

            let a = chunk.toString().replace('{{header}}',chunk3.toString())
            a = a.replace('{{articles}}',chunk1.toString())
            a = a.replace('{{footer}}',chunk2.toString())

            fs.writeFile(path.join(__dirname,'project-dist',`index.html`),`${a}`, (err)=>{
              if(err){throw err}
            })
          })   
        })  
      })    
    })//заменяем html код
    fs.readdir(path.join(__dirname,'assets'),{ withFileTypes: true },(err,file1)=>{if(err){throw err}
    for(let i = 0; i<file1.length; i++){
      if(file1[i].isDirectory()){
        fs.mkdir(path.join(__dirname,'project-dist','assets',`${file1[i].name}`),(err)=>{if(err){throw err}})
        fs.readdir(path.join(__dirname,'assets',`${file1[i].name}`),(err,file2)=>{if(err){throw err}
        file2.forEach((el)=>{
          //console.log(el)
          fs.copyFile(path.join(__dirname,'assets',`${file1[i].name}`,`${el}`), path.join(__dirname,'project-dist','assets',`${file1[i].name}`,`${el}`),(err)=>{if(err){throw err}})
        })
      })
      }
    }

    })//копируем assets

  }
})





//node 06-build-page