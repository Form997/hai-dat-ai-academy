'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),api=require('../versions/rag-core.js');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const corpus=JSON.parse(read('versions/rag-corpus.json')),bench=JSON.parse(read('versions/rag-benchmark.json'));
const docs=[...corpus,...bench.distractors],development=JSON.parse(read('versions/rag-eval.json')),files=['versions/rag-core.js','versions/rag-corpus.json','versions/rag-benchmark.json','versions/rag-eval.json'];
const report={schema_version:1,node:process.version,corpus_size:docs.length,case_count:bench.cases.length,limitations:bench.purpose,fingerprints:Object.fromEntries(files.map(p=>[p,crypto.createHash('sha256').update(read(p)).digest('hex')])),runs:[]};
for(const method of ['lexical','bm25'])for(const k of [1,3,5]){
 const summary=api.metrics(bench.cases,docs,{method,k});
 const categories=Object.fromEntries([...new Set(bench.cases.map(c=>c.category))].map(category=>{
  const {rows,...m}=api.metrics(bench.cases.filter(c=>c.category===category),docs,{method,k});return [category,m];
 }));
 report.runs.push({...summary,categories});
}
report.development_threshold_sweep=[0.3,0.5,0.7,0.9].map(minCoverage=>{const {rows,...m}=api.metrics(development,corpus,{minCoverage});return {minCoverage,...m};});
console.log(JSON.stringify(report,null,2));
