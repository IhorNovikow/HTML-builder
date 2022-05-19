const fs = require('fs')
const path = require('path')
const process = require('process');
const readline = require('readline'); 

fs.writeFile(path.join(__dirname, 'text.txt'), '', (err) => {
    if(err){
        throw err
    }
})

let  read = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                prompt: 'а напишика мне тут что нить и я положу это в фаил text.txt\n'
            });

read.prompt();

read.on('line', (input) => {
    input = input.toLowerCase();    
     if(input == 'exit'){
        read.close();
     }else{
        input = input.toLowerCase();
        fs.appendFile(path.join(__dirname, 'text.txt'),`${input}`, (err) => {
          if(err){
              throw err
          }
          console.log('продолжай, мне это нравится')
      })
     }
     
});
process.on('exit', function () {
    console.log('ууууу, вот сейчас обидно было, я думал у нас любовь')
});

//node 02-write-file