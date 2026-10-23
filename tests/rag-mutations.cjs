'use strict';
// A surviving intentional defect fails CI. Original files are never modified.
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),{spawnSync}=require('node:child_process'),assert=require('node:assert/strict');
const src=fs.readFileSync(path.join(__dirname,'../versions/rag-core.js'),'utf8');
const mutations=[
 ['uppercase_d',".replace(/đ/g,'d')",'.replace(/đ/g,\'BROKEN\')'],
 ['always_refuse',"status:qualified.length?'evidence_found':'insufficient_evidence'","status:'insufficient_evidence'"],
 ['always_accept',"status:qualified.length?'evidence_found':'insufficient_evidence'","status:'evidence_found'"],
 ['ignored_aliases','canonical(s).match','normalize(s).match'],
 ['ignored_entities','entitySupported(x)&&',''],
 ['forged_quotes',"d.text.includes(c.quote)",'true']
];
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rag-mutation-'));
try{for(const [name,from,to] of mutations){
 assert.ok(src.includes(from),'Mutation target missing: '+name);
 const file=path.join(dir,name+'.cjs');fs.writeFileSync(file,src.replace(from,to));
 const r=spawnSync(process.execPath,[path.join(__dirname,'rag-evidence.cjs')],{env:{...process.env,RAG_CORE_PATH:file},encoding:'utf8'});
 assert.equal(r.error,undefined);assert.notEqual(r.status,0,'Surviving mutation: '+name);assert.ok(r.stderr.includes('AssertionError'),'Unexpected crash: '+name+' '+r.stderr);
 console.log('KILLED '+name);
}}finally{fs.rmSync(dir,{recursive:true,force:true});}
