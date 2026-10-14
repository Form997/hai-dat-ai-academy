'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const file=fs.readFileSync(path.join(root,'.github/agents/hai-dat-academic-reviewer.agent.md'),'utf8');
assert.match(file,/^---\nname: HaiDat Academic Reviewer\ndescription:/);
assert.match(file,/math\/.*curriculum\//);
assert.match(file,/Không tự merge/);
assert.match(file,/không sao chép dài nội dung có bản quyền/);
console.log('PASS custom academic reviewer agent configuration');
