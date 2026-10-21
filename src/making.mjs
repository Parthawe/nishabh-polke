// A geometric crochet study. It illustrates stitches, not actual project progress.
const n = value => Number(value.toFixed(2));
function grannySquare(x,y,index) {
  const paths=[];
  for(let ring=0;ring<3;ring++) {
    const count=8+ring*4;
    const radius=11+ring*11;
    for(let j=0;j<count;j++) {
      const angle=j/count*Math.PI*2;
      const px=x+Math.cos(angle)*radius, py=y+Math.sin(angle)*radius;
      const radial=angle*180/Math.PI;
      paths.push(`<ellipse class="yarn-loop" cx="${n(px)}" cy="${n(py)}" rx="${5+ring*.7}" ry="${8+ring*.7}" transform="rotate(${n(radial+90)} ${n(px)} ${n(py)})" pathLength="1" style="--loop:${j%5}"/>`);
    }
  }
  // Chain stitches form the square edges, around the circular center motif.
  for(let side=0;side<4;side++)for(let j=0;j<8;j++) {
    const a=-42+j*12;
    const px=x+(side===0?a:side===1?48:side===2?-a:-48);
    const py=y+(side===0?-48:side===1?a:side===2?48:-a);
    paths.push(`<ellipse class="yarn-loop edge-loop" cx="${n(px)}" cy="${n(py)}" rx="4" ry="7" transform="rotate(${side*90} ${n(px)} ${n(py)})" pathLength="1" style="--loop:${j%5}"/>`);
  }
  const border=`M ${x-48} ${y-48} H ${x+48} V ${y+48} H ${x-48} Z`;
  return `<g class="crochet-patch" data-patch="${index}">${paths.join('')}<path class="yarn-border" d="${border}" pathLength="1"/></g>`;
}
export function crochetStudy() {
  const squares=[];
  for(let row=0;row<2;row++)for(let col=0;col<3;col++)squares.push(grannySquare(87+col*110,88+row*110,row*3+col));
  return `<div class="crochet-study" data-crochet><svg class="crochet-svg" viewBox="0 0 400 285" role="img" aria-labelledby="crochet-title crochet-description"><title id="crochet-title">A study in crochet stitches</title><desc id="crochet-description">Six connected granny squares drawn as loops of yarn. Use the button to stitch the illustration.</desc><g class="rug-geometry">${squares.join('')}</g><path class="loose-thread" d="M 355 246 C 390 238 372 213 353 223 C 327 236 368 270 390 252"/><g class="crochet-hook" aria-hidden="true"><path d="M 358 209 L 383 162 Q 389 151 394 157 Q 397 162 389 169"/></g></svg><div class="crochet-controls"><span>Loops, slowly becoming a carpet.</span><button class="stitch-button" type="button" data-stitch hidden>Make a few stitches <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button></div><p class="crochet-status sr-only" aria-live="polite"></p></div>`;
}

export function makingSection({base,image,figure,textLink}) {
  return `<section id="making" class="making-section container"><div class="making-intro"><div><h2>Off-screen,<br>I’m learning to crochet.</h2><p>Right now, I’m making a carpet. I’ve also been exploring what crochet can do with light.</p></div></div><div class="making-objects"><figure class="making-carpet"><a class="image-link" href="${base}assets/images/crochet-carpet-2400.webp" data-lightbox data-caption="Crochet carpet, in progress" data-original="${base}assets/originals/crochet-carpet.png" aria-label="Enlarge: Crochet carpet in progress">${image('crochet-carpet','The brown crochet carpet I am currently making',base,{sizes:'(max-width:700px) calc(100vw - 40px), 600px'})}</a><figcaption><strong>A carpet in progress</strong><span>Learning through making.</span></figcaption></figure><div class="making-lamp" data-lamp><figure><a class="image-link lamp-photo" href="${base}assets/images/crochet-lamp-2400.webp" data-lightbox data-caption="Crochet lamp, pendant view" data-original="${base}assets/originals/crochet-lamp.png" aria-label="Enlarge: Crochet lamp pendant view">${image('crochet-lamp','Crochet pendant lamp with warm light passing through the stitches',base,{sizes:'(max-width:700px) calc(100vw - 40px), 600px'})}</a><figcaption><strong>A crochet lamp</strong><span>Texture, seen in a different light.</span></figcaption></figure><div class="lamp-controls" aria-label="Lamp photograph views"><button type="button" data-lamp-view="crochet-lamp" aria-pressed="true" hidden>Pendant view</button><button type="button" data-lamp-view="crochet-lamp-detail" aria-pressed="false" hidden>Stitch detail</button><a class="lamp-detail-fallback" href="${base}assets/images/crochet-lamp-detail-2400.webp" data-lightbox data-caption="Crochet lamp, stitch detail" data-original="${base}assets/originals/crochet-lamp-detail.png" aria-label="Enlarge: Crochet lamp stitch detail">View the stitch detail</a></div></div></div>${crochetStudy()}<p class="making-footnote">Interactive stitch study, inspired by the carpet in progress.</p></section>`;
}
