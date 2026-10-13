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

  process.env.IMAGE_PROVIDER='pollinations';
  r=await fetch(base+'/health');assert.equal((await r.json()).provider_configured,false);
  r=await fetch(base+'/api/images',{method:'POST',headers:{'x-api-token':'test-local-token','content-type':'application/json'},body:'{}'});assert.equal(r.status,503);
  process.env.POLLINATIONS_API_KEY='test-provider-key';
  const originalFetch=global.fetch;
  let destination='',body,authHeader='';
  global.fetch=async(url,opts)=>{destination=url;body=JSON.parse(opts.body);authHeader=opts.headers.Authorization;return{ok:true,json:async()=>({data:[{b64_json:'ZmFrZQ=='}]})};};
  try{
   const rr=await originalFetch(base+'/api/images',{method:'POST',headers:{'x-api-token':'test-local-token','content-type':'application/json'},body:JSON.stringify({prompt:'An illustrative green rice field image',size:'1024x1024'})});
   assert.equal(rr.status,200);
   assert.equal((await rr.json()).image_base64,'ZmFrZQ==');
   assert.equal(destination,'https://gen.pollinations.ai/v1/images/generations');
   assert.equal(body.model,'flux');
   assert.equal(authHeader,'Bearer test-provider-key');
  }finally{global.fetch=originalFetch;delete process.env.IMAGE_PROVIDER;delete process.env.POLLINATIONS_API_KEY;}
  console.log('PASS backend health, auth, optional provider adapter and 404');
 }finally{delete process.env.ACADEMY_API_TOKEN;delete process.env.IMAGE_PROVIDER;delete process.env.POLLINATIONS_API_KEY;await new Promise(resolve=>server.close(resolve));}
})().catch(err=>{console.error(err);process.exitCode=1;});
