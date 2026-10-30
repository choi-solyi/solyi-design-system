import assert from 'node:assert/strict'
import {createServer} from 'node:http'
import {mkdir,readFile,writeFile,stat} from 'node:fs/promises'
import {resolve,extname,sep} from 'node:path'
import {fileURLToPath} from 'node:url'
import {chromium} from '../.tooling/browser-qa/node_modules/playwright-core/index.mjs'
const repository=new URL('../',import.meta.url),argument=process.argv.find(value=>value.startsWith('--consumer='))?.slice(11)
assert.ok(argument,'Specify an installed, unpublished QA consumer')
const consumer=new URL(argument.replace(/\/?$/,'/'),repository)
assert.ok(consumer.href.startsWith(new URL('qa-output/',repository).href))
const fixture=new URL('.recipe-09-12/',consumer),out=new URL('qa-output/recipe-09-12/',repository)
await mkdir(fixture,{recursive:true});await mkdir(out,{recursive:true})
assert.deepEqual(await readFile(new URL('node_modules/solyi-ui/dist/index.js',consumer)),await readFile(new URL('packages/vue-ui/dist/index.js',repository)),'Installed bytes match the built development package')
for(const name of ['fields','time','accordion','breadcrumbs','pagination']){
 const source=await readFile(new URL('examples/vue-vuetify/src/recipes/'+name+'.vue',repository),'utf8')
 await writeFile(new URL(name+'.vue',fixture),source.replace('<script setup lang="ts">','<script setup lang="ts">\nimport {ref,computed,watch,nextTick,useTemplateRef} from "vue"'))
}
await writeFile(new URL('index.html',fixture),'<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><div id="app"></div><script type="module" src="/main.ts"></script></html>')
await writeFile(new URL('main.ts',fixture),`import {createApp,h} from 'vue';import {VApp} from 'vuetify/components/VApp';import Solyi,{createSolyiVuetify,applySolyiAppearance} from 'solyi-ui';import 'solyi-ui/all.css';import fields from './fields.vue';import time from './time.vue';import accordion from './accordion.vue';import breadcrumbs from './breadcrumbs.vue';import pagination from './pagination.vue';const q=new URLSearchParams(location.search);document.documentElement.dir=q.get('rtl')?'rtl':'ltr';const vuetify=createSolyiVuetify({components:{VApp},locale:{locale:'en',rtl:{en:!!q.get('rtl')}}});applySolyiAppearance(vuetify.theme,{theme:q.get('theme')||'violet',mode:q.get('mode')||'light',density:q.get('density')||'comfortable'});const app=createApp({render:()=>h(VApp,null,()=>h('main',{style:'max-width:760px;padding:16px;margin:auto'},[h('p','1.1.1 준비 · 미게시 설치본'),h(({fields,time,accordion,breadcrumbs,pagination})[q.get('recipe')||'fields'])]))});app.use(vuetify);app.use(Solyi);app.mount('#app');`)
const {build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer)),{default:vue}=await import(new URL('examples/vue-vuetify/node_modules/@vitejs/plugin-vue/dist/index.mjs',repository))
await build({root:fileURLToPath(fixture),configFile:false,plugins:[vue()],base:'./',logLevel:'error'})
const root=fileURLToPath(new URL('dist/',fixture)).replace(/[\\/]$/,'')
const server=createServer(async(req,res)=>{try{let path=resolve(root,'.'+new URL(req.url,'http://local').pathname);if(path!==root&&!path.startsWith(root+sep))throw Error('path');if((await stat(path)).isDirectory())path=resolve(path,'index.html');res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2'})[extname(path)]||'application/octet-stream');res.end(await readFile(path))}catch{res.statusCode=404;res.end()}})
await new Promise(done=>server.listen(0,'127.0.0.1',done));const origin='http://127.0.0.1:'+server.address().port,records=[];let browser
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true})
 for(const appearance of [{width:1100,theme:'violet',mode:'light'},{width:390,theme:'sage',mode:'dark',density:'compact'},{width:390,theme:'sand',mode:'light',rtl:'1'}]){
  const context=await browser.newContext({viewport:{width:appearance.width,height:1000},reducedMotion:'no-preference'}),page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));await page.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort())
  for(const recipe of ['fields','time','accordion','breadcrumbs','pagination']){
   await page.goto(origin+'/?'+new URLSearchParams({...appearance,recipe}),{waitUntil:'networkidle'})
   if(recipe==='fields'){
    await page.locator('#recipe-field-loading').check();const spinner=page.locator('.sol-ui-input-spinner');await spinner.waitFor();const before=await spinner.evaluate(el=>({transform:getComputedStyle(el).transform,time:el.getAnimations()[0]?.currentTime}));await page.waitForTimeout(180);const after=await spinner.evaluate(el=>({transform:getComputedStyle(el).transform,time:el.getAnimations()[0]?.currentTime}));assert.notEqual(before.transform,after.transform);assert.ok(after.time>before.time);await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await spinner.evaluate(el=>getComputedStyle(el).animationName),'none');await page.emulateMedia({reducedMotion:'no-preference'});assert.equal(await page.getByText(/지운 횟수/).count(),0)
   }
   if(recipe==='time'){
    await page.locator('#recipe-time').focus();await page.keyboard.press('Alt+ArrowDown');const panel=page.locator('#recipe-time-panel');await panel.waitFor();for(const unit of await panel.locator('.sol-ui-time-unit').all()){const select=await unit.locator('select').boundingBox(),label=await unit.locator('.sol-ui-time-unit-label').boundingBox();if(appearance.rtl)assert.ok(label.x+label.width<=select.x+1);else assert.ok(label.x>=select.x+select.width-1)}const done=panel.locator('.sol-ui-time-confirm');assert.equal(await done.getAttribute('class').then(value=>value.includes('primary')),true);const p=await panel.boundingBox(),b=await done.boundingBox();assert.ok(b.x+b.width>p.x+p.width*.7||appearance.rtl);await panel.locator('select').first().selectOption('10');await panel.locator('select').last().selectOption('15');await done.click();await page.getByRole('status').filter({hasText:'완료값: 10:15'}).waitFor();await page.locator('#recipe-time-scrub').check();const grip=page.locator('.sol-ui-time-scrub');await grip.waitFor();assert.ok((await grip.textContent()).trim().length>0);const input=await page.locator('#recipe-time-list').boundingBox(),g=await grip.boundingBox();assert.ok(g.y>=input.y+input.height-1);await grip.focus();await page.keyboard.press('ArrowUp');await page.keyboard.press('Escape')
   }
   if(recipe==='accordion'){
    const buttons=page.locator('summary'),opened=index=>buttons.nth(index).evaluate(el=>el.parentElement.open);assert.equal(await buttons.count(),5);await buttons.nth(0).focus();await page.keyboard.press('Enter');assert.equal(await opened(0),true);for(let n=1;n<5;n++)await buttons.nth(n).click();for(let n=0;n<5;n++)assert.equal(await opened(n),true);await buttons.nth(2).click();assert.equal(await opened(2),false);assert.equal(await opened(1),true);assert.equal(await opened(4),true)
   }
   if(recipe==='breadcrumbs'){
    assert.equal(await page.locator('.sol-ui-pagination').count(),0);const first=page.getByRole('navigation').getByRole('button').first();await first.focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#recipe-breadcrumb-view').evaluate(el=>el===document.activeElement),true);assert.equal(await page.getByRole('navigation').locator('[aria-current="page"]').count(),1)
   }
   if(recipe==='pagination'){
    await page.locator('#recipe-pagination-many').click();const nav=page.locator('.sol-pagination');for(const direction of ['first','previous','next','last']){const button=nav.locator('[data-edge="'+direction+'"]');assert.equal(await button.locator('svg').count(),1);assert.equal(await button.isVisible(),true)}const sizes=await nav.locator('[data-edge]').evaluateAll(items=>items.map(item=>item.getBoundingClientRect().width));assert.ok(sizes.every(width=>Math.abs(width-sizes[0])<1));assert.ok(await nav.locator('.sol-ui-pagination-number:visible').count()>=9);await nav.locator('[data-edge="next"]').focus();await page.keyboard.press('Enter');await page.getByRole('status').filter({hasText:'부모 페이지 501'}).waitFor();await page.locator('#recipe-pagination-accept').uncheck();await nav.locator('[data-edge="next"]').click();await page.getByRole('status').filter({hasText:'부모 페이지 501 · 최근 제안 502'}).waitFor();await page.locator('#recipe-pagination-accept').check();await nav.locator('[data-edge="last"]').click();assert.equal(await nav.locator('[data-edge="last"]').isDisabled(),true);assert.equal(await nav.locator('[data-edge="next"]').isDisabled(),true)
   }
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),recipe+' has no page horizontal overflow');await page.screenshot({path:fileURLToPath(new URL(recipe+'-'+appearance.theme+'.png',out)),fullPage:true});records.push({recipe,appearance,actualInteraction:true})
  }
  assert.deepEqual(errors,[]);await context.close();console.log('PASS recipes 9–12',appearance.theme,appearance.width)
 }
 await writeFile(new URL('observations.json',out),JSON.stringify(records,null,2)+'\n')
}finally{await browser?.close();await new Promise(done=>server.close(done))}
