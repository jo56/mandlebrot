import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Line = { start: {x:number,y:number}, end: {x:number,y:number} };

export default function RotatingCircles() {
  const [lines,setLines] = useState<Line[]>([]);
  const [running,setRunning] = useState(false);
  const [circles,setCircles] = useState(5);
  const [points,setPoints] = useState(50);
  const [rotationSpeed,setRotationSpeed] = useState(0.05);
  const [phase,setPhase] = useState(0);

  useEffect(()=>{
    if(!running) return;
    const id = requestAnimationFrame(()=>{
      const newLines:Line[] = [];
      const center = {x:300,y:300};
      for(let c=1;c<=circles;c++){
        for(let i=0;i<points;i++){
          const t0 = i*2*Math.PI/points + (c%2===0?phase:-phase);
          const t1 = ((i+1)%points)*2*Math.PI/points + (c%2===0?phase:-phase);
          const r = c*30;
          const x0 = center.x + r*Math.cos(t0);
          const y0 = center.y + r*Math.sin(t0);
          const x1 = center.x + r*Math.cos(t1);
          const y1 = center.y + r*Math.sin(t1);
          newLines.push({start:{x:x0,y:y0},end:{x:x1,y:y1}});
        }
      }
      setLines(newLines);
      setPhase(p=>p+rotationSpeed);
    });
    return ()=>cancelAnimationFrame(id);
  },[running,circles,points,rotationSpeed,phase]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas width={600} height={600} elements={lines} renderFn={(ctx, lines)=>{
        ctx.strokeStyle="black";
        lines.forEach(l=>{ctx.beginPath();ctx.moveTo(l.start.x,l.start.y);ctx.lineTo(l.end.x,l.end.y);ctx.stroke();})
      }} />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
        <button onClick={()=>{setPhase(0); setLines([])}} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <div className="flex flex-col gap-2 w-80">
        <label>Circles: {circles}<input type="range" min={1} max={15} value={circles} onChange={e=>setCircles(Number(e.target.value))} className="w-full"/></label>
        <label>Points per Circle: {points}<input type="range" min={10} max={100} value={points} onChange={e=>setPoints(Number(e.target.value))} className="w-full"/></label>
        <label>Rotation Speed: {rotationSpeed.toFixed(2)}<input type="range" min={0.01} max={0.2} step={0.01} value={rotationSpeed} onChange={e=>setRotationSpeed(Number(e.target.value))} className="w-full"/></label>
      </div>
    </div>
  );
}
