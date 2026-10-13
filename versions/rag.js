'use strict';
const sourceDocs=[
{title:'GitHub — bảo mật secret',url:'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure',text:'Mật khẩu và token truy cập cần được bảo vệ; tránh đưa vào kho mã nguồn công khai.'},
{title:'OWASP API Security',url:'https://owasp.org/API-Security/',text:'Bảo mật API cần xác thực, phân quyền, giới hạn tài nguyên, kiểm tra đầu vào và giám sát.'},
{title:'scikit-learn — cross validation',url:'https://scikit-learn.org/stable/modules/cross_validation.html',text:'Đánh giá mô hình sử dụng các tập train và test độc lập để tránh ước lượng quá lạc quan.'}
];
const q=document.getElementById('ragQuery'),o=document.getElementById('ragResult');
document.getElementById('ragSearch').addEventListener('click',()=>{
 const term=q.value.trim().toLocaleLowerCase('vi');o.replaceChildren();
 if(term.length<3){o.textContent='Vui lòng nhập câu hỏi có ít nhất 3 ký tự.';return;}
 const words=term.split(/\s+/).filter(x=>x.length>2);
 const results=sourceDocs.map(d=>({...d,score:words.filter(w=>d.text.toLocaleLowerCase('vi').includes(w)||d.title.toLocaleLowerCase('vi').includes(w)).length})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
 if(!results.length){o.textContent='Chưa tìm thấy bằng chứng trong tập mẫu. Không tạo câu trả lời khi thiếu nguồn.';return;}
 for(const d of results){const p=document.createElement('p'),a=document.createElement('a');a.href=d.url;a.rel='noopener noreferrer';a.textContent=d.title;p.append(a,document.createTextNode(' — '+d.text));o.append(p);}
});