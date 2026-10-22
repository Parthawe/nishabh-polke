import {CrochetPattern, YARNS, ROUND_NAMES} from './crochet-state.mjs';

// Keep optional motion interruptible, including changes to the system preference.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const runningMotion = new Set();
const elementMotion = new WeakMap();
function animateFeedback(element, frames, options = {}) {
  elementMotion.get(element)?.cancel();
  if (motionPreference.matches || !element.animate) return null;
  const animation = element.animate(frames, {
    duration: 260, easing: 'cubic-bezier(.16,1,.3,1)', ...options
  });
  elementMotion.set(element, animation);
  runningMotion.add(animation);
  const release = () => runningMotion.delete(animation);
  animation.finished.then(release, release);
  return animation;
}
const stopMotion = () => runningMotion.forEach(animation => animation.cancel());
motionPreference.addEventListener('change', () => {
  if (motionPreference.matches) stopMotion();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopMotion();
});

// The header gains separation only once content passes underneath it.
const header = document.querySelector('.site-header');
if (header) {
  let scheduled = false;
  const syncHeader = () => {
    header.classList.toggle('is-scrolled', scrollY > 12);
    scheduled = false;
  };
  addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(syncHeader); }
  }, {passive: true});
  syncHeader();
}

// Progressive enhancement: every artifact remains an ordinary image link without JS.
const viewer = document.querySelector('.image-viewer');
if (viewer && typeof viewer.showModal === 'function') {
  const stage = viewer.querySelector('.viewer-stage');
  const img = new Image();
  img.className = 'viewer-image';
  img.alt = '';
  img.hidden = true;
  stage.append(img);
  const caption = viewer.querySelector('#viewer-caption');
  const original = viewer.querySelector('.viewer-original');
  const errorLink = viewer.querySelector('.viewer-error-link');
  const loading = viewer.querySelector('.viewer-loading');
  const error = viewer.querySelector('.viewer-error');
  const zoom = viewer.querySelector('.zoom-toggle');
  let trigger;
  let request = 0;
  let loadTimeout;
  let closing = false;
  const finishLoading = () => {clearTimeout(loadTimeout);stage.setAttribute('aria-busy', 'false');loading.hidden = true;};
  const resetZoom = () => {stage.classList.remove('zoomed');zoom.textContent = 'Zoom in';zoom.setAttribute('aria-pressed','false');stage.scrollTo(0,0);};
  stage.tabIndex=0;
  stage.setAttribute('role','region');
  stage.setAttribute('aria-label','Enlarged image. Use arrow keys to scroll when zoomed.');
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-lightbox]');
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    trigger = link;
    resetZoom();
    const currentRequest = ++request;
    const description = link.dataset.caption;
    caption.textContent = description;
    img.alt = description;
    original.href = link.dataset.original;
    errorLink.href = link.dataset.original;
    stage.setAttribute('aria-busy','true');loading.hidden=false;error.hidden=true;img.hidden=false;
    zoom.disabled = true;
    img.onload = () => {if(currentRequest!==request)return;finishLoading();zoom.disabled=false;};
    img.onerror = () => {if(currentRequest!==request)return;finishLoading();error.hidden=false;img.hidden=true;};
    img.src = link.href;
    clearTimeout(loadTimeout);
    loadTimeout = setTimeout(()=>{if(currentRequest!==request)return;finishLoading();error.hidden=false;img.hidden=true;},20000);
    viewer.showModal();
    animateFeedback(viewer, [
      {opacity: 0, transform: 'translateY(12px) scale(.985)'},
      {opacity: 1, transform: 'translateY(0) scale(1)'}
    ], {duration: 300});
    document.body.classList.add('viewer-open');
    viewer.querySelector('.viewer-close').focus();
  });
  const dismissViewer = () => {
    if (!viewer.open || closing) return;
    closing = true;
    viewer.classList.add('is-closing');
    const exit = animateFeedback(viewer, [
      {opacity: 1, transform: 'translateY(0) scale(1)'},
      {opacity: 0, transform: 'translateY(6px) scale(.99)'}
    ], {duration: 140, easing: 'ease-in', fill: 'forwards'});
    const close = () => {
      viewer.close();
      exit?.cancel();
      viewer.classList.remove('is-closing');
      closing = false;
    };
    if (exit) exit.finished.then(close, close); else close();
  };
  viewer.querySelector('.viewer-close').addEventListener('click', dismissViewer);
  viewer.addEventListener('click',event=>{if(event.target===viewer)dismissViewer();});
  viewer.addEventListener('cancel',event=>{event.preventDefault();dismissViewer();});
  viewer.addEventListener('close',()=>{++request;finishLoading();document.body.classList.remove('viewer-open');trigger?.focus({preventScroll:true});});
  zoom.addEventListener('click',()=>{const zoomed=stage.classList.toggle('zoomed');zoom.textContent=zoomed?'Fit image':'Zoom in';zoom.setAttribute('aria-pressed',String(zoomed));stage.scrollTo(0,0);if(zoomed)stage.focus();});
}

