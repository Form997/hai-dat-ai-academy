'use strict';
// V3.8: truy xuất bằng chứng từ corpus nội bộ, KHÔNG gọi mô hình sinh và không duyệt web trực tiếp.
// Tách thư viện khỏi giao diện để chạy kiểm thử Node và trình duyệt.
(function(root,factory){
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 else root.AcademyRAG=api;
})(typeof globalThis==='object'?globalThis:this,function(){
 const stop=new Set(['nào','đâu','trong','được','không','những','cách','làm','sao','với','cho','của','là','có','và','cần','một','các','theo','tại','khi','thế','nào']);
 function normalize(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase()}
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
  // Ngưỡng cố ý bảo thủ: không suy ra kết luận chỉ vì một từ khóa trùng.
  const qualified=ranked.filter(x=>x.matched.length>=2&&x.coverage>=0.5);
  if(!qualified.length)return {status:'insufficient_evidence',message:'Chưa đủ bằng chứng trong bộ tài liệu mẫu. Không sinh câu trả lời.',results:ranked};
  return {status:'evidence_found',message:'Tìm thấy đoạn diễn giải phù hợp để người học đối chiếu nguồn gốc. Chưa xác minh trực tiếp trang nguồn tại thời điểm truy vấn.',results:qualified};
 }
 function metrics(cases,docs){
  let hit=0,answered=0,correctRefusal=0;
  const rows=cases.map(c=>{
   const result=answer(docs,c.query);
   const ids=result.results.map(x=>x.doc.id);
   const top=ids[0]||null;
   const retrieved=!!c.expected_id&&ids.includes(c.expected_id);
   const shouldRefuse=c.expected_id===null;
   if(retrieved)hit++;
   if(result.status==='evidence_found')answered++;
   if(shouldRefuse&&result.status==='insufficient_evidence')correctRefusal++;
   return {query:c.query,expected_id:c.expected_id,top_id:top,retrieved,refused:result.status==='insufficient_evidence'};
  });
  return {total:cases.length,recall_at_5:hit/cases.length,answer_rate:answered/cases.length,correct_refusals:correctRefusal,rows};
 }
 return {normalize,tokens,search,answer,metrics};
});
