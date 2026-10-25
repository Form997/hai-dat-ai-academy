'use strict';
// DOM integration harness; does not claim real-browser layout verification.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const api=require('../versions/rag-core.js'),docs=require('../versions/rag-corpus.json');
const source=fs.readFileSync(path.join(__dirname,'../versions/rag.js'),'utf8');
function element(){return {value:'',textContent:'',children:[],listeners:{},append(...nodes){this.children.push(...nodes);},replaceChildren(){this.children=[];this.textContent='';},addEventListener(e,fn){this.listeners[e]=fn;}};}
async function load(fetch){
 const ids=Object.fromEntries(['ragQuery','ragResult','ragSearch'].map(id=>[id,element()]));
 vm.runInNewContext(source,{AcademyRAG:api,fetch,document:{getElementById:id=>ids[id],createElement:()=>element()}});
 await new Promise(resolve=>setImmediate(resolve));return ids;
}
(async()=>{
 const ids=await load(async()=>({ok:true,json:async()=>docs}));
 assert.equal(ids.ragSearch.disabled,false);
 ids.ragQuery.value='Bảo vệ mật khẩu token GitHub';ids.ragSearch.listeners.click();
 assert.ok(ids.ragResult.children.some(n=>n.children.some(c=>c.href===docs[0].url)));
 ids.ragQuery.value='ET0 ETc Kc bao nhiêu?';ids.ragSearch.listeners.click();
 assert.ok(!ids.ragResult.children.some(n=>n.children.some(c=>c.href)));
 for(const fetch of [async()=>({ok:false,status:404}),async()=>{throw Error('offline');},async()=>({ok:true,json:async()=>{throw Error('invalid JSON');}}),async()=>({ok:true,json:async()=>[{...docs[0],url:'javascript:alert(1)'}]})]){
  const failed=await load(fetch);assert.equal(failed.ragSearch.disabled,true);
  failed.ragSearch.listeners.click();assert.ok(failed.ragResult.textContent.includes('Không tải được'));
 }
 console.log('PASS RAG DOM integration: load, evidence, refusal, HTTP/network/JSON/schema failure');
})().catch(e=>{console.error(e);process.exitCode=1;});
