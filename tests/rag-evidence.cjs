'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const api=require(process.env.RAG_CORE_PATH||'../versions/rag-core.js');
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
assert.equal(m.hit_at_k,1);
assert.equal(m.false_acceptances,0);
assert.equal(m.false_refusals,0);
assert.equal(m.correct_refusals,cases.filter(c=>c.expected_id===null).length);
assert.equal(m.abstention_precision,1);
assert.equal(m.abstention_recall,1);
// Retrieval success must not conceal a refusal on an answerable query.
const separate=api.metrics([{query:'GitHub xyz',expected_id:'GITHUB-SEC-01'}],docs);
assert.equal(separate.hit_at_k,1);
assert.equal(separate.false_refusals,1);
assert.equal(separate.answer_rate,0);
assert.equal(api.metrics([],docs).hit_at_k,null);
// Distractors make top-k ranking testable with a corpus larger than k.
const distractors=Array.from({length:8},(_,i)=>({...docs[0],id:'NOISE-'+i,title:'ET0',text:'thông tin khác'}));
assert.equal(api.search([...distractors,...docs],'ET0 ETc Kc',1)[0].doc.id,'FAO56-ET0-01');
assert.ok(api.tokens('không công khai').includes('khong'));
assert.throws(()=>api.search(docs,'abc',0));
assert.throws(()=>api.answer(docs,'abc',{minCoverage:NaN}));
assert.throws(()=>api.validateCorpus([...docs,docs[0]]));
for(const url of ['javascript:alert(1)','http://example.org','https://user:password@example.org','bad'])assert.throws(()=>api.validateCorpus([{...docs[0],url}]));
assert.throws(()=>api.metrics([{query:'x',relevant_ids:['MISSING']}],docs));
assert.throws(()=>api.metrics([{query:'x'}],docs));
assert.equal(api.metrics([],docs).abstention_recall,null);
const citations=[{doc_id:docs[0].id,url:docs[0].url,quote:docs[0].text},
 {doc_id:'FAKE',url:docs[0].url,quote:docs[0].text},
 {doc_id:docs[0].id,url:'https://example.org',quote:docs[0].text},
 {doc_id:docs[0].id,url:docs[0].url,quote:'Trích dẫn bịa'},
 {doc_id:docs[0].id,url:docs[0].url,quote:''}];
assert.deepEqual(api.checkCitations(docs,citations).map(x=>x.valid),[true,false,false,false,false]);
// Hand-computed multi-relevant metrics: top-1 finds exactly one of two gold IDs.
const fixture=[{...docs[0],id:'A',title:'alpha beta',text:'alpha beta'},{...docs[1],id:'B',title:'alpha gamma',text:'alpha gamma'}];
const multi=api.metrics([{query:'alpha beta',relevant_ids:['A','B']}],fixture,{k:1});
assert.equal(multi.hit_at_k,1);assert.equal(multi.recall_at_k,0.5);assert.equal(multi.precision_at_k,1);assert.equal(multi.ndcg_at_k,1);assert.equal(multi.complete_evidence_rate,0);
assert.ok(m.hit_rate_ci95[0]<1&&m.hit_rate_ci95[1]<=1);
for(const method of ['lexical','bm25'])assert.equal(api.search([...distractors,...docs],'ET0 ETc Kc',1,method)[0].doc.id,'FAO56-ET0-01');
console.log('PASS V3.8 regression, schema, citation integrity and metric arithmetic',JSON.stringify({total:m.total,false_acceptances:m.false_acceptances,false_refusals:m.false_refusals}));

// Previously failing challenge cases are now development regressions.
for(const query of ['Giữ kín thông tin đăng nhập trên kho mã bằng cách nào?','giu kin thong tin dang nhap','GIỮ KÍN THÔNG TIN ĐĂNG NHẬP']){
 const r=api.answer(docs,query);assert.equal(r.status,'evidence_found');assert.ok(r.results.some(x=>x.doc.id==='GITHUB-SEC-01'));
}
for(const query of ['ET0 ETc hệ số Kc cho giống rau AL2','ET0 ETc hệ số Kc cho giống XYZ99','ET0 ETc hệ số Kc cho giống cải xanh','ET0 ETc mã ZZ42']){
 const r=api.answer(docs,query);assert.equal(r.status,'insufficient_evidence');assert.equal(r.results.length,0);assert.equal(r.reason,'unsupported_entity');
}
assert.equal(api.answer(docs,'ET0 ETc hệ số Kc').status,'evidence_found');
console.log('PASS paraphrase aliases and unsupported cultivar/entity regressions');