for(const crochet of document.querySelectorAll('[data-crochet]')) {
  const storageKey='nishabh-crochet-v2';
  let saved;
  try { saved=JSON.parse(sessionStorage.getItem(storageKey)); } catch {}
  const pattern=new CrochetPattern(saved);
  const patches=[...crochet.querySelectorAll('[data-patch]')];
  const rounds=patches.map(patch=>[...patch.querySelectorAll('[data-round]')]);
  const button=crochet.querySelector('[data-stitch]');
  const undo=crochet.querySelector('[data-unpick]');
  const redo=crochet.querySelector('[data-redo]');
  const reset=crochet.querySelector('[data-reset]');
  const save=crochet.querySelector('[data-save-pattern]');
  const status=crochet.querySelector('.crochet-status');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const stopPresses=new Set();
  const persist=()=>{try { sessionStorage.setItem(storageKey,pattern.serialize()); } catch {}};
  const say=text=>{status.textContent=text;};
  const stopAll=()=>stopPresses.forEach(stop=>stop());
  crochet.classList.add('is-interactive');
  crochet.querySelector('.crochet-svg').setAttribute('role','group');
  crochet.querySelectorAll('[hidden]').forEach(control=>control.hidden=false);
  const update=()=>{
    const total=pattern.total;
    crochet.classList.toggle('is-complete',total===24);
    crochet.querySelector('[data-stitch-counter]').textContent=`${total} of 24 rounds`;
    crochet.querySelector('[data-square-counter]').textContent=`${pattern.completed} of 6 squares`;
    crochet.querySelector('[data-pattern-progress]').value=total;
    button.firstChild.textContent=total===24?'Start another ':'Stitch next round ';
    undo.disabled=!pattern.history.length;
    redo.disabled=!pattern.future.length;
    reset.disabled=!total;
    save.disabled=!total;
    const active=pattern.cells[pattern.active];
    crochet.querySelector('[data-active-square]').textContent=`Square ${pattern.active+1} · ${active.length===4?'Complete':ROUND_NAMES[active.length]}`;
    crochet.querySelectorAll('.round-dots i').forEach((dot,i)=>{
      dot.classList.toggle('is-filled',i<active.length);
      dot.style.backgroundColor=active[i]||'transparent';
    });
    crochet.querySelectorAll('[data-yarn]').forEach(choice=>choice.setAttribute('aria-pressed',String(choice.dataset.yarn===pattern.yarn)));
    crochet.style.setProperty('--yarn',pattern.yarn);
    crochet.style.setProperty('--hook-x',`${-221+(pattern.active%3)*110}px`);
    crochet.style.setProperty('--hook-y',`${-71+Math.floor(pattern.active/3)*110}px`);
    patches.forEach((patch,index)=>{
      const count=pattern.cells[index].length;
      patch.classList.toggle('is-stitched',count===4);
      patch.classList.toggle('is-empty',count===0);
      patch.classList.toggle('is-active',index===pattern.active);
      patch.setAttribute('role','button');
      patch.setAttribute('tabindex',index===pattern.active?'0':'-1');
      patch.setAttribute('aria-label',`Square ${index+1}, ${count} of 4 rounds. ${count===4?'Complete.':`Add ${ROUND_NAMES[count].toLowerCase()}.`}`);
      rounds[index].forEach((round,step)=>{
        const color=pattern.cells[index][step];
        round.classList.toggle('is-done',Boolean(color));
        round.style.color=color||pattern.yarn;
        if(!color)round.getAnimations({subtree:true}).forEach(animation=>animation.cancel());
      });
    });
    persist();
  };
  const select=index=>{pattern.active=index;update();};
  const add=index=>{
    if(index===undefined)index=pattern.next();
    if(index<0)return false;
    const change=pattern.add(index);
    if(!change){select(index);say(`Square ${index+1} is complete. Choose another square or undo a round.`);return false;}
    update();
    if(!reduced.matches){
      rounds[index][change.round].querySelectorAll('.yarn-loop').forEach((loop,i)=>animateFeedback(loop,[
        {strokeDasharray:'1',strokeDashoffset:1,opacity:.35},
        {strokeDasharray:'1',strokeDashoffset:0,opacity:1}
      ],{duration:250,delay:(i%4)*25}));
      animateFeedback(crochet.querySelector('.crochet-hook'),[{transform:'rotate(-8deg)'},{transform:'rotate(0deg)'}],{duration:250});
    }
    say(pattern.total===24?'Your pattern is complete. Save it or start another.':`${ROUND_NAMES[change.round]} added to square ${index+1}. ${pattern.total} of 24 rounds.`);
    return true;
  };
  // A tap remains a normal click. Holding repeats only after a deliberate pause.
  const press=(target,step,tap=step)=>{
    let delay,repeat,pointer,moved=false,held=false,startX=0,startY=0;
    const stop=()=>{clearTimeout(delay);clearInterval(repeat);pointer=undefined;};
    stopPresses.add(stop);
    target.addEventListener('pointerdown',event=>{
      if(event.button!==0||!event.isPrimary)return;
      stop();pointer=event.pointerId;moved=false;held=false;
      startX=event.clientX;startY=event.clientY;
      target.setPointerCapture?.(event.pointerId);
      delay=setTimeout(()=>{
        held=true;
        if(!step()){stop();return;}
        repeat=setInterval(()=>{if(!step())stop();},220);
      },380);
    });
    target.addEventListener('pointermove',event=>{
      if(pointer===event.pointerId&&Math.hypot(event.clientX-startX,event.clientY-startY)>12){moved=true;stop();}
    });
    target.addEventListener('pointerup',stop);
    target.addEventListener('pointercancel',()=>{moved=true;stop();});
    target.addEventListener('lostpointercapture',stop);
    target.addEventListener('click',event=>{
      if(event.detail>0&&(held||moved)){held=false;moved=false;return;}
      tap();
    });
  };
  const clear=()=>{stopAll();if(pattern.clear()){update();say('A fresh pattern. Undo brings your previous one back.');}};
  press(button,()=>pattern.total<24&&add(),()=>pattern.total===24?clear():add());
  patches.forEach((patch,index)=>{
    press(patch,()=>add(index));
    patch.addEventListener('focus',()=>{if(pattern.active!==index)select(index);});
    patch.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){event.preventDefault();if(!event.repeat)add(index);}
      const next={ArrowRight:(index+1)%6,ArrowLeft:(index+5)%6,ArrowDown:(index+3)%6,ArrowUp:(index+3)%6,Home:0,End:5}[event.key];
      if(next!==undefined){event.preventDefault();select(next);patches[next].focus({preventScroll:true});}
    });
  });
  const undoRound=()=>{stopAll();if(pattern.undo()){update();say(`Change undone. ${pattern.total} of 24 rounds.`);}};
  const redoRound=()=>{stopAll();if(pattern.redo()){update();say(`Change restored. ${pattern.total} of 24 rounds.`);}};
  undo.addEventListener('click',undoRound);
  redo.addEventListener('click',redoRound);
  reset.addEventListener('click',clear);
  crochet.addEventListener('keydown',event=>{
    if(!(event.metaKey||event.ctrlKey)||event.altKey)return;
    if(event.key.toLowerCase()==='z'){event.preventDefault();event.shiftKey?redoRound():undoRound();}
    if(event.key.toLowerCase()==='y'){event.preventDefault();redoRound();}
  });
  crochet.querySelectorAll('[data-yarn]').forEach(choice=>choice.addEventListener('click',()=>{
    if(YARNS.includes(choice.dataset.yarn)){pattern.yarn=choice.dataset.yarn;update();say(`${choice.textContent.trim()} yarn is ready for the next round.`);}
  }));
  save.addEventListener('click',()=>{
    if(!pattern.total)return;
    try {
      const svg=crochet.querySelector('.crochet-svg').cloneNode(true);
      svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
      svg.setAttribute('width','1200');svg.setAttribute('height','855');
      svg.querySelector('title').textContent='My crochet pattern';
      svg.querySelector('desc').textContent=`An illustrated pattern with ${pattern.total} rounds across six squares.`;
      svg.querySelectorAll('[data-patch]').forEach((patch,index)=>{
        patch.querySelectorAll('[data-round]').forEach((round,step)=>{
          const color=pattern.cells[index][step];
          if(color)round.setAttribute('style',`color:${color}`);else round.remove();
        });
      });
      svg.querySelectorAll('.patch-hit-area,.yarn-border,.square-number,.loose-thread,.crochet-hook').forEach(element=>element.remove());
      [svg,...svg.querySelectorAll('*')].forEach(element=>{
        for(const attr of [...element.attributes])if(attr.name.startsWith('data-')||attr.name.startsWith('aria-')||attr.name==='tabindex'||attr.name==='role')element.removeAttribute(attr.name);
      });
      const background=document.createElementNS('http://www.w3.org/2000/svg','rect');
      background.setAttribute('width','400');background.setAttribute('height','285');background.setAttribute('fill','#f5f5f7');
      const style=document.createElementNS('http://www.w3.org/2000/svg','style');
      style.textContent='.yarn-loop{fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round}.edge-loop{stroke-width:2.5}';
      svg.prepend(background,style);
      const blob=new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml'});
      const url=URL.createObjectURL(blob);
      const link=document.createElement('a');link.href=url;link.download='my-crochet-pattern.svg';
      document.body.append(link);link.click();link.remove();
      setTimeout(()=>URL.revokeObjectURL(url),10000);
      say('Your pattern is ready to download.');
    } catch { say('The pattern could not download. Try saving it again.'); }
  });
  update();
  if(pattern.total)say(`Your pattern is back. ${pattern.total} of 24 rounds.`);
  const visible=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)stopAll();}),{threshold:.1});
  visible.observe(crochet);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAll();});
}

