const fs = require('fs');
const http = require('http')


const server = http.createServer((req, res)=>{
    res.write(JSON.stringify({"name":"yuvaraj", "batch":"ZIA-12", "course":"FUll-S"}))
    res.end();
})


server.listen(3000,()=> console.log("server is runing"))


// const file = fs.writeFileSync('yuvaraj.txt',"Hi Yuvaraj! How are you?")


console.log('successfully created')