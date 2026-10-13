'use strict';
const lessons=[
[1,'GitHub căn bản','01-beginner/01-github.md','Kho lưu trữ, commit, pull request'],
[1,'An toàn cho người mới','01-beginner/02-security.md','Mật khẩu, API key và dữ liệu công khai'],
[2,'HTML và CSS','02-web/01-html.md','Trang web, giao diện responsive'],
[2,'JavaScript & Pages','02-web/02-javascript.md','DOM, sự kiện và xuất bản'],
[3,'Prompt tạo ảnh','03-ai-media/01-image.md','Góc máy, ánh sáng, tỷ lệ'],
[3,'Prompt tạo nhạc','03-ai-media/02-music.md','Nhạc cụ, nhịp và quyền sử dụng'],
[3,'Prompt tạo video','03-ai-media/03-video.md','Storyboard và nối cảnh'],
[4,'API căn bản','04-backend/01-api.md','Request, response, token'],
[4,'Triển khai backend','04-backend/02-deploy.md','Secrets và máy chủ'],
[5,'Cơ sở mô hình AI','05-advanced/01-models.md','Transformer, diffusion'],
[5,'Kiến trúc hệ thống','05-advanced/02-systems.md','Queue, logging và quota'],
[6,'Nghiên cứu tái lập','06-research/01-reproducibility.md','Phương pháp và benchmark']
];
const questions=[
['GitHub','Commit dùng để làm gì?',['Lưu một lần thay đổi mã nguồn','Tạo mật khẩu','Mua tên miền'],0,'Commit là bản ghi lịch sử thay đổi.'],
['Bảo mật','API key nên được đặt ở đâu?',['Trong index.html công khai','Ở backend/secret manager','Trong prompt'],1,'Không bao giờ nhúng khóa bí mật vào frontend công khai.'],
['Web','GitHub Pages chạy được gì trực tiếp?',['Website tĩnh HTML/CSS/JS','Máy chủ Node.js luôn bật','Máy chủ GPU'],0,'Pages phục vụ website tĩnh, không chạy backend thông thường.'],
['Prompt','Prompt tạo video nên mô tả gì?',['Chỉ tên video','Khung cảnh, chuyển động, góc máy','Chỉ số tài khoản'],1,'Storyboard và góc quay giúp mô tả đầu ra.'],
['API','Mã HTTP 429 thường là gì?',['Không tìm thấy','Quá nhiều yêu cầu','Thành công'],1,'429 báo giới hạn tốc độ.'],
['Nghiên cứu','Để tái lập thử nghiệm cần ghi gì?',['Phiên bản, dữ liệu, thiết lập và phép đo','Chỉ lời khen','Chỉ ảnh kết quả'],0,'Thiết lập và điều kiện đo phải rõ ràng.']
];
const $=id=>document.getElementById(id);
const readStore=(key,fallback)=>{try{const v=JSON.parse(localStorage.getItem(key));return v??fallback;}catch{return fallback;}};
const writeStore=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{return false;}};
let done=new Set(readStore('haiDatV2Progress',[]));
function drawCourses(){
 const q=$('search').value.toLocaleLowerCase('vi').trim(),lv=$('level').value;
 const items=lessons.map((it,i)=>({it,i})).filter(({it})=>(lv==='all'||String(it[0])===lv)&&(!q||it.slice(1).join(' ').toLocaleLowerCase('vi').includes(q)));
 $('courseList').replaceChildren();
 for(const {it,i} of items){
  const article=document.createElement('article');article.className='card';
  const chip=document.createElement('span');chip.className='chip';chip.textContent='Cấp '+it[0];
  const h=document.createElement('h3');h.textContent=it[1];
  const p=document.createElement('p');p.className='muted';p.textContent=it[3];
  const actions=document.createElement('div');actions.className='course-actions';
  const a=document.createElement('a');a.href='#reader';a.textContent='Đọc bài →';a.addEventListener('click',()=>openLesson(it));
  const label=document.createElement('label');const ck=document.createElement('input');ck.type='checkbox';ck.checked=done.has(it[2]);ck.setAttribute('aria-label','Hoàn thành '+it[1]);
  ck.addEventListener('change',()=>{ck.checked?done.add(it[2]):done.delete(it[2]);writeStore('haiDatV2Progress',[...done]);updateProgress();});
  label.append(ck,document.createTextNode(' Đã học'));actions.append(a,label);article.append(chip,h,p,actions);$('courseList').append(article);
 }
 $('courseStatus').textContent=items.length?'Đang hiển thị '+items.length+' bài học.':'Không tìm thấy bài học phù hợp.';
}
function updateProgress(){const n=lessons.filter(x=>done.has(x[2])).length;$('progressText').textContent=n+'/'+lessons.length+' hoàn thành';$('progressFill').style.width=(n/lessons.length*100)+'%';$('progressBar').setAttribute('aria-valuenow',String(n));}
async function openLesson(it){
 $('readerTitle').textContent=it[1];$('readerContent').textContent='Đang tải bài học...';$('readerStatus').textContent='';
 try{const response=await fetch('./lessons/'+it[2],{cache:'no-cache'});if(!response.ok)throw Error('HTTP '+response.status);const t=await response.text();$('readerContent').textContent=t;$('readerStatus').textContent='Đã tải tài liệu Markdown. Xem liên kết nguồn trong nội dung bài.';}
 catch(e){$('readerContent').textContent='Chưa tải được bài học. Hãy mở từ kho GitHub hoặc thử lại khi có mạng.';$('readerStatus').textContent=String(e.message);}
}
$('search').addEventListener('input',drawCourses);$('level').addEventListener('change',drawCourses);
let dark=readStore('haiDatV2Dark',false);function setTheme(){document.body.classList.toggle('dark',dark);$('theme').textContent=dark?'☀️ Sáng':'🌙 Tối';}$('theme').addEventListener('click',()=>{dark=!dark;writeStore('haiDatV2Dark',dark);setTheme();});setTheme();drawCourses();updateProgress();
const ps=s=>$('promptStatus').textContent=s;
$('compose').addEventListener('click',()=>{
 const subject=$('subject').value.trim();if(!subject)return ps('Hãy nhập chủ đề trước.');
 const mode={image:'Ảnh',music:'Nhạc',video:'Video'}[$('mode').value];
 $('output').value=['Loại nội dung: '+mode,'Chủ đề: '+subject,$('style').value.trim()?'Phong cách: '+$('style').value.trim():'',$('constraints').value.trim()?'Yêu cầu: '+$('constraints').value.trim():'','Ưu tiên tính chính xác và quyền sử dụng hợp pháp.'].filter(Boolean).join('\n');ps('Đã ghép prompt (chưa gọi AI).');
});
$('savePrompt').addEventListener('click',()=>{const p={};for(const id of ['mode','subject','style','constraints','output'])p[id]=$(id).value;ps(writeStore('haiDatV2Prompt',p)?'Đã lưu cục bộ.':'Không lưu được trong trình duyệt này.');});
$('clearPrompt').addEventListener('click',()=>{for(const id of ['subject','style','constraints','output'])$(id).value='';try{localStorage.removeItem('haiDatV2Prompt');}catch{}ps('Đã xóa nội dung và bản lưu cục bộ.');});
$('copyPrompt').addEventListener('click',async()=>{if(!$('output').value)return ps('Chưa có prompt.');try{await navigator.clipboard.writeText($('output').value);ps('Đã sao chép.');}catch{$('output').select();ps('Hãy sao chép đoạn văn bản đã chọn.');}});
$('exportPrompt').addEventListener('click',()=>{if(!$('output').value)return ps('Chưa có prompt.');const blob=new Blob([$('output').value],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='hai-dat-ai-prompt.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);ps('Đã chuẩn bị tệp TXT.');});
const saved=readStore('haiDatV2Prompt',{});for(const id of ['mode','subject','style','constraints','output'])if(typeof saved[id]==='string')$(id).value=saved[id];
const starter='<h1>Xin chào Hai Đất!</h1>\n<p>Tui đang học HTML và CSS.</p>\n<style>body{font-family:system-ui;padding:20px;color:seagreen}</style>';
$('code').value=starter;function runCode(){$('preview').srcdoc=$('code').value;$('codeStatus').textContent='Đã cập nhật bản xem trước (sandbox).';}
$('runCode').addEventListener('click',runCode);$('resetCode').addEventListener('click',()=>{$('code').value=starter;runCode();});runCode();
let current=0,score=0,answered=false;
function drawQuiz(){const [topic,q,opts]=questions[current];$('quizNumber').textContent='Câu '+(current+1)+'/'+questions.length;$('quizTopic').textContent=topic;$('quizQuestion').textContent=q;$('quizOptions').replaceChildren();opts.forEach((op,i)=>{const label=document.createElement('label'),input=document.createElement('input');input.type='radio';input.name='quizAnswer';input.value=String(i);label.append(input,document.createTextNode(op));$('quizOptions').append(label);});$('quizFeedback').textContent='';answered=false;}
$('checkAnswer').addEventListener('click',()=>{if(answered)return;const chosen=document.querySelector('input[name=quizAnswer]:checked');if(!chosen)return $('quizFeedback').textContent='Hãy chọn một đáp án.';const ok=Number(chosen.value)===questions[current][3];if(ok)score++;answered=true;$('quizFeedback').textContent=(ok?'Chính xác! ':'Chưa đúng. ')+questions[current][4]+' Điểm: '+score+'/'+(current+1);});
$('nextQuestion').addEventListener('click',()=>{if(!answered)return $('quizFeedback').textContent='Hãy kiểm tra đáp án trước.';if(current===questions.length-1){$('quizFeedback').textContent='Hoàn tất: '+score+'/'+questions.length+'. Bấm Làm lại để thử tiếp.';return;}current++;drawQuiz();});
$('restartQuiz').addEventListener('click',()=>{current=0;score=0;drawQuiz();});drawQuiz();