const lamp=document.querySelector('[data-lamp]');
if(lamp) {
  const link=lamp.querySelector('.lamp-photo');
  const image=link.querySelector('img');
  const controls=[...lamp.querySelectorAll('[data-lamp-view]')];
  const prefix=link.href.slice(0,link.href.indexOf('assets/images/'));
  const status=document.createElement('p');
  status.className='lamp-load-status';
  status.setAttribute('role','status');
  lamp.append(status);
  let swapRequest=0;
  controls.forEach(button=>{
    button.hidden=false;
    button.addEventListener('click',async()=>{
      const currentRequest=++swapRequest;
      controls.forEach(b=>b.removeAttribute('data-loading'));
      status.textContent='';
      if(button.getAttribute('aria-pressed')==='true'){
        lamp.setAttribute('aria-busy','false');
        return;
      }
      const name=button.dataset.lampView;
      const detail=name==='crochet-lamp-detail';
      button.setAttribute('data-loading','true');
      lamp.setAttribute('aria-busy','true');
      const nextImage=new Image();
      nextImage.sizes=image.sizes;
      nextImage.srcset=[800,1600,2400].map(width=>`${prefix}assets/images/${name}-${width}.webp ${width}w`).join(', ');
      nextImage.src=`${prefix}assets/images/${name}-1600.webp`;
      try {
        await nextImage.decode();
      } catch {
        if(currentRequest!==swapRequest)return;
        button.removeAttribute('data-loading');
        lamp.setAttribute('aria-busy','false');
        status.textContent='That view couldn’t load. Try again.';
        return;
      }
      if(currentRequest!==swapRequest)return;
      controls.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      link.href=`${prefix}assets/images/${name}-2400.webp`;
      link.dataset.original=`${prefix}assets/originals/${name}.png`;
      link.dataset.caption=detail?'Crochet lamp, stitch detail':'Crochet lamp, pendant view';
      link.setAttribute('aria-label',`Enlarge: ${link.dataset.caption}`);
      image.alt=detail?'Close view of the glowing crochet stitches in the lamp':'Crochet pendant lamp with warm light passing through the stitches';
      image.srcset=nextImage.srcset;
      image.src=nextImage.src;
      button.removeAttribute('data-loading');
      lamp.setAttribute('aria-busy','false');
      animateFeedback(image,[{opacity:.35},{opacity:1}],{duration:280});
    });
  });
  lamp.querySelector('.lamp-detail-fallback').hidden=true;
}

// Preserve the old published Work bookmark after splitting the two pages.
if(document.body.classList.contains('page-home') && location.hash==='#work') {
  location.replace(new URL('work/',location.href).href);
}
