import test from 'node:test';
import assert from 'node:assert/strict';
import {CrochetPattern,YARNS} from '../crochet-state.mjs';

test('each round keeps the yarn chosen when it was made',()=>{
  const pattern=new CrochetPattern();
  pattern.add(2);
  pattern.yarn=YARNS[1];
  pattern.add(2);
  assert.deepEqual(pattern.cells[2],[YARNS[0],YARNS[1]]);
  assert.equal(pattern.total,2);
  assert.equal(pattern.completed,0);
});
test('undo and redo restore colors; a new stitch discards the old redo branch',()=>{
  const pattern=new CrochetPattern();
  pattern.add(0);pattern.yarn=YARNS[2];pattern.add(4);
  pattern.undo();assert.equal(pattern.cells[4].length,0);
  pattern.redo();assert.deepEqual(pattern.cells[4],[YARNS[2]]);
  pattern.undo();pattern.add(1);
  assert.equal(pattern.redo(),false);
  assert.equal(pattern.total,2);
});
test('completion stops at four rounds per square and starting over can be undone',()=>{
  const pattern=new CrochetPattern();
  for(let i=0;i<24;i++) assert.ok(pattern.add());
  assert.equal(pattern.completed,6);
  assert.equal(pattern.next(),-1);
  assert.equal(pattern.add(),null);
  pattern.clear();assert.equal(pattern.total,0);
  pattern.undo();assert.equal(pattern.total,24);
});
test('a visit can resume its pattern and undo history without sharing mutable arrays',()=>{
  const pattern=new CrochetPattern();
  pattern.add(5);pattern.yarn=YARNS[1];pattern.add(5);
  const resumed=new CrochetPattern(JSON.parse(pattern.serialize()));
  resumed.undo();
  assert.deepEqual(resumed.cells[5],[YARNS[0]]);
  assert.equal(pattern.cells[5].length,2);
  resumed.redo();assert.deepEqual(resumed.cells[5],[YARNS[0],YARNS[1]]);
});
test('invalid saved colors, extra rounds and invalid indices cannot alter a pattern',()=>{
  const bad=Array.from({length:6},()=>[]);bad[0]=['url(unsafe)'];
  assert.equal(new CrochetPattern({version:2,cells:bad}).total,0);
  bad[0]=Array(5).fill(YARNS[0]);
  assert.equal(new CrochetPattern({version:2,cells:bad}).total,0);
  const pattern=new CrochetPattern();
  assert.equal(pattern.add(-1),null);assert.equal(pattern.add(9),null);
  assert.equal(pattern.undo(),false);assert.equal(pattern.redo(),false);
  assert.equal(pattern.clear(),false);
});
