export const ROUND_DURATION=920;
export const STITCH_DRAW=170;
export const HOLD_INTERVAL=980;

// A continuous curve through the stitch tips keeps the hook from hopping between posts.
export function planStitchMotion(points) {
  if(!points.length)return {frames:[],delays:[]};
  if(points.length===1)return {frames:[{transform:`translate(${points[0][0]}px,${points[0][1]}px) rotate(-4deg)`,offset:0},{transform:`translate(${points[0][0]}px,${points[0][1]}px) rotate(-4deg)`,offset:1}],delays:[0]};
  const sample=(a,b,c,d,t)=>a.map((_,axis)=>.5*((2*b[axis])+(-a[axis]+c[axis])*t+(2*a[axis]-5*b[axis]+4*c[axis]-d[axis])*t*t+(-a[axis]+3*b[axis]-3*c[axis]+d[axis])*t*t*t));
  const samples=[{point:points[0],distance:0}],arrivals=[0];
  let distance=0;
  for(let i=0;i<points.length-1;i++) {
    const a=points[Math.max(0,i-1)],b=points[i],c=points[i+1],d=points[Math.min(points.length-1,i+2)];
    for(let step=1;step<=6;step++) {
      const point=sample(a,b,c,d,step/6),previous=samples.at(-1).point;
      distance+=Math.hypot(point[0]-previous[0],point[1]-previous[1]);
      samples.push({point,distance});
    }
    arrivals.push(distance);
  }
  const travel=(ROUND_DURATION-STITCH_DRAW)/ROUND_DURATION;
  const frames=samples.map(({point,distance:at})=>{
    const progress=distance?at/distance:0;
    const wrist=-4+Math.sin(progress*Math.PI*2)*2;
    return {transform:`translate(${point[0].toFixed(3)}px,${point[1].toFixed(3)}px) rotate(${wrist.toFixed(3)}deg)`,offset:progress*travel};
  });
  frames.push({transform:`translate(${points.at(-1)[0]}px,${points.at(-1)[1]}px) rotate(-4deg)`,offset:1});
  return {frames,delays:arrivals.map(at=>distance?at/distance*(ROUND_DURATION-STITCH_DRAW):0)};
}
