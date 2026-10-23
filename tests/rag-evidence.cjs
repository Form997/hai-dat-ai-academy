'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const api=require('../versions/rag-core.js');
const docs=JSON.parse(fs.readFileSync(path.join(root,'versions/rag-corpus.json'),'utf8'));
const cases=JSON.parse(fs.readFileSync(path.join(root,'versions/rag-eval.json'),'utf8'));
assert.equal(docs.length,5);
assert.equal(new Set(docs.map(d=>d.id)).size,docs.length);
for(const d of docs){
 assert.ok(/^https:\/\//.test(d.url));
 assert.ok(d.text&&d.title&&d.verified_scope&&d.source_type);
}
for(const c of cases){
 const r=api.answer(docs,c.query);
 if(c.expected_id){assert.equal(r.status,'evidence_found','False refusal: '+c.query);assert.ok(r.results.some(x=>x.doc.id===c.expected_id),'Missing expected evidence: '+c.query);}
 else assert.equal(r.status,'insufficient_evidence','Must refuse unsupported query: '+c.query);
}
assert.equal(api.answer(docs,'...').status,'insufficient_evidence');
assert.ok(api.tokens('độ ẩm đất').includes('do'));
assert.deepEqual(api.tokens('ĐẤT'),api.tokens('đất'));
assert.deepEqual(api.tokens('ĐỘ ẨM ĐẤT'),api.tokens('do am dat'));
assert.deepEqual(api.tokens('có và là cần'),[]);
const refusal=api.answer(docs,'GitHub xyz');
assert.equal(refusal.status,'insufficient_evidence');
assert.equal(refusal.results.length,0);
assert.ok(refusal.candidates.some(x=>x.doc.id==='GITHUB-SEC-01'));
const m=api.metrics(cases,docs);
assert.equal(m.hit_at_5,1);
assert.equal(m.false_acceptances,0);
assert.equal(m.false_refusals,0);
assert.equal(m.correct_refusals,cases.filter(c=>c.expected_id===null).length);
assert.equal(m.abstention_precision,1);
assert.equal(m.abstention_recall,1);
// Retrieval success must not conceal a refusal on an answerable query.
const separate=api.metrics([{query:'GitHub xyz',expected_id:'GITHUB-SEC-01'}],docs);
assert.equal(separate.hit_at_5,1);
assert.equal(separate.false_refusals,1);
assert.equal(separate.answer_rate,0);
assert.equal(api.metrics([],docs).hit_at_5,null);
// Distractors make top-k ranking testable with a corpus larger than k.
const distractors=Array.from({length:8},(_,i)=>({id:'NOISE-'+i,title:'ET0',text:'thông tin khác'}));
assert.equal(api.search([...distractors,...docs],'ET0 ETc Kc',1)[0].doc.id,'FAO56-ET0-01');
console.log('PASS V3.8 RAG regression checks',JSON.stringify(m));
