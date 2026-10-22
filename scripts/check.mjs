import {readFile, readdir, stat} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../docs');
const walk=async(dir)=>{const results=[];for(const item of await readdir(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory())results.push(...await walk(file));else results.push(file);}return results;};
const files=await walk(root);
const pages=files.filter(p=>p.endsWith('.html'));
const errors=[];
let links=0;
const htmlCache=new Map(await Promise.all(pages.map(async file=>[file,await readFile(file,'utf8')])));
for(const file of pages){
  const html=htmlCache.get(file);
  const label=path.relative(root,file);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${label}: one h1`);
  assert.match(html,/<html lang="en">/);
  assert.match(html,/<meta name="description" content="[^"]+"/);
  assert.match(html,/54d85aec/,'Direction contract survives production rendering');
  assert.ok(!/TODO|lorem ipsum|placeholder/i.test(html),`${label}: no placeholder content`);
  assert.ok(!/<iframe|<form|https?:\/\/[^" ]+\.js/.test(html),`${label}: no forms or third-party runtime`);
  for(const m of html.matchAll(/<img\b[^>]*>/g)){
    assert.match(m[0],/\balt="[^"]*"/,`${label}: image alt`);
    if(!m[0].includes('viewer-image'))assert.match(m[0],/width="\d+" height="\d+"/,`${label}: reserved image dimensions`);
  }
  for(const m of html.matchAll(/\b(?:href|src)="([^"]*)"/g)){
    const ref=m[1].replaceAll('&amp;','&');
    if(!ref||ref==='#'||/^(https?:|mailto:|tel:|data:)/.test(ref))continue;
    links++;
    const [withQuery,fragment]=ref.split('#');
    const pathname=withQuery.split('?')[0];
    let target=pathname?path.resolve(path.dirname(file),pathname):file;
    if(pathname.startsWith('/nishabh-polke/'))target=path.join(root,pathname.slice('/nishabh-polke/'.length));
    try{
      const info=await stat(target);if(info.isDirectory())target=path.join(target,'index.html');
      await stat(target);
      if(fragment&&target.endsWith('.html')){
        const text=htmlCache.get(target)||await readFile(target,'utf8');
        assert.ok(text.includes(`id="${fragment}"`),`Missing fragment ${ref}`);
      }
    }catch(e){errors.push(`${label}: ${ref}: ${e.message}`);}
  }
  for(const m of html.matchAll(/srcset="([^"]+)"/g))for(const source of m[1].split(', ')){
    const ref=source.split(' ')[0];try{await stat(path.resolve(path.dirname(file),ref));}catch{errors.push(`${label}: missing srcset ${ref}`);}
  }
}
for(const file of files){assert.ok((await stat(file)).size<100*1024*1024,`GitHub file limit: ${file}`);}
assert.equal(pages.length,8,'Home, Work, About, four cases and custom 404');
const home=htmlCache.get(path.join(root,'index.html'));
const work=htmlCache.get(path.join(root,'work/index.html'));
assert.ok(home.includes('making-section')&&!home.includes('data-research-project'),'Home has its own personal content');
for(const slug of ['forres','endoscopic-device','tobacco-cessation','smart-home'])assert.ok(work.includes(`./${slug}/`));
assert.equal((work.match(/data-research-project=/g)||[]).length,4,'Four visible research projects');
assert.equal((home.match(/<article class="home-project"/g)||[]).length,4,'Four projects together on Home');
assert.ok(home.includes('data-crochet')&&home.includes('data-lamp'),'Personal making interactions included');
assert.ok(work.includes('data-crochet'),'Work includes the stitch activity');
for(const html of [home,work]){assert.equal((html.match(/data-patch=/g)||[]).length,6,'Six illustrated squares');assert.equal((html.match(/data-yarn=/g)||[]).length,3,'Three yarn choices');assert.ok(html.includes('data-unpick')&&html.includes('data-redo')&&html.includes('data-stitch-counter'),'History and progress controls');assert.equal((html.match(/data-round=/g)||[]).length,24,'Four rounds in each square');assert.ok(html.includes('data-save-pattern'),'Pattern export control');assert.equal((html.match(/data-stitch[ >]/g)||[]).length,1,'One unambiguous stitch action');assert.ok(!html.includes('<ellipse class="yarn-loop"'),'Stitches use connected paths');}
for(const name of ['nishabh-polke-ux-portfolio.pdf','nishabh-polke-architecture-portfolio.pdf','forres-stakeholder-recommendation.pdf']){
  const buffer=await readFile(path.join(root,'assets/downloads',name));assert.equal(buffer.subarray(0,5).toString(),'%PDF-');
}
assert.equal(await readFile(path.join(root,'crochet-state.mjs'),'utf8'),await readFile(path.join(root,'../crochet-state.mjs'),'utf8'),'Published pattern module matches source');
assert.deepEqual(errors,[],errors.join('\n'));
console.log(`Passed: ${pages.length} pages, ${links} local links, responsive image sources, metadata, PDF headers, and GitHub file limits.`);
