import React, { useRef, useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

export default function AnimatedWavyGrid() {
  const [running, setRunning] = useState(false);
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [amplitude, setAmplitude] = useState(20);
  const [frequency, setFrequency] = useState(0.05);
  const [lines, setLines] = useState<{start:{x:number,y:number},end:{x:number,y:number}}[]>([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!running) return;
    const interval = requestAnimationFrame(() => {
      setTime(t => t + 0.1);
      const newLines = [];
      const width = 600;
      const height = 600;
      for (let i = 0; i <= rows; i++) {
        for (let j = 0; j <= cols; j++) {
          const x = (width/cols)*j;
          const y = (height/rows)*i + Math.sin(j*frequency + time) * amplitude;
          if (j>0) newLines.push({start:{x:(width/cols)*(j-1),y:(height/rows)*i + Math.sin((j-1)*frequency + time)*amplitude}, end:{x,y}});
          if (i>0) newLines.push({start:{x:x,y:(height/rows)*(i-1) + Math.sin(j*frequency + time)*amplitude}, end:{x,y}});
        }
      }
      setLines(newLines);
      requestAnimationFrame(() => {});
    });
    return () => cancelAnimationFrame(interval);
  }, [running, time, rows, cols, amplitude, frequency]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600}
        height={600}
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "black";
          lines.forEach(l => {
            ctx.beginPath();
            ctx.moveTo(l.start.x, l.start.y);
            ctx.lineTo(l.end.x, l.end.y);
            ctx.stroke();
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running ? "Pause":"Start"}</button>
        <button onClick={()=>setTime(0)} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <div className="flex flex-col gap-2 w-80">
        <label>Rows: {rows}<input type="range" min={2} max={200} value={rows} onChange={e=>setRows(Number(e.target.value))} className="w-full"/></label>
        <label>Cols: {cols}<input type="range" min={2} max={200} value={cols} onChange={e=>setCols(Number(e.target.value))} className="w-full"/></label>
        <label>Amplitude: {amplitude}<input type="range" min={0} max={200} value={amplitude} onChange={e=>setAmplitude(Number(e.target.value))} className="w-full"/></label>
        <label>Frequency: {frequency.toFixed(2)}<input type="range" min={0.01} max={1} step={0.01} value={frequency} onChange={e=>setFrequency(Number(e.target.value))} className="w-full"/></label>
      </div>
    </div>
  );
}
