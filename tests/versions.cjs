'use strict';const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');const root=path.resolve(__dirname,'..');const read=f=>fs.readFileSync(path.join(root,f),'utf8');for(const version of ['v32','v33','v34','v35','v36'])assert.ok(read('versions/index.html').includes(version+'.html'));for(const f of ['rag.js','image-lab.js','media.js']){const s=read('versions/'+f);new Function(s);assert.ok(!s.includes('innerHTML'));}assert.ok(read('versions/v34.html').includes('Chưa kết nối'));assert.ok(read('versions/v35.html').includes('cần API'));assert.ok(read('index.html').includes('versions/index.html'));assert.ok(read('versions/v32-example.py').includes('train_test_split'));console.log('PASS V3.2–V3.6 static structure, JS syntax and honesty markers');
const vm=require('node:vm');function mock(){const map={},ids=['imgPrompt','imgRatio','imgRequest','imgStatus','imgMake','mediaType','mediaIdea','mediaDetails','mediaOutput','mediaStatus','mediaBuild','mediaSave','mediaClear'];for(const id of ids)map[id]={value:'',textContent:'',listeners:{},addEventListener(e,fn){this.listeners[e]=fn;}};map.imgRatio.value='1:1';map.mediaType.value='video';const saved=new Map();return{map,ctx:vm.createContext({document:{getElementById:id=>map[id]},localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v),removeItem:k=>saved.delete(k)}}),saved};}
{const m=mock();vm.runInContext(read('versions/image-lab.js'),m.ctx);m.map.imgPrompt.value='Một cánh đồng lúa xanh';m.map.imgMake.listeners.click();assert.ok(m.map.imgRequest.value.includes('draft_only'));m.map.imgPrompt.listeners.input();assert.equal(m.map.imgRequest.value,'');}
{const m=mock();vm.runInContext(read('versions/media.js'),m.ctx);m.map.mediaIdea.value='Kịch bản cảnh mở đầu';m.map.mediaBuild.listeners.click();assert.ok(m.map.mediaOutput.value.includes('Kịch bản'));m.map.mediaIdea.listeners.input();assert.equal(m.map.mediaOutput.value,'');m.map.mediaSave.listeners.click();assert.ok(m.saved.has('hd-v35'));m.map.mediaClear.listeners.click();assert.ok(!m.saved.has('hd-v35'));}

// Homepage routes must point to existing local pages.
const homepage=read('index.html');
for(const route of ['#courses','./knowledge/index.html','./curriculum/index.html','./math/index.html','./versions/v32.html','./versions/v33.html','./versions/v34.html','./versions/v35.html','./versions/v36.html']){
 assert.ok(homepage.includes('href="'+route+'"'),'Missing homepage route: '+route);
 if(route.startsWith('./'))assert.ok(require('node:fs').existsSync(require('node:path').join(root,route)),'Target missing: '+route);
}
assert.ok(homepage.includes('id="learning-path"'),'Missing unified learning section');

// V3.6 static lesson publishing: every public lesson has an HTML route and a sitemap entry.
const sitemap=read('sitemap.xml');
const lessonFiles=[
'01-beginner/01-github','01-beginner/02-security','02-web/01-html','02-web/02-javascript',
'03-ai-media/01-image','03-ai-media/02-music','03-ai-media/03-video',
'04-backend/01-api','04-backend/02-deploy','05-advanced/01-models',
'05-advanced/02-systems','06-research/01-reproducibility'];
for(const lesson of lessonFiles){
 const html=read('study/'+lesson+'.html');
 assert.ok(html.includes('<h1>'),'Missing lesson heading: '+lesson);
 assert.ok(html.includes('rel="canonical"'),'Missing canonical: '+lesson);
 assert.ok(html.includes('Nguồn để đối chiếu'),'Missing source section: '+lesson);
 assert.ok(sitemap.includes('/study/'+lesson+'.html'),'Missing sitemap entry: '+lesson);
}
assert.ok(read('study/index.html').includes('12 bài học'));
console.log('PASS V3.6: 12 HTML lesson pages and sitemap entries');
