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
  const patches=[...crochet.querySelectorAll('[data-patch]')];
  const button=crochet.querySelector('[data-stitch]');
  const undo=crochet.querySelector('[data-unpick]');
  const counter=crochet.querySelector('[data-stitch-counter]');
  const status=crochet.querySelector('.crochet-status');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const order=[];
  let working=false;
  crochet.classList.add('is-interactive');
  crochet.querySelector('.crochet-svg').setAttribute('role','group');
  crochet.querySelectorAll('[hidden]').forEach(control=>control.hidden=false);
  const update=()=>{
    counter.textContent=`${order.length} of ${patches.length} squares stitched`;
    button.firstChild.textContent=order.length===patches.length?'Start again ':'Stitch next square ';
    button.disabled=working;
    undo.disabled=working||order.length===0;
    crochet.setAttribute('aria-busy',String(working));
    patches.forEach((patch,i)=>{
      const made=order.includes(i);
      patch.classList.toggle('is-stitched',made);
      patch.setAttribute('role','button');patch.setAttribute('tabindex','0');
      patch.setAttribute('aria-pressed',String(made));
      patch.setAttribute('aria-disabled',String(working));
      patch.setAttribute('aria-label',`${made?'Unpick':'Stitch'} square ${i+1}`);
    });
  };
  const unpick=index=>{
    order.splice(order.indexOf(index),1);update();
    status.textContent=`Square ${index+1} unpicked. ${counter.textContent}.`;
  };
  const stitch=index=>{
    if(working)return;
    if(order.includes(index)){unpick(index);return;}
    working=true;update();
    const patch=patches[index];
    crochet.style.setProperty('--hook-x',`${-221+(index%3)*110}px`);
    crochet.style.setProperty('--hook-y',`${-71+Math.floor(index/3)*110}px`);
    patch.classList.add('is-stitching');crochet.classList.add('is-working');
    setTimeout(()=>{
      patch.classList.remove('is-stitching');order.push(index);working=false;
      crochet.classList.remove('is-working');update();
      status.textContent=order.length===patches.length?'Your illustrated pattern is complete. Start again or unpick a square.':`Square ${index+1} stitched. ${counter.textContent}.`;
    },reduced.matches?0:1250);
  };
  patches.forEach((patch,i)=>{
    patch.addEventListener('click',()=>stitch(i));
    patch.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){event.preventDefault();stitch(i);}
      const next={ArrowRight:(i+1)%6,ArrowLeft:(i+5)%6,ArrowDown:(i+3)%6,ArrowUp:(i+3)%6,Home:0,End:5}[event.key];
      if(next!==undefined){event.preventDefault();patches[next].focus();}
    });
  });
  button.addEventListener('click',()=>{
    if(order.length===patches.length){order.length=0;update();status.textContent='A fresh pattern. Choose a square to begin.';return;}
    stitch(patches.findIndex((_,i)=>!order.includes(i)));
  });
  undo.addEventListener('click',()=>{if(!working&&order.length)unpick(order.at(-1));});
  crochet.querySelectorAll('[data-yarn]').forEach(choice=>choice.addEventListener('click',()=>{
    crochet.style.setProperty('--yarn',choice.dataset.yarn);
    crochet.querySelectorAll('[data-yarn]').forEach(other=>other.setAttribute('aria-pressed',String(other===choice)));
  }));
  update();
  const visible=new IntersectionObserver(entries=>entries.forEach(entry=>crochet.classList.toggle('is-visible',entry.isIntersecting)),{threshold:.1});
  visible.observe(crochet);
  document.addEventListener('visibilitychange',()=>crochet.classList.toggle('is-paused',document.hidden));
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
