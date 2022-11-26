import * as https from 'https'
import * as http from 'http'
import * as url from 'url'
import * as crypto from 'crypto'

function getData(query) {
     return new Promise((resolve,rej)=>{
          https.get({
               method:'GET',
               hostname:'api.api-ninjas.com',
               path:`/v1/animals?name=${query}`,
               protocol:'https:',
               headers:{
               'X-Api-Key':'PGdS2dwkeK/4722ruUyMww==YxTERYUYtYJHY5Kj'
               }
          },(res)=>{
               let data = ''
               res.on('data',(chunk)=>{
                    data+=chunk.toString();
               })
               res.on('error',(e)=>{
                    console.log(e);
                    rej(e)
               })
               res.on('close',()=>{
                    let datas = JSON.parse(data);
                    resolve(datas)
               })
          })
     })
}

const server = http.createServer()
server.listen(8080)

server.on('request',(req,res)=>{
     let urlPath = url.parse(req.url).pathname;
     let urlQuery 
     try{
          urlQuery= url.parse(req.url).query.split('=')[1];
     }catch{}

     if(urlPath =='/fromServer80' && req.headers['x-auth']==verifier(urlQuery)){
     res.writeHead(200);
     getData(urlQuery.trim().replaceAll(" ",'+')).then(r=>{
     res.end(JSON.stringify(r))
     })
     }
     else{
          res.writeHead(404)
          res.end(JSON.stringify({message:'noOuterAcess'}))
     }

})

function verifier(key){
     return crypto.createHash('sha1').update('yeshwanth'+key).digest('base64')
}