'use strict';
// V3.8: truy xuất bằng chứng từ corpus nội bộ, KHÔNG gọi mô hình sinh và không duyệt web trực tiếp.
// Tách thư viện khỏi giao diện để chạy kiểm thử Node và trình duyệt.
(function(root,factory){
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 else root.AcademyRAG=api;
})(typeof globalThis==='object'?globalThis:this,function(){
 const stop=new Set(['nào','đâu','trong','được','không','những','cách','làm','sao','với','cho','của','là','có','và','cần','một','các','theo','tại','khi','thế','nào'].map(normalize));
 function normalize(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase()}
 function tokens(s){return [...new Set((normalize(s).match(/[a-z0-9]+/g)||[]).filter(w=>w.length>=2&&!stop.has(w)))]}
 function search(docs,query,limit=5){
  const words=tokens(query);
  if(!words.length)return [];
  return docs.map(d=>{
   const title=tokens(d.title),body=tokens(d.text);
   const overlap=words.filter(w=>title.includes(w)||body.includes(w));
   const score=overlap.reduce((n,w)=>n+(title.includes(w)?3:0)+(body.includes(w)?1:0),0);
   return {doc:d,score,matched:overlap,coverage:overlap.length/words.length};
  }).filter(x=>x.score>0).sort((a,b)=>b.coverage-a.coverage||b.score-a.score||a.doc.id.localeCompare(b.doc.id)).slice(0,limit);
 }
 function answer(docs,query){
  const ranked=search(docs,query);
  // Lexical relevance is not proof that a requested fact is supported.
  // This small corpus has no quantitative, live or local observations.
  const q=normalize(query);
  const unsupportedDetail=/\b(bao nhieu|may|gia|hom nay|sang nay|hien tai|tuan toi|thanh hoa|tai ruong)\b/.test(q);
  const qualified=unsupportedDetail?[]:ranked.filter(x=>x.matched.length>=2&&x.coverage>=0.5);
  if(!qualified.length)return {status:'insufficient_evidence',message:'Chưa đủ bằng chứng trong bộ tài liệu mẫu. Không sinh câu trả lời.',results:[],candidates:ranked};
  return {status:'evidence_found',message:'Tìm thấy đoạn liên quan để đối chiếu. Độ phủ từ khóa không xác nhận tính đúng hay đầy đủ của câu trả lời; chưa xác minh trực tiếp nguồn gốc.',results:qualified,candidates:ranked};
 }
 function metrics(cases,docs){
  let hits=0,answerable=0,answered=0,correctRefusal=0,falseAcceptance=0,falseRefusal=0,reciprocalRank=0;
  const rows=cases.map(c=>{
   const ranked=search(docs,c.query),result=answer(docs,c.query);
   const ids=ranked.map(x=>x.doc.id),positive=!!c.expected_id;
   const rank=positive?ids.indexOf(c.expected_id)+1:0;
   const refused=result.status==='insufficient_evidence';
   if(positive){answerable++;if(rank){hits++;reciprocalRank+=1/rank;}if(refused)falseRefusal++;}
   else if(refused)correctRefusal++;else falseAcceptance++;
   if(!refused)answered++;
   return {query:c.query,expected_id:c.expected_id,top_id:ids[0]||null,retrieved:rank>0,refused};
  });
  const unanswerable=cases.length-answerable;
  const ratio=(n,d)=>d?n/d:null;
  return {total:cases.length,answerable,unanswerable,hit_at_5:ratio(hits,answerable),mrr_at_5:ratio(reciprocalRank,answerable),answer_rate:ratio(answered,cases.length),correct_refusals:correctRefusal,false_acceptances:falseAcceptance,false_refusals:falseRefusal,abstention_precision:ratio(correctRefusal,correctRefusal+falseRefusal),abstention_recall:ratio(correctRefusal,unanswerable),rows};
 }
 return {normalize,tokens,search,answer,metrics};
});

