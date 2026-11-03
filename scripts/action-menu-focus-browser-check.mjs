// Real source component + native manual popover. --baseline loads the deployed baseline.
import assert from 'node:assert/strict'
import {createServer} from 'node:http'
import {readFile,mkdir,writeFile} from 'node:fs/promises'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {componentReferences} from '../site/component-api-data.js'
import {chromium} from '../.tooling/browser-qa/node_modules/playwright-core/index.mjs'
const root=new URL('../',import.meta.url),target=process.argv.find(arg=>arg.startsWith('--consumer='))?.slice(11),consumer=new URL(target||'examples/package-consumer/',root)
if(target)assert.ok(consumer.href.startsWith(new URL('qa-output/',root).href),'Installed fixtures stay in qa-output')
for(const [name,id] of [['SContextMenu','scontext-menu'],['SSplitBtn','ssplit-btn']]){const reference=componentReferences.find(item=>item.id===id);assert.equal(reference?.name,name);assert.equal(reference.source,'packages/vue-ui/src/actions.ts')}
const recipe=await readFile(new URL('examples/vue-vuetify/src/recipes/action-menu.vue',root),'utf8')
for(const name of ['SContextMenu','SSplitBtn'])assert.ok(recipe.includes('<'+name),'The reported starter route owns the actual '+name)
assert.ok((await readFile(new URL('examples/vue-vuetify/src/AdvancedExamples.vue',root),'utf8')).includes('<SContextMenu'),'Components inline preview owns SContextMenu')
const placementCase=process.argv.find(x=>x.startsWith('--case='))?.slice(7);
const baseline=process.argv.includes('--baseline'),placement=process.argv.includes('--placement'),baselineRef=process.argv.find(arg=>arg.startsWith('--baseline-ref='))?.slice(15)||'d862f031c22ce0a64ee529f463956d140dfaf028',out=new URL('qa-output/action-menu-focus/',root),records=[]
await mkdir(out,{recursive:true})
if(target)assert.ok(!baseline,'Installed verification never aliases source or baseline')
const actions=fileURLToPath(new URL('packages/vue-ui/src/actions.ts',root)).replaceAll('\\','/')
const {build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer))
const built=await build({root:fileURLToPath(consumer),configFile:false,define:{'process.env.NODE_ENV':'"production"','process.env.VITE_LOGGER_ENABLED':'undefined'},logLevel:'error',resolve:{dedupe:['vue']},plugins:[{name:'focus-fixture',resolveId(id){if(id.endsWith('.action-focus-entry.js'))return '\0focus-fixture'},load(id){
 if(baseline&&id.replaceAll('\\','/')===actions)return execFileSync('git',['show',baselineRef+':packages/vue-ui/src/actions.ts'],{cwd:fileURLToPath(root),encoding:'utf8'})
 if(id==='\0focus-fixture')return `import{createApp,h,ref}from'vue';import{SSplitBtn,SContextMenu}from ${JSON.stringify(target?'solyi-ui':actions)};
 const open=ref(false);window.events=[];window.reject=false;
 const items=ref([{id:'copy',label:'Copy'},{id:'edit',label:'Edit'},{id:'disabled',label:'Disabled',disabled:true}]);window.setActionItemCount=count=>items.value=Array.from({length:count},(_,i)=>({id:'item-'+i,label:'Action '+(i+1)}));
 createApp({setup(){return()=>h('div',[h(SSplitBtn,{id:'split',label:'Export',items:items.value,onClose:r=>events.push(r),onSelect:()=>events.push('selected')}),h(SContextMenu,{id:'context',label:'Record',items:items.value,open:open.value,'onUpdate:open':v=>{if(!window.reject)open.value=v},onClose:r=>events.push(r),onSelect:()=>events.push('selected')},()=>h('p','Record context target'))])}}).mount('#app');`
 }}],build:{write:false,minify:false,lib:{entry:fileURLToPath(new URL('.action-focus-entry.js',consumer)),formats:['es']}}})
