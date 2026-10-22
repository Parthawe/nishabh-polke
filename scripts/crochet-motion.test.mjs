import test from 'node:test';
import assert from 'node:assert/strict';
import {planStitchMotion,ROUND_DURATION,STITCH_DRAW,HOLD_INTERVAL} from '../crochet-motion.mjs';

test('hook travel stays continuous through a turn, with ordered stitch arrivals',()=>{
 const points=[[0,0],[10,0],[20,0],[20,10],[20,20]];
 const {frames,delays}=planStitchMotion(points);
 assert.equal(frames[0].offset,0);assert.equal(frames.at(-1).offset,1);
 assert.equal(delays[0],0);assert.equal(delays.at(-1),ROUND_DURATION-STITCH_DRAW);
 assert.ok(frames.every((f,i)=>Number.isFinite(f.offset)&&(!i||f.offset>=frames[i-1].offset)));
 assert.ok(delays.every((d,i)=>!i||d>=delays[i-1]));
 const xy=frames.map(f=>f.transform.match(/translate\(([-.\d]+)px,([-.\d]+)px/).slice(1).map(Number));
 assert.ok(xy.every(([x,y])=>x>=-2&&x<=22&&y>=-2&&y<=22));
 assert.ok(xy.slice(1).every(([x,y],i)=>Math.hypot(x-xy[i][0],y-xy[i][1])<3));
 assert.ok(HOLD_INTERVAL>ROUND_DURATION);
});
test('stationary and empty paths cannot produce invalid animation values',()=>{
 for(const points of [[],[[2,3]],[[2,3],[2,3],[2,3]]]) {
  const result=planStitchMotion(points);
  assert.ok(result.frames.every(f=>Number.isFinite(f.offset)&&!f.transform.includes('NaN')));
  assert.ok(result.delays.every(Number.isFinite));
 }
});
