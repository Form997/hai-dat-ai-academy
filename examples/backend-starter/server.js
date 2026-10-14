'use strict';
const http = require('node:http');
const server=http.createServer((req,res)=>{
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.setHeader('Cache-Control','no-store');
  if(req.method==='GET'&&req.url==='/health'){res.writeHead(200);return res.end(JSON.stringify({status:'ok',mode:'demo'}));}
  if(req.method==='POST'&&req.url==='/api/generate'){res.writeHead(501);return res.end(JSON.stringify({error:'AI provider is not configured; demo only'}));}
  res.writeHead(404);res.end(JSON.stringify({error:'Not found'}));
});
server.listen(Number(process.env.PORT)||3000,'127.0.0.1',()=>console.log('Demo listening on localhost'));
