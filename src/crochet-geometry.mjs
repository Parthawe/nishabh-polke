// An illustrated granny-square structure: clustered posts, chain joins, braided edging.
// This is a stitch study, not a counted crochet pattern or a replica of the carpet.
const n=value=>Number(value.toFixed(2));
const point=(x,y,angle,cx,cy)=>[n(cx+x*Math.cos(angle)-y*Math.sin(angle)),n(cy+x*Math.sin(angle)+y*Math.cos(angle))];
import {readFile} from 'node:fs/promises';
const fiber='data:image/jpeg;base64,'+(await readFile(new URL('../assets/images/yarn-fiber-texture.jpg',import.meta.url))).toString('base64');
const yarns=['#785642','#343436','#9c836e'];
export const yarnStyle=`.yarn-body,.yarn-soft,.yarn-grain,.yarn-ply,.yarn-wrap{fill:none;stroke-linecap:round;stroke-linejoin:round}.yarn-soft{stroke:currentColor;stroke-width:5.4;stroke-opacity:.12}.yarn-body{stroke:currentColor;stroke-width:3.8}.yarn-grain{stroke:var(--yarn-material);stroke-width:3.5}.yarn-ply{stroke:#f5eee8;stroke-width:.85;stroke-opacity:.28;transform:translate(-.25px,-.3px)}.yarn-wrap{stroke:currentColor;stroke-width:1.8}.yarn-wrap-light{stroke:#f5eee8;stroke-width:.65;stroke-opacity:.32}.crochet-stitch{pointer-events:none}`;
export function yarnMaterial(id) {
  return `<defs>${yarns.map((color,i)=>{
    const rgb=[1,3,5].map(offset=>parseInt(color.slice(offset,offset+2),16)/255);
    const row=channel=>`.09567 .32184 .03249 0 ${n(channel-.2475)}`;
    return `<filter id="${id}-tint-${i}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${rgb.map(row).join(' ')} 0 0 0 1 0"/></filter><pattern id="${id}-fiber-${i}" patternUnits="userSpaceOnUse" width="28" height="28"><image href="${fiber}" width="28" height="28" preserveAspectRatio="none" filter="url(#${id}-tint-${i})"/></pattern>`;
  }).join('')}</defs>`;
}
function strand(d,wrap='') {
  return `<path class="yarn-soft" d="${d}" pathLength="1"/><path class="yarn-body" d="${d}" pathLength="1"/><path class="yarn-grain" d="${d}" pathLength="1"/><path class="yarn-ply" d="${d}"/>${wrap?`<path class="yarn-wrap" d="${wrap}"/><path class="yarn-wrap yarn-wrap-light" d="${wrap}"/>`:''}`;
}
function stitch(x,y,rotation,body,wrap,cx,cy) {
  const softness=Math.sin(x*1.7+y*.8+cx*.3)*.22;
  const tip=point(x+softness,y+softness*.7,rotation,cx,cy);
  rotation+=softness*.07;
  return `<g class="crochet-stitch" data-yarn-stitch data-tip-x="${tip[0]}" data-tip-y="${tip[1]}" transform="translate(${tip.join(' ')}) rotate(${n(rotation*180/Math.PI)})">${strand(body,wrap)}</g>`;
}
export function grannySquare(cx,cy,index) {
  const rounds=[];
  for(let ring=0;ring<3;ring++) {
    const radius=14+ring*14,centers=Array.from({length:ring+1},(_,i)=>(i-ring/2)*28);
    const pieces=[];
    for(let side=0;side<4;side++) {
      const angle=side*Math.PI/2;
      for(const center of centers) {
        // Three posts converge in a shared space; their heads form interlocking V's.
        for(let post=0;post<3;post++) {
          const spread=(post-1)*5.2,foot=-spread*.66,height=(ring===0?10:13)+Math.sin(post*2+side+index)*.25;
          const d=`M -2.2 .5 C -3.3 3.6 ${n(foot-2.1)} ${n(height-3.3)} ${n(foot-1)} ${n(height-.7)} Q ${n(foot)} ${n(height+.6)} ${n(foot+1)} ${n(height-.7)} C ${n(foot+2.1)} ${n(height-3)} 3.4 3.3 2.2 .5 M -3.4 -.9 C -1.2 1.7 1.7 2.1 3.5 -.6`;
          const wrap=`M -2.2 4.1 Q -.1 6.2 2.1 3.6 M -1.5 7 Q .1 8.3 1.4 6.3`;
          pieces.push(stitch(center+spread,-radius,angle,d,wrap,cx,cy));
        }
        if(center!==centers.at(-1)) {
          // A single open chain spans the space between neighbouring clusters.
          pieces.push(stitch(center+14,-radius+1,angle,'M -7 0 Q 0 5.2 7 0 M -5 .7 Q 0 6.4 5 .7','',cx,cy));
        }
      }
      // Two chain links turn the corner, leaving a clear space for the next round.
      const corner=radius-2.4;
      pieces.push(stitch(corner,-radius+1,angle,'M -3 -.5 Q .5 -1.6 3 1.2 M -2 .6 Q .6 3 3 1.2','',cx,cy));
      pieces.push(stitch(radius-1,-corner,angle,'M -1.2 -3 Q 1.6 -.5 .5 3 M -1.2 -3 Q -3 -.6 -.6 2','',cx,cy));
    }
    rounds.push(`<g class="crochet-round" data-round="${ring}">${pieces.join('')}</g>`);
  }
  const edge=[];
  for(let side=0;side<4;side++)for(let j=0;j<20;j++) {
    const x=-44+j*4.6;
    edge.push(stitch(x,-48,side*Math.PI/2,'M -2 -1.2 Q -.8 1.8 1.9 2.2 Q 1.8 -.3 -1.2 -1.4 M -1.5 1 Q -.7 3.2 2.2 3.1','',cx,cy));
  }
  rounds.push(`<g class="crochet-round" data-round="3">${edge.join('')}</g>`);
  return `<g class="crochet-patch" data-patch="${index}"><rect class="patch-hit-area" x="${cx-53}" y="${cy-53}" width="106" height="106" rx="12"/>${rounds.join('')}<rect class="yarn-border" x="${cx-48}" y="${cy-48}" width="96" height="96" rx="4"/><text class="square-number" x="${cx}" y="${cy+5}" text-anchor="middle" aria-hidden="true">${index+1}</text></g>`;
}
