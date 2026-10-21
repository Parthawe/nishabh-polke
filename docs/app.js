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
    document.body.classList.add('viewer-open');
    viewer.querySelector('.viewer-close').focus();
  });
  viewer.querySelector('.viewer-close').addEventListener('click',()=>viewer.close());
  viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close();});
  viewer.addEventListener('close',()=>{++request;finishLoading();document.body.classList.remove('viewer-open');trigger?.focus();});
  zoom.addEventListener('click',()=>{const zoomed=stage.classList.toggle('zoomed');zoom.textContent=zoomed?'Fit image':'Zoom in';zoom.setAttribute('aria-pressed',String(zoomed));stage.scrollTo(0,0);if(zoomed)stage.focus();});
}

const crochet = document.querySelector('[data-crochet]');
if(crochet) {
  const patches=[...crochet.querySelectorAll('[data-patch]')];
  const button=crochet.querySelector('[data-stitch]');
  const status=crochet.querySelector('.crochet-status');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let made=2;
  crochet.classList.add('is-interactive');
  patches.forEach((patch,i)=>patch.classList.toggle('is-stitched',i<made));
  button.hidden=false;
  const visible=new IntersectionObserver(entries=>entries.forEach(entry=>crochet.classList.toggle('is-visible',entry.isIntersecting)),{threshold:.1});
  visible.observe(crochet);
  document.addEventListener('visibilitychange',()=>crochet.classList.toggle('is-paused',document.hidden));
  button.addEventListener('click',()=>{
    if(made===patches.length) {
      made=0;patches.forEach(p=>p.classList.remove('is-stitched'));
    }
    const patch=patches[made];
    button.disabled=true;
    crochet.setAttribute('aria-busy','true');
    patch.classList.add('is-stitching');
    crochet.classList.add('is-working');
    setTimeout(()=>{
      patch.classList.remove('is-stitching');patch.classList.add('is-stitched');made++;
      crochet.classList.remove('is-working');crochet.setAttribute('aria-busy','false');
      button.disabled=false;
      button.firstChild.textContent=made===patches.length?'Stitch it again ':'Make a few stitches ';
      status.textContent=made===patches.length?'The illustrated carpet is complete. You can stitch it again.':'Another illustrated square is stitched.';
    },reduced.matches?0:1250);
  });
}

const lamp=document.querySelector('[data-lamp]');
if(lamp) {
  const link=lamp.querySelector('.lamp-photo');
  const image=link.querySelector('img');
  const controls=[...lamp.querySelectorAll('[data-lamp-view]')];
  const prefix=link.href.slice(0,link.href.indexOf('assets/images/'));
  controls.forEach(button=>{
    button.hidden=false;
    button.addEventListener('click',()=>{
      if(button.getAttribute('aria-pressed')==='true')return;
      const name=button.dataset.lampView;
      const detail=name==='crochet-lamp-detail';
      controls.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      link.href=`${prefix}assets/images/${name}-2400.webp`;
      link.dataset.original=`${prefix}assets/originals/${name}.png`;
      link.dataset.caption=detail?'Crochet lamp, stitch detail':'Crochet lamp, pendant view';
      link.setAttribute('aria-label',`Enlarge: ${link.dataset.caption}`);
      image.alt=detail?'Close view of the glowing crochet stitches in the lamp':'Crochet pendant lamp with warm light passing through the stitches';
      image.srcset=[800,1600,2400].map(width=>`${prefix}assets/images/${name}-${width}.webp ${width}w`).join(', ');
      image.src=`${prefix}assets/images/${name}-1600.webp`;
      if(!matchMedia('(prefers-reduced-motion: reduce)').matches)image.animate([{opacity:.45},{opacity:1}],{duration:250,easing:'ease-out'});
    });
  });
  lamp.querySelector('.lamp-detail-fallback').hidden=true;
}

// Preserve the old published Work bookmark after splitting the two pages.
if(document.body.classList.contains('page-home') && location.hash==='#work') {
  location.replace(new URL('work/',location.href).href);
}
