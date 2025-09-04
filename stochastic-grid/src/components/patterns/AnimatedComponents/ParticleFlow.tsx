import React, { useRef, useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Particle = {x:number,y:number,angle:number};

export default function ParticleFlow() {
  const [particles,setParticles] = useState<Particle[]>([]);
  const [running,setRunning] = useState(false);
  const [count,setCount] = useState(200);
  const [speed,setSpeed] = useState(2);
  const [lines,setLines] = useState<{start:{x:number,y:number},end:{x:number,y:number}}[]>([]);

  useEffect(()=>{
    if (particles.length===0) {
      const arr:Particle[] = [];
      for(let i=0;i<count;i++) arr.push({x:Math.random()*600,y:Math.random()*600,angle:Math.random()*Math.PI*2});
      setParticles(arr);
    }
  },[particles,count]);

  useEffect(()=>{
    if(!running) return;
    const id = requestAnimationFrame(()=>{
      const newParticles = particles.map(p=>{
        const angle = p.angle + (Math.random()-0.5)*0.1;
        const newX = (p.x + Math.cos(angle)*speed + 600)%600;
        const newY = (p.y + Math.sin(angle)*speed + 600)%600;
        return {x:newX,y:newY,angle};
      });
      const newLines = newParticles.map((p,i)=>({start:{x:p.x,y:p.y},end:{x:newParticles[i-1<0?0:i-1].x,y:newParticles[i-1<0?0:i-1].y}}));
      setParticles(newParticles);
      setLines(newLines);
    });
    return ()=>cancelAnimationFrame(id);
  },[running, particles, speed]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600} height={600} elements={lines}
        renderFn={(ctx,lines)=>{
          ctx.strokeStyle="black";
          lines.forEach(l=>{ctx.beginPath();ctx.moveTo(l.start.x,l.start.y);ctx.lineTo(l.end.x,l.end.y);ctx.stroke();})
        }}
      />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
        <button onClick={()=>{setParticles([]); setLines([])}} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <div className="flex flex-col gap-2 w-80">
        <label>Count: {count}<input type="range" min={1} max={500} value={count} onChange={e=>setCount(Number(e.target.value))} className="w-full"/></label>
        <label>Speed: {speed}<input type="range" min={0.1} max={100} step={0.1} value={speed} onChange={e=>setSpeed(Number(e.target.value))} className="w-full"/></label>
      </div>
    </div>
  );
}
