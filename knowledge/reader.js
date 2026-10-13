'use strict';
const docs=["README.md","01-git-github.md","02-web-api-security.md","03-python-data.md","04-ml-fundamentals.md","05-neural-networks.md","06-transformers-llm.md","07-generative-media.md","08-ai-risk-operations.md","SOURCES.md"];
const names=["Giới thiệu kho kiến thức","01. Git & GitHub","02. Web, HTTP & API","03. Python và dữ liệu","04. Học máy và kiểm định","05. PyTorch","06. Transformer, LLM, RAG","07. AI ảnh, nhạc, video","08. Vận hành và rủi ro AI","Danh mục nguồn"];
const $=id=>document.getElementById(id);
function inline(parent,text){
 // Safe subset of Markdown: bold, inline code, and links. All other text is literal.
 const re=/\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
 let pos=0,m;
 while((m=re.exec(text))!==null){
  if(m.index>pos)parent.append(document.createTextNode(text.slice(pos,m.index)));
  let node;
  if(m[1]!==undefined){
   const link=m[2].trim();const safe=/^https:\/\//i.test(link)||(!/^[a-z][a-z\d+.-]*:/i.test(link)&&!link.startsWith('/')&&!link.startsWith('//')&&!link.includes('..'));
   if(safe){node=document.createElement('a');node.textContent=m[1];node.href=docs.includes(link.replace(/^\.\//,''))?'?doc='+encodeURIComponent(link.replace(/^\.\//,'')):link;node.rel='noopener noreferrer';}
   else node=document.createTextNode(m[0]);
  }else if(m[3]!==undefined){node=document.createElement('strong');node.textContent=m[3];}
  else{node=document.createElement('code');node.textContent=m[4];}
  parent.append(node);pos=re.lastIndex;
 }
 if(pos<text.length)parent.append(document.createTextNode(text.slice(pos)));
}
function render(md){
 const frag=document.createDocumentFragment();let paragraph=[],list=null,code=null;
 const flush=()=>{if(!paragraph.length)return;const p=document.createElement('p');inline(p,paragraph.join(' '));frag.append(p);paragraph=[];};
 for(const raw of md.replace(/\r\n/g,'\n').split('\n')){
  if(/^\s*```/.test(raw)){flush();list=null;if(code){frag.append(code.parent);code=null;}else{let parent=document.createElement('pre'),el=document.createElement('code');parent.append(el);code={parent,el};}continue;}
  if(code){code.el.textContent+=raw+'\n';continue;}
  if(!raw.trim()){flush();list=null;continue;}
  const heading=raw.match(/^(#{1,4})\s+(.*)$/);
  if(heading){flush();list=null;const h=document.createElement('h'+heading[1].length);inline(h,heading[2]);frag.append(h);continue;}
  const item=raw.match(/^\s*(-|\*|\d+\.)\s+(.+)$/);
  if(item){flush();const tag=/^\d/.test(item[1])?'ol':'ul';if(!list||list.tagName.toLowerCase()!==tag){list=document.createElement(tag);frag.append(list);}const li=document.createElement('li');inline(li,item[2]);list.append(li);continue;}
  flush();list=null;
  if(/^>\s?/.test(raw)){const q=document.createElement('blockquote');inline(q,raw.replace(/^>\s?/,''));frag.append(q);}else paragraph.push(raw.trim());
 }
 flush();if(code)frag.append(code.parent);return frag;
}
async function load(filename){
 if(!docs.includes(filename))filename='README.md';
 const qs=new URL(location.href);qs.searchParams.set('doc',filename);history.replaceState(null,'',qs);
 $('navlist').querySelectorAll('a').forEach(a=>a.setAttribute('aria-current',a.dataset.doc===filename?'page':'false'));
 $('article').replaceChildren();$('status').textContent='Đang tải tài liệu...';
 try{const response=await fetch('./'+filename,{cache:'no-cache'});if(!response.ok)throw Error('HTTP '+response.status);const data=await response.text();$('article').append(render(data));$('status').textContent='Đang đọc: '+names[docs.indexOf(filename)];}
 catch(e){$('status').textContent='Không tải được bài học: '+e.message;}
}
for(let i=0;i<docs.length;i++){let a=document.createElement('a');a.href='?doc='+encodeURIComponent(docs[i]);a.dataset.doc=docs[i];a.textContent=names[i];a.addEventListener('click',e=>{e.preventDefault();load(docs[i]);});$('navlist').append(a);}
load(new URLSearchParams(location.search).get('doc')||'README.md');
