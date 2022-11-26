import * as http from 'http'
import * as crypto from 'crypto'
import * as fs from 'fs'
import * as url from 'url'

let server = http.createServer();
server.listen(80)
server.on("request",requestHandler)

function requestHandler(req,res){
     let urlPath = url.parse(req.url).pathname
     let urlQuery;
     try{
          urlQuery = url.parse(req.url).query.split('=')[1]

     }catch{}
     if(req.url == '/'){
          handleView().then(r=>{
               res.end(r)
          })
     }
     else if(urlPath == '/search'){
        let modelData;
         handleModel(urlQuery).then(r=>{
          modelData = r;
         res.end(modelData);
         })
     }
     else if(urlPath =='/assert'){
          handleView(urlQuery).then(r=>{
               res.end(r)
          })
     }
}

function handleModel(query) {
     return new Promise((resolve,rej)=>{
          http.get({
               method:'GET',
               port:8080,
               hostname:'localhost',
               protocol:'http:',
               path:`/fromServer80?name=${query}`,
               headers:{
                   'x-auth':hash(query)
               }
        },(res)=>{
          let data = ''
             res.on('data',(chunk)=>{
                  data+=chunk.toString();
             })
             res.on('error',(err)=>{
                  rej(err);
             })
             res.on('close',()=>{
             resolve(data)
             })
        })
        
     })	
}

function handleView(query='html'){
  return new Promise((resolve,rej)=>{
     http.get({
          hostname:'localhost',
          protocol:'http:',
          port:8081,
          path:`/fromServer80?name=${query}`,
          headers:{
               'x-auth':hash('server*0')
          }
     },(res)=>{
          let data = '';
          res.on('data',(chunk)=>{
               data+=chunk.toString()
          })
          res.on('close',()=>{
               resolve(data)
          })
     })
  })
}

function hash(key){
     return crypto.createHash('sha1').update('yeshwanth'+key).digest('base64')
}