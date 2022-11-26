import * as http from 'http'
import * as fs from 'fs'
import * as url from 'url'
import * as crypto from 'crypto'

let server = http.createServer()
server.listen(8081)

server.on('request',handleRequest)

function handleRequest(req,res){
     console.log("request");
     let querys;
     try{
          querys = url.parse(req.url).query.split('=')[1];
     }catch{}
     let urlPath = url.parse(req.url).pathname;

     if(urlPath =='/fromServer80' && req.headers['x-auth']==hash('server*0')){
          console.log('passed');
          fs.readFile(`./Pages/index.${querys}`,(err,data)=>{
               res.end(data)
          })
     }
     else{
          res.writeHead(404)
          res.end('Error')
     }
}

function hash(key){
     return crypto.createHash('sha1').update('yeshwanth'+key).digest('base64')
}