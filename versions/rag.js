'use strict';
const q=document.getElementById('ragQuery'),o=document.getElementById('ragResult');
let docs=[];
fetch('./rag-corpus.json').then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()}).then(data=>{docs=data;o.textContent='Đã tải '+docs.length+' nguồn minh họa. Nhập câu hỏi để tìm bằng chứng.'}).catch(()=>{o.textContent='Không tải được tập nguồn mẫu; thử tải lại trang.'});
document.getElementById('ragSearch').addEventListener('click',()=>{
 o.replaceChildren();
 if(q.value.trim().length<3){o.textContent='Vui lòng nhập câu hỏi có ít nhất 3 ký tự.';return;}
 if(!docs.length){o.textContent='Tập nguồn chưa tải xong.';return;}
 const result=AcademyRAG.answer(docs,q.value);
 const p=document.createElement('p');p.textContent=result.message;o.append(p);
 if(result.candidates.length&&!result.results.length){const note=document.createElement('p');note.textContent='Có tài liệu trùng từ khóa nhưng chưa đủ chứng cứ trả lời câu hỏi.';o.append(note);}
 for(const item of result.results){const d=item.doc,section=document.createElement('section'),a=document.createElement('a'),meta=document.createElement('small'),detail=document.createElement('p');
 a.href=d.url;a.rel='noopener noreferrer';a.textContent=d.id+' — '+d.title;
 meta.textContent=' · độ phủ từ khóa '+Math.round(item.coverage*100)+'% · '+d.source_type;
 detail.textContent=d.text+' ('+d.verified_scope+')';
 section.append(a,meta,detail);o.append(section);
 }
});

