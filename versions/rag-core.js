'use strict';
// Offline educational retrieval. No live source verification or semantic entailment.
(function(root,factory){
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 else root.AcademyRAG=api;
})(typeof globalThis==='object'?globalThis:this,function(){
 function normalize(s){return String(s??'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');}
 const stop=new Set(['nào','đâu','trong','được','những','cách','làm','sao','với','cho','của','là','có','và','cần','một','các','theo','tại','khi','thế'].map(normalize));
 // Preserve negation: lexical retrieval cannot establish whether a claim is true.
 function terms(s){return (normalize(s).match(/[a-z0-9]+/g)||[]).filter(w=>w.length>=2&&!stop.has(w));}
 function tokens(s){return [...new Set(terms(s))];}
 function safeURL(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}}
 function validateCorpus(docs){
  if(!Array.isArray(docs))throw TypeError('Corpus phải là danh sách');
  const ids=new Set();
  for(const d of docs){
   if(!d||typeof d!=='object')throw TypeError('Tài liệu không hợp lệ');
   for(const key of ['id','title','text','source_type','verified_scope'])if(typeof d[key]!=='string'||!d[key].trim())throw TypeError('Thiếu trường '+key);
   if(ids.has(d.id))throw TypeError('ID trùng: '+d.id);ids.add(d.id);
   if(!safeURL(d.url))throw TypeError('URL nguồn không an toàn: '+d.id);
   if(d.capabilities!==undefined&&(!Array.isArray(d.capabilities)||d.capabilities.some(x=>!['concept','quantitative','current','local'].includes(x))))throw TypeError('Năng lực nguồn không hợp lệ');
  }
  return docs;
 }
 function search(docs,query,limit=5,method='lexical'){
  validateCorpus(docs);
  if(!Number.isInteger(limit)||limit<1||limit>100)throw RangeError('k phải từ 1 đến 100');
  if(!['lexical','bm25'].includes(method))throw TypeError('Phương pháp truy hồi không hợp lệ');
  const words=tokens(query);if(!words.length)return [];
  const bodies=docs.map(d=>terms(d.title+' '+d.text));
  const avg=bodies.reduce((n,b)=>n+b.length,0)/(docs.length||1)||1;
  const df=new Map(words.map(w=>[w,bodies.filter(b=>b.includes(w)).length]));
  return docs.map((d,i)=>{
   const title=tokens(d.title),body=tokens(d.text),all=bodies[i];
   const overlap=words.filter(w=>title.includes(w)||body.includes(w));
   const score=method==='bm25'?overlap.reduce((n,w)=>{
    const tf=all.filter(t=>t===w).length,idf=Math.log(1+(docs.length-df.get(w)+0.5)/(df.get(w)+0.5));
    return n+idf*tf*2.2/(tf+1.2*(0.25+0.75*all.length/avg));
   },0):overlap.reduce((n,w)=>n+(title.includes(w)?3:0)+(body.includes(w)?1:0),0);
   return {doc:d,score,matched:overlap,coverage:overlap.length/words.length};
  }).filter(x=>x.score>0).sort((a,b)=>(method==='lexical'?b.coverage-a.coverage:0)||b.score-a.score||a.doc.id.localeCompare(b.doc.id)).slice(0,limit);
 }
 function requirements(query){
  const q=normalize(query),required=[];
  if(/\b(bao nhieu|may|gia|tri so|lieu luong|mm|kg)\b/.test(q))required.push('quantitative');
  if(/\b(hom nay|sang nay|hien tai|tuan toi|moi nhat)\b/.test(q))required.push('current');
  if(/\b(tai ruong|dia phuong|thanh hoa|hue|ca mau)\b/.test(q))required.push('local');
  return required;
 }
 function answer(docs,query,options={}){
  const k=options.k??5,method=options.method??'lexical',minCoverage=options.minCoverage??0.5;
  if(typeof minCoverage!=='number'||!Number.isFinite(minCoverage)||minCoverage<0||minCoverage>1)throw RangeError('Ngưỡng không hợp lệ');
  const ranked=search(docs,query,k,method),required=requirements(query);
  const qualified=ranked.filter(x=>x.matched.length>=2&&x.coverage>=minCoverage&&required.every(r=>(x.doc.capabilities||['concept']).includes(r)));
  const reason=!tokens(query).length?'empty_query':!ranked.length?'no_match':!qualified.length?(required.length?'unsupported_scope':'low_overlap'):'lexical_match_only';
  return {status:qualified.length?'evidence_found':'insufficient_evidence',reason,requirements:required,
   message:qualified.length?'Tìm thấy đoạn liên quan để đối chiếu; chưa xác nhận tính đúng hoặc đầy đủ của câu trả lời.':'Chưa đủ bằng chứng trong bộ tài liệu mẫu. Không sinh câu trả lời.',
   results:qualified,candidates:ranked};
 }
 // Checks exact quotations from the local authored corpus, NOT claim entailment
 // or authenticity of the remote document. Reject fabricated IDs/URLs/spans.
 function checkCitations(docs,citations){
  validateCorpus(docs);if(!Array.isArray(citations))throw TypeError('Trích dẫn phải là danh sách');
  return citations.map(c=>{
   const d=docs.find(d=>d.id===c?.doc_id);
   const valid=!!d&&c.url===d.url&&typeof c.quote==='string'&&c.quote.trim().length>0&&d.text.includes(c.quote);
   return {doc_id:c?.doc_id??null,valid,reason:valid?'local_quote_match':!d?'unknown_id':c.url!==d.url?'url_mismatch':'quote_mismatch'};
  });
 }
 const ratio=(n,d)=>d?n/d:null;
 function wilson(success,total){
  if(!total)return null;
  const z=1.959963984540054,p=success/total,den=1+z*z/total;
  const center=(p+z*z/(2*total))/den,half=z*Math.sqrt(p*(1-p)/total+z*z/(4*total*total))/den;
  return [Math.max(0,center-half),Math.min(1,center+half)];
 }
 function labels(c){
  const ids=c.relevant_ids??(c.expected_id?[c.expected_id]:[]);
  if(!Array.isArray(ids)||new Set(ids).size!==ids.length||ids.some(x=>typeof x!=='string'))throw TypeError('Nhãn nguồn không hợp lệ');
  return ids;
 }
 function metrics(cases,docs,options={}){
  validateCorpus(docs);if(!Array.isArray(cases))throw TypeError('Tập đánh giá không hợp lệ');
  const k=options.k??5;
  let hits=0,answerable=0,answered=0,correctRefusal=0,falseAcceptance=0,falseRefusal=0,rr=0,recall=0,precision=0,ndcg=0,complete=0;
  const rows=cases.map(c=>{
   if(typeof c.query!=='string'||(!Object.hasOwn(c,'expected_id')&&!Object.hasOwn(c,'relevant_ids')))throw TypeError('Thiếu câu hỏi hoặc nhãn');
   const gold=labels(c);if(gold.some(id=>!docs.some(d=>d.id===id)))throw TypeError('Nhãn tham chiếu nguồn không tồn tại');
   const ranked=search(docs,c.query,k,options.method??'lexical'),result=answer(docs,c.query,options),ids=ranked.map(x=>x.doc.id);
   const count=ids.filter(id=>gold.includes(id)).length,rank=ids.findIndex(id=>gold.includes(id))+1;
   const refused=result.status==='insufficient_evidence',positive=gold.length>0;
   if(positive){
    answerable++;if(rank){hits++;rr+=1/rank;}recall+=count/gold.length;precision+=count/k;
    const dcg=ids.reduce((n,id,i)=>n+(gold.includes(id)?1/Math.log2(i+2):0),0);
    const ideal=gold.slice(0,k).reduce((n,_,i)=>n+1/Math.log2(i+2),0);ndcg+=dcg/ideal;
    if(gold.every(id=>result.results.some(x=>x.doc.id===id)))complete++;
    if(refused)falseRefusal++;
   }else if(refused)correctRefusal++;else falseAcceptance++;
   if(!refused)answered++;
   return {id:c.id??null,category:c.category??'unspecified',query:c.query,relevant_ids:gold,top_ids:ids,retrieved:count>0,refused,reason:result.reason,all_evidence_accepted:positive&&gold.every(id=>result.results.some(x=>x.doc.id===id))};
  });
  const unanswerable=cases.length-answerable;
  return {total:cases.length,k,method:options.method??'lexical',answerable,unanswerable,hit_at_k:ratio(hits,answerable),recall_at_k:ratio(recall,answerable),precision_at_k:ratio(precision,answerable),mrr_at_k:ratio(rr,answerable),ndcg_at_k:ratio(ndcg,answerable),complete_evidence_rate:ratio(complete,answerable),answer_rate:ratio(answered,cases.length),correct_refusals:correctRefusal,false_acceptances:falseAcceptance,false_refusals:falseRefusal,abstention_precision:ratio(correctRefusal,correctRefusal+falseRefusal),abstention_recall:ratio(correctRefusal,unanswerable),hit_rate_ci95:wilson(hits,answerable),refusal_recall_ci95:wilson(correctRefusal,unanswerable),rows};
 }
 return {normalize,tokens,safeURL,validateCorpus,search,requirements,answer,checkCitations,metrics};
});
