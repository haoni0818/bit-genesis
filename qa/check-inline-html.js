'use strict';
const fs=require('node:fs');
const vm=require('node:vm');

const files=process.argv.slice(2);
if(!files.length){
  console.error('usage: node qa/check-inline-html.js <file.html> [...]');
  process.exit(2);
}

for(const file of files){
  const html=fs.readFileSync(file,'utf8');
  const scripts=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(match=>!/\bsrc\s*=/.test(match[1]))
    .map(match=>match[2]);
  if(!scripts.length)throw new Error(file+': no inline scripts found');
  scripts.forEach((source,index)=>new vm.Script(source,{filename:file+'#inline-'+(index+1)}));
  console.info('[INLINE SCRIPT CHECK]',file,scripts.length+' script(s) PASS');
}