const output=(Array.isArray(built)?built[0]:built).output;const code=output.find(x=>x.type==='chunk'&&x.isEntry).code
const cssFiles=target?['node_modules/solyi-ui/dist/core/tokens.css','node_modules/solyi-ui/dist/core/components.css','node_modules/solyi-ui/dist/styles.css']:['docs/tokens.css','docs/components.css','packages/vue-ui/src/styles.css']
const css=(await Promise.all(cssFiles.map(p=>baseline&&!target&&p==='packages/vue-ui/src/styles.css'?Promise.resolve(execFileSync('git',['show',baselineRef+':'+p],{cwd:fileURLToPath(root),encoding:'utf8'})):readFile(new URL(p,target?consumer:root),'utf8')))).join('\n')
const server=createServer((req,res)=>{
 if(req.url==='/fixture.js'){res.setHeader('Content-Type','text/javascript');res.end(code);return}
 const chunk=output.find(x=>'/'+x.fileName===req.url);if(chunk){res.setHeader('Content-Type',chunk.type==='chunk'?'text/javascript':'text/css');res.end(chunk.type==='chunk'?chunk.code:chunk.source);return}
 if(req.url==='/style.css'){res.setHeader('Content-Type','text/css');res.end(css);return}
 const main=req.url!=='/body';res.setHeader('Content-Type','text/html;charset=utf-8');res.end(`<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/style.css"><style>body{margin:0;padding:16px}#blank{height:180px;margin-top:200px;background:#eee}.sol-ui-context{margin-top:20px}</style>${main?'<main id="main-content" tabindex="-1">':''}<div id="app"></div><div id="blank">Outside blank</div><input id="outside-input" aria-label="Other input"><a id="outside-link" href="#destination">Other link</a><button id="outside-button">Other button</button><span id="outside-custom" onclick="document.getElementById('outside-input').focus()">Custom focus</span><div id="outside-negative" tabindex="-1">Pointer focus destination</div>${main?'</main>':''}<script>window.trace=[];for(const type of ['pointerdown','pointerup','pointercancel','mousedown','mouseup','click','focusin','focusout'])for(const capture of [true,false])document.addEventListener(type,e=>trace.push({type,phase:capture?'capture':'bubble',target:e.target.id||e.target.tagName,active:document.activeElement.id||document.activeElement.tagName,menuOpen:!!document.querySelector('[role=menu]')}),capture);</script><script type="module" src="/fixture.js"></script>`)
})
await new Promise(done=>server.listen(0,'127.0.0.1',done))
let browser
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true})
 if(placement){
  for(const [width,height] of (baseline?[[704,797]]:[[704,797],[475,750],[320,640]])){
   const context=await browser.newContext({viewport:{width,height},hasTouch:true,isMobile:true}),page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(10000);
   for(const kind of (baseline?['context']:['split','context']))for(const where of (baseline?['physical']:['top','middle','bottom',...(width===704&&kind==='context'?['physical','grow','resize-content']:[])]).filter(x=>!placementCase||x===placementCase)){
    await page.goto('http://127.0.0.1:'+server.address().port+'/body');const toggle=page.locator('#'+kind+(kind==='split'?' .sol-ui-split-toggle':' .sol-ui-context-trigger')),menu=page.locator('#'+kind+'-menu');await toggle.waitFor();
    const y=where==='top'?12:where==='middle'?(height-44)/2:where==='physical'?636.7203:height-52;
    await page.evaluate(({kind,y})=>{const root=document.getElementById(kind),trigger=root.querySelector('.sol-ui-context-trigger,.sol-ui-split-toggle');root.style.cssText='position:fixed;left:40.7619px;top:0;margin:0';root.style.top=(y-(trigger.getBoundingClientRect().top-root.getBoundingClientRect().top))+'px';window.events=[]},{kind,y});
    const anchor=await toggle.boundingBox(),point={x:anchor.x+anchor.width/2,y:anchor.y+anchor.height/2};await page.touchscreen.tap(point.x,point.y);await menu.waitFor({state:'visible'});
    if(where==='grow')await page.evaluate(()=>window.setActionItemCount(30));
    if(where==='resize-content')await menu.locator('button').first().evaluate(el=>el.style.paddingBlock='48px');
    if(!baseline)try{await page.waitForFunction(({kind})=>{const trigger=document.querySelector('#'+kind+' .sol-ui-context-trigger,#'+kind+' .sol-ui-split-toggle'),menu=document.getElementById(kind+'-menu');if(!trigger||!menu)return false;const a=trigger.getBoundingClientRect(),b=menu.getBoundingClientRect();return (b.bottom<=a.top||b.top>=a.bottom)&&b.top>=7&&b.bottom<=innerHeight-7},{kind},{timeout:3000});}catch(error){console.log('PLACEMENT DEBUG',await menu.evaluate(el=>({rect:el.getBoundingClientRect().toJSON(),style:el.getAttribute('style'),box:getComputedStyle(el).boxSizing,padding:getComputedStyle(el).padding,scroll:el.scrollHeight,client:el.clientHeight,viewport:innerHeight})));await page.screenshot({path:fileURLToPath(new URL('placement-failure.png',out))});throw error}
    await page.evaluate(()=>new Promise(done=>requestAnimationFrame(()=>requestAnimationFrame(done))));
    const geometry=await menu.evaluate((el,point)=>{const a=document.elementFromPoint(point.x,point.y);return{menu:el.getBoundingClientRect().toJSON(),hit:a?.id,scrollHeight:el.scrollHeight,clientHeight:el.clientHeight}},point);
    if(baseline)assert.ok(geometry.hit?.includes('-item-'),'Baseline must cover the exact trigger point');
    else{assert.equal(await toggle.evaluate((el,point)=>el.contains(document.elementFromPoint(point.x,point.y)),point),true,'Trigger hit target must remain accessible');assert.ok(geometry.menu.x>=7&&geometry.menu.right<=width-7);if(where==='grow'){assert.ok(geometry.scrollHeight>geometry.clientHeight);await page.keyboard.press('End');assert.equal(await page.evaluate(()=>document.activeElement.id),kind+'-item-item-29');assert.ok(await menu.evaluate(el=>el.scrollTop)>0)}}
    if(where==='physical'||(width===320&&where==='bottom'))await page.screenshot({path:fileURLToPath(new URL('placement-open-'+(baseline?'baseline':target?'installed':'source')+'-'+width+'-'+kind+'.png',out))});
    const before=await page.evaluate(()=>events.filter(x=>x==='selected').length);await page.touchscreen.tap(point.x,point.y);await menu.waitFor({state:'detached'});const after=await page.evaluate(()=>events.filter(x=>x==='selected').length);assert.equal(after-before,baseline?1:0,'Same-coordinate re-tap must toggle, never select');assert.equal(await toggle.evaluate(el=>el===document.activeElement),true);
    records.push({width,height,kind,where,point,anchor,geometry,selectedDelta:after-before,heightIncreasedForPass:false});console.log(baseline?'REPRO overlap/copy':'PASS placement',width,height,kind,where);
   }
   assert.deepEqual(errors,[]);await page.screenshot({path:fileURLToPath(new URL('placement-'+(baseline?'baseline':target?'installed':'source')+'-'+width+'.png',out))});await context.close();
  }
  await writeFile(new URL('placement-'+(baseline?'baseline':target?'installed':'source')+'-results.json',out),JSON.stringify({baseline,baselineRef,target,physicalAndroid:false,heightIncreasedForPass:false,records},null,2)+'\n');
 }
 if(!placement)for(const width of [475,320])for(const surface of ['main','body']){
  const context=await browser.newContext({viewport:{width,height:900},hasTouch:true,isMobile:true}),page=await context.newPage(),errors=[]
  page.on('pageerror',e=>{errors.push(e.message);console.log('PAGEERROR',e.message)});await page.goto('http://127.0.0.1:'+server.address().port+'/'+surface)
  for(const kind of ['split','context']){
   const toggle=page.locator('#'+kind+(kind==='split'?' .sol-ui-split-toggle':' .sol-ui-context-trigger'))
   const menu=page.locator('#'+kind+'-menu')
   const open=async()=>{await toggle.tap();await menu.waitFor({state:'visible'});assert.equal(await page.evaluate(()=>document.activeElement.id),kind+'-item-copy')}
   await open();await page.locator('#blank').tap();await menu.waitFor({state:'detached'});await page.waitForTimeout(80)
   const blank=await page.evaluate(()=>({active:document.activeElement.id||document.activeElement.tagName,trace:window.trace}))
   if(baseline){assert.notEqual(await toggle.evaluate(el=>el===document.activeElement),true);records.push({width,surface,kind,blank});continue}
   assert.equal(await toggle.evaluate(el=>el===document.activeElement),true,'Blank touch returns to '+kind+' trigger')
   const down=blank.trace.findLast(event=>event.type==='pointerdown'&&event.target==='blank'&&event.phase==='bubble');assert.equal(down?.menuOpen,true,'Do not dismiss during pointerdown before native focus')
   for(const id of ['outside-input','outside-link','outside-button','outside-custom','outside-negative']){await open();await page.locator('#'+id).tap();await menu.waitFor({state:'detached'});await page.waitForTimeout(50);assert.equal(await page.evaluate(()=>document.activeElement.id),id==='outside-custom'?'outside-input':id)}
   await open();await page.keyboard.press('Escape');await menu.waitFor({state:'detached'});assert.equal(await toggle.evaluate(el=>el===document.activeElement),true)
   await open();await page.locator('#'+kind+'-item-copy').tap();await menu.waitFor({state:'detached'});assert.equal(await toggle.evaluate(el=>el===document.activeElement),true)
   await open();await toggle.tap();await menu.waitFor({state:'detached'});assert.equal(await toggle.evaluate(el=>el===document.activeElement),true)
   await open();await page.locator('#blank').click();await menu.waitFor({state:'detached'});await page.waitForTimeout(50);assert.equal(await toggle.evaluate(el=>el===document.activeElement),true)
   if(kind==='context'){await open();await page.evaluate(()=>window.reject=true);await page.locator('#blank').tap();await page.waitForTimeout(50);assert.equal(await menu.count(),1,'Controlled close rejection retains the menu');await page.evaluate(()=>window.reject=false);await menu.locator('button').first().focus();await page.keyboard.press('Escape');await menu.waitFor({state:'detached'})}
   records.push({width,surface,kind,blank,touchAndMouse:true,outsideTargets:true,escape:true,select:true,reclick:true,controlledRejection:kind==='context'})
   console.log('PASS action menu focus',width,surface,kind)
  }
  assert.deepEqual(errors,[]);await page.screenshot({path:fileURLToPath(new URL(`${target?'installed':baseline?'baseline':'source'}-${width}-${surface}.png`,out))});await context.close()
 }
 if(!placement)await writeFile(new URL(target?'installed-results.json':baseline?'baseline.json':'source-results.json',out),JSON.stringify({baseline,baselineRef,target,componentIds:['scontext-menu','ssplit-btn'],physicalAndroid:false,nativePopover:true,records},null,2)+'\n')
}finally{await browser?.close();await new Promise(done=>server.close(done))}
