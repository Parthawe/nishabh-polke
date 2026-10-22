export const YARNS = ['#785642', '#343436', '#9c836e'];
export const ROUND_NAMES = ['Center', 'Petals', 'Outer round', 'Edging'];
const fresh = () => Array.from({length:6}, () => []);
const copy = cells => cells.map(rounds => [...rounds]);
const valid = cells => Array.isArray(cells) && cells.length === 6 && cells.every(rounds => Array.isArray(rounds) && rounds.length <= 4 && rounds.every(color => YARNS.includes(color)));

export class CrochetPattern {
  constructor(saved) {
    this.cells = fresh();
    this.yarn = YARNS[0];
    this.active = 0;
    this.history = [];
    this.future = [];
    if (saved?.version === 2 && valid(saved.cells)) {
      this.cells = copy(saved.cells);
      if (YARNS.includes(saved.yarn)) this.yarn = saved.yarn;
      if (Number.isInteger(saved.active) && saved.active >= 0 && saved.active < 6) this.active = saved.active;
      this.history = Array.isArray(saved.history) ? saved.history.filter(valid).slice(-32).map(copy) : [];
      this.future = Array.isArray(saved.future) ? saved.future.filter(valid).slice(-32).map(copy) : [];
    }
  }
  get total() { return this.cells.reduce((sum, rounds) => sum + rounds.length, 0); }
  get completed() { return this.cells.filter(rounds => rounds.length === 4).length; }
  next() {
    for (let offset=0; offset<6; offset++) {
      const index=(this.active+offset)%6;
      if (this.cells[index].length<4) return index;
    }
    return -1;
  }
  remember() {
    this.history.push(copy(this.cells));
    this.history=this.history.slice(-32);
    this.future=[];
  }
  add(index=this.next()) {
    if (!Number.isInteger(index) || index<0 || index>=6 || this.cells[index].length===4) return null;
    this.remember();
    this.active=index;
    this.cells[index].push(this.yarn);
    return {index, round:this.cells[index].length-1, color:this.yarn};
  }
  restore(cells) {
    const changed=this.cells.findIndex((rounds,index)=>rounds.join()!==cells[index].join());
    if (changed>=0) this.active=changed;
    this.cells=copy(cells);
  }
  undo() {
    if (!this.history.length) return false;
    this.future.push(copy(this.cells));
    this.restore(this.history.pop());
    return true;
  }
  redo() {
    if (!this.future.length) return false;
    this.history.push(copy(this.cells));
    this.restore(this.future.pop());
    return true;
  }
  clear() {
    if (!this.total) return false;
    this.remember();
    this.cells=fresh();
    this.active=0;
    return true;
  }
  serialize() {
    return JSON.stringify({version:2,cells:this.cells,yarn:this.yarn,active:this.active,history:this.history,future:this.future});
  }
}
