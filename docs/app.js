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
  zoom.addEventListener('click',()=>{const zoomed=stage.classList.toggle('zoomed');zoom.textContent=zoomed?'Fit image':'Zoom in';zoom.setAttribute('aria-pressed',String(zoomed));stage.scrollTo(0,0);});
}
