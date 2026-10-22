// Geometric yarn loops illustrate a pattern, separate from actual carpet progress.
const n = value => Number(value.toFixed(2));
function grannySquare(x,y,index) {
  const rounds=[];
  for(let ring=0;ring<3;ring++) {
    const paths=[];
    const count=8+ring*4, radius=11+ring*11;
    for(let j=0;j<count;j++) {
      const angle=j/count*Math.PI*2;
      const px=x+Math.cos(angle)*radius,py=y+Math.sin(angle)*radius;
      paths.push(`<ellipse class="yarn-loop" cx="${n(px)}" cy="${n(py)}" rx="${5+ring*.7}" ry="${8+ring*.7}" transform="rotate(${n(angle*180/Math.PI+90)} ${n(px)} ${n(py)})" pathLength="1"/>`);
    }
    rounds.push(`<g class="crochet-round" data-round="${ring}">${paths.join('')}</g>`);
  }
  const edges=[];
  for(let side=0;side<4;side++)for(let j=0;j<8;j++) {
    const a=-42+j*12;
    const px=x+(side===0?a:side===1?48:side===2?-a:-48);
    const py=y+(side===0?-48:side===1?a:side===2?48:-a);
    edges.push(`<ellipse class="yarn-loop edge-loop" cx="${n(px)}" cy="${n(py)}" rx="4" ry="7" transform="rotate(${side*90} ${n(px)} ${n(py)})" pathLength="1"/>`);
  }
  rounds.push(`<g class="crochet-round" data-round="3">${edges.join('')}</g>`);
  return `<g class="crochet-patch" data-patch="${index}"><rect class="patch-hit-area" x="${x-53}" y="${y-53}" width="106" height="106" rx="12"/>${rounds.join('')}<rect class="yarn-border" x="${x-48}" y="${y-48}" width="96" height="96" rx="4"/><text class="square-number" x="${x}" y="${y+5}" text-anchor="middle" aria-hidden="true">${index+1}</text></g>`;
}
const plus=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
const save=`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M5 16v5h14v-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export function crochetStudy(id="crochet") {
  const squares=[];
  for(let row=0;row<2;row++)for(let col=0;col<3;col++)squares.push(grannySquare(87+col*110,88+row*110,row*3+col));
  return `<div id="${id}-studio" class="crochet-study" data-crochet><div class="crochet-canvas"><div class="pattern-toolbar"><span>Your pattern</span><button type="button" data-reset hidden disabled>Start over</button></div><p class="pattern-canvas-hint" hidden>Tap a square. Hold to keep stitching.</p><svg class="crochet-svg" viewBox="0 0 400 285" role="img" aria-labelledby="${id}-title ${id}-description"><title id="${id}-title">Your crochet pattern</title><desc id="${id}-description">Six granny squares, each built from four rounds of geometric yarn loops.</desc><g class="rug-geometry">${squares.join('')}</g><path class="loose-thread" d="M 355 246 C 390 238 372 213 353 223 C 327 236 368 270 390 252"/><g class="crochet-hook" aria-hidden="true"><path d="M 358 209 L 383 162 Q 389 151 394 157 Q 397 162 389 169"/></g></svg><div class="pattern-progress" hidden><progress data-pattern-progress max="24" value="0" aria-label="Pattern progress"></progress><div><span data-stitch-counter>0 of 24 rounds</span><span data-square-counter>0 of 6 squares</span></div></div></div><div class="crochet-controls"><span>One loop<br>at a time.</span><p class="crochet-instructions" data-stitch-instructions hidden>Tap a square to add a round. Press and hold to keep stitching. Choose a different yarn for the next round.</p><p class="palette-label" hidden>Yarn for the next round</p><div class="yarn-choices" aria-label="Yarn for the next round" hidden><button type="button" data-yarn="#785642" aria-pressed="true"><i style="--swatch:#785642" aria-hidden="true"></i>Walnut</button><button type="button" data-yarn="#343436" aria-pressed="false"><i style="--swatch:#343436" aria-hidden="true"></i>Charcoal</button><button type="button" data-yarn="#9c836e" aria-pressed="false"><i style="--swatch:#9c836e" aria-hidden="true"></i>Oat</button></div><div class="active-square" hidden><span data-active-square>Square 1 · Center</span><div class="round-dots" aria-hidden="true"><i></i><i></i><i></i><i></i></div></div><div class="stitch-actions"><button class="stitch-button" type="button" data-stitch hidden>Stitch next round ${plus}</button><div class="history-actions"><button type="button" data-unpick hidden disabled>Undo</button><button type="button" data-redo hidden disabled>Redo</button></div></div><button class="save-pattern" type="button" data-save-pattern hidden disabled>Save pattern ${save}</button><p class="crochet-status" role="status" aria-live="polite" hidden>Choose a yarn and a square to begin.</p><noscript><p class="crochet-instructions">Turn on JavaScript to stitch your own pattern.</p></noscript></div></div>`;
}

export function makingSection({base,image,figure,textLink}) {
  return `<section id="making" class="making-section container"><div class="making-intro"><div><h2>Off-screen,<br>I’m learning to crochet.</h2><p>Right now, I’m making a carpet. I’ve also been exploring what crochet can do with light.</p></div></div><div class="making-objects"><figure class="making-carpet"><a class="image-link" href="${base}assets/images/crochet-carpet-2400.webp" data-lightbox data-caption="Crochet carpet, in progress" data-original="${base}assets/originals/crochet-carpet.png" aria-label="Enlarge: Crochet carpet in progress">${image('crochet-carpet','The brown crochet carpet I am currently making',base,{sizes:'(max-width:700px) calc(100vw - 40px), 600px'})}</a><figcaption><strong>A carpet in progress</strong><span>Learning through making.</span></figcaption></figure><div class="making-lamp" data-lamp><figure><a class="image-link lamp-photo" href="${base}assets/images/crochet-lamp-2400.webp" data-lightbox data-caption="Crochet lamp, pendant view" data-original="${base}assets/originals/crochet-lamp.png" aria-label="Enlarge: Crochet lamp pendant view">${image('crochet-lamp','Crochet pendant lamp with warm light passing through the stitches',base,{sizes:'(max-width:700px) calc(100vw - 40px), 600px'})}</a><figcaption><strong>A crochet lamp</strong><span>Texture, seen in a different light.</span></figcaption></figure><div class="lamp-controls" aria-label="Lamp photograph views"><button type="button" data-lamp-view="crochet-lamp" aria-pressed="true" hidden>Pendant view</button><button type="button" data-lamp-view="crochet-lamp-detail" aria-pressed="false" hidden>Stitch detail</button><a class="lamp-detail-fallback" href="${base}assets/images/crochet-lamp-detail-2400.webp" data-lightbox data-caption="Crochet lamp, stitch detail" data-original="${base}assets/originals/crochet-lamp-detail.png" aria-label="Enlarge: Crochet lamp stitch detail">View the stitch detail</a></div></div></div>${crochetStudy()}<p class="making-footnote">Interactive stitch study, inspired by the carpet in progress.</p></section>`;
}
