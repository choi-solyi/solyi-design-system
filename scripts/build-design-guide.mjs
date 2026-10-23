import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
export const escapeGuide=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// This canonical guide uses headings, paragraphs, bullets, inline code and fenced text only.
// Escape every source character before adding the small, fixed Markdown vocabulary.
export function renderDesignGuide(markdown){
 const lines=markdown.split(/\r?\n/),out=[];let prose=[],list=false,fence=null,code=[];
 const inline=text=>escapeGuide(text).replace(/`([^`]+)`/g,'<code>$1</code>');
 const flush=()=>{if(prose.length){out.push('<p>'+inline(prose.join(' '))+'</p>');prose=[];}if(list){out.push('</ul>');list=false;}};
 for(const line of lines){
  if(line.startsWith('```')){flush();if(fence!==null){out.push('<pre tabindex="0" aria-label="시작 프롬프트"><code>'+escapeGuide(code.join('\n'))+'</code></pre>');fence=null;code=[];}else fence=line.slice(3);continue;}
  if(fence!==null){code.push(line);continue;}
  if(!line.trim()){flush();continue;}
  const heading=line.match(/^(#{1,3}) (.+)$/);
  if(heading){flush();const level=Math.min(heading[1].length+2,5);out.push(`<h${level}>${inline(heading[2])}</h${level}>`);continue;}
  if(line.startsWith('- ')){if(prose.length){out.push('<p>'+inline(prose.join(' '))+'</p>');prose=[];}if(!list){out.push('<ul>');list=true;}out.push('<li>'+inline(line.slice(2))+'</li>');continue;}
  prose.push(line);
 }
 if(fence!==null)throw Error('Unclosed DESIGN.md code fence');flush();return out.join('\n');
}
const text=(await readFile(new URL('DESIGN.md',root),'utf8')).replace(/\r\n/g,'\n');
const matches=[...text.matchAll(/## 짧은 시작 프롬프트\n\n```text\n([\s\S]*?)\n```/g)];
if(matches.length!==1)throw Error('DESIGN.md must provide one canonical start prompt');
const data={text,prompt:matches[0][1],html:renderDesignGuide(text),sha256:createHash('sha256').update(text).digest('hex')};
await writeFile(new URL('site/design-guide-data.js',root),'// Generated from root DESIGN.md; do not edit.\nexport const designGuide='+JSON.stringify(data,null,2)+';\n');
console.log('Generated AI guide view/prompt/copy data from DESIGN.md.');
