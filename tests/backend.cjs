'use strict';
const assert=require('node:assert/strict');
const {server}=require('../examples/backend-starter/server');
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+server.address().port;
 try{
  let r=await fetch(base+'/health');assert.equal(r.status,200);assert.equal((await r.json()).status,'ok');
  r=await fetch(base+'/api/images',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({prompt:'Test prompt longer than 10 characters'})});assert.equal(r.status,401);
  r=await fetch(base+'/nonexistent');assert.equal(r.status,404);
  process.env.ACADEMY_API_TOKEN='test-local-token';
  r=await fetch(base+'/api/images',{method:'POST',headers:{'x-api-token':'test-local-token','content-type':'application/json'},body:'{}'});assert.equal(r.status,503);
  console.log('PASS backend health, auth, missing provider and 404');
 }finally{delete process.env.ACADEMY_API_TOKEN;await new Promise(resolve=>server.close(resolve));}
})().catch(err=>{console.error(err);process.exitCode=1;});
