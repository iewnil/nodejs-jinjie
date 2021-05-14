/*
 * @Description: 
 * @Date: 2021-04-17 22:27:50
 * @LastEditTime: 2021-04-17 23:41:55
 * @LastEditors: linwei
 */
const fs = require('fs');

setTimeout(() => {
    console.log('setTimeout 1'); 

    fs.readFile('./test.js', {encoding: 'utf-8'}, (err, data) => {
        if (err) throw err;
        console.log('read file 1');

    });

    Promise.resolve().then(()=>{
      console.log('promise then 1');
    });
}, 0);

fs.readFile('./test.js', {encoding: 'utf-8'}, (err, data) => {

    if (err) throw err;
    console.log('read file 2');

    fs.readFile('./test.js', {encoding: 'utf-8'}, (err, data) => {
      if (err) throw err;
      console.log('read file 3');

    });

    Promise.resolve().then(()=>{
      console.log('promise then 2');

      setTimeout(() => { 
        console.log('setTimeout 2'); 
      }, 0);

      Promise.resolve().then(()=>{
        console.log('promise then 3');
      });
    });
});

Promise.resolve().then(()=>{
    console.log('promise then 4');
});

console.log('console.log 1');

