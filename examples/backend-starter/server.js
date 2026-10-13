'use strict';
const http=require('node:http');
const {timingSafeEqual}=require('node:crypto');
const PORT=Number(process.env.PORT||3000);
const HOST=process.env.HOST||'127.0.0.1';
const MAX=8*1024;
const WINDOW=60_000;
const LIMIT=Number(process.env.API_RATE_LIMIT||5);
const seen=new Map();
const allowedSizes=new Set(['1024x1024','1536x1024','1024x1536']);
function json(res,status,data){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data));}
function authorized(req){const secret=process.env.ACADEMY_API_TOKEN||'';const provided=req.headers['x-api-token'];if(typeof provided!=='string'||!secret||Buffer.byteLength(provided)!==Buffer.byteLength(secret))return false;return timingSafeEqual(Buffer.from(provided),Buffer.from(secret));}
function readBody(req){return new Promise((resolve,reject)=>{let body='',bytes=0;req.on('data',chunk=>{bytes+=chunk.length;if(bytes>MAX){reject(Object.assign(new Error('Payload too large'),{status:413}));req.destroy();return;}body+=chunk;});req.on('end',()=>{try{resolve(JSON.parse(body));}catch{reject(Object.assign(new Error('Invalid JSON'),{status:400}));}});req.on('error',reject);});}
async function image(req,res){
 if(!authorized(req))return json(res,401,{error:'Unauthorized'});
 const token=req.headers['x-api-token'];
 const now=Date.now(),record=seen.get(token)||{start:now,count:0};if(now-record.start>WINDOW){record.start=now;record.count=0;}record.count++;seen.set(token,record);if(record.count>LIMIT)return json(res,429,{error:'Rate limit exceeded'});
 const provider=process.env.IMAGE_PROVIDER||'openai';
 if(!['openai','pollinations'].includes(provider))return json(res,503,{error:'Unknown image provider'});
 const key=provider==='pollinations'?process.env.POLLINATIONS_API_KEY:process.env.OPENAI_API_KEY;
 if(!key)return json(res,503,{error:'Image provider not configured'});
 let data;try{data=await readBody(req);}catch(e){return json(res,e.status||400,{error:e.status===413?'Payload too large':'Invalid JSON'});}
 const prompt=data&&typeof data.prompt==='string'?data.prompt.trim():'';
 const size=data&&typeof data.size==='string'?data.size:'1024x1024';
 if(prompt.length<10||prompt.length>1200||!allowedSizes.has(size))return json(res,400,{error:'Invalid prompt or size'});
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),45_000);
 try{
  const target=provider==='pollinations'?'https://gen.pollinations.ai/v1/images/generations':'https://api.openai.com/v1/images/generations';
  const model=provider==='pollinations'?(process.env.POLLINATIONS_IMAGE_MODEL||'flux'):(process.env.OPENAI_IMAGE_MODEL||'gpt-image-1');
  const upstream=await fetch(target,{method:'POST',headers:{'Authorization':'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify(provider==='pollinations'?{model,prompt,size,n:1,response_format:'b64_json'}:{model,prompt,size,n:1}),signal:controller.signal});
  if(!upstream.ok){return json(res,502,{error:'Image provider returned an error',provider_status:upstream.status});}
  const result=await upstream.json();const b64=result?.data?.[0]?.b64_json;
  if(typeof b64!=='string')return json(res,502,{error:'Provider did not return base64 image'});
  return json(res,200,{image_base64:b64,mime_type:'image/png',model});
 }catch{return json(res,504,{error:'Image provider unavailable or timed out'});}finally{clearTimeout(timeout);}
}
const server=http.createServer(async(req,res)=>{
 const pathname=new URL(req.url||'/', 'http://localhost').pathname;
 if(req.method==='GET'&&pathname==='/health')return json(res,200,{status:'ok',provider:process.env.IMAGE_PROVIDER||'openai',provider_configured:Boolean((process.env.IMAGE_PROVIDER||'openai')==='pollinations'?process.env.POLLINATIONS_API_KEY:process.env.OPENAI_API_KEY)});
 if(req.method==='POST'&&pathname==='/api/images')return image(req,res);
 return json(res,404,{error:'Not found'});
});
if(require.main===module){if(!Number.isInteger(PORT)||PORT<1||PORT>65535)throw Error('Invalid PORT');if(HOST!=='127.0.0.1'&&HOST!=='::1')throw Error('Public bind disabled; deploy behind authenticated gateway after review');server.listen(PORT,HOST,()=>console.log('Private API listening on '+HOST+':'+PORT));}
module.exports={server};
