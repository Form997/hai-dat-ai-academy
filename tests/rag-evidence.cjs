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
 if(c.expected_id)assert.ok(r.results.some(x=>x.doc.id===c.expected_id),'Missing expected evidence: '+c.query);
 else assert.equal(r.status,'insufficient_evidence','Must refuse unsupported query: '+c.query);
}
assert.equal(api.answer(docs,'...').status,'insufficient_evidence');
assert.ok(api.tokens('độ ẩm đất').includes('do'));
const m=api.metrics(cases,docs);
assert.ok(m.recall_at_5>=5/7);
assert.equal(m.correct_refusals,2);
console.log('PASS V3.8 RAG evidence retrieval, source IDs and refusal evaluation',JSON.stringify({recall_at_5:m.recall_at_5,correct_refusals:m.correct_refusals}));
