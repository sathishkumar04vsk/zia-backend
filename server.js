const fs = require("fs");
const http = require('http');
const express = require('express');


const server = http.createServer((request, response)=>{
    
    if (request.url ==="/users"){
        response.writeHead(200, {'content-type':'application/json'});
        response.end([{"name":"Sathishkumar", "id":1},{"name":"Yuvaraj",id:2},{"name":"Sakthipriya",id:3}]);
    } 

    if (request.url==="/user/1"){
        response.writeHead(200, {'content-type':'application/json'});
        response.end([{"name":"Sathishkumar", "id":1}])

    }

    response.end();
})


server.listen(3000, ()=>{
    console.log("nodejs server is runing on localhost:3000!")
})

