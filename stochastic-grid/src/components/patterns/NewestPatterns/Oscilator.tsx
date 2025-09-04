import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Line = { start: {x:number,y:number}, end: {x:number,y:number} };

export default function Oscilator() {
  const [lines, setLines] = useState<Line[]>([]);
  const [running, setRunning] = useState(false);
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [amplitude, setAmplitude] = useState(20);
  const [frequency, setFrequency] = useState(0.2);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if(!running) return;
    const id = requestAnimationFrame(()=>{
      const newLines: Line[] = [];
      for(let r=0; r<rows; r++){
        for(let c=0; c<cols; c++){
          const x0 = c*(600/cols);
          const y0 = r*(600/rows) + Math.sin(c*frequency + phase)*amplitude;
          const x1 = (c+1)*(600/cols);
          const y1 = r*(600/rows) + Math.sin((c+1)*frequency + phase)*amplitude;
          newLines.push({start:{x:x0,y:y0},end:{x:x1,y:y1}});
        }
      }
      setLines(newLines);
      setPhase(p=>p+0.1);
    });
    return ()=>cancelAnimationFrame(id);
  }, [running, rows, cols, amplitude, frequency, phase]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas width={600} height={600} elements={lines} renderFn={(ctx, lines)=>{
        ctx.strokeStyle="black";
        lines.forEach(l=>{ ctx.beginPath(); ctx.moveTo(l.start.x,l.start.y); ctx.lineTo(l.end.x,l.end.y); ctx.stroke(); })
      }} />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
        <button onClick={()=>{setPhase(0); setLines([])}} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <div className="flex flex-col gap-2 w-80">
        <label>Rows: {rows}<input type="range" min={2} max={30} value={rows} onChange={e=>setRows(Number(e.target.value))} className="w-full"/></label>
        <label>Cols: {cols}<input type="range" min={2} max={30} value={cols} onChange={e=>setCols(Number(e.target.value))} className="w-full"/></label>
        <label>Amplitude: {amplitude}<input type="range" min={0} max={100} value={amplitude} onChange={e=>setAmplitude(Number(e.target.value))} className="w-full"/></label>
        <label>Frequency: {frequency.toFixed(2)}<input type="range" min={0.05} max={1} step={0.01} value={frequency} onChange={e=>setFrequency(Number(e.target.value))} className="w-full"/></label>
      </div>
    </div>
  );
}
