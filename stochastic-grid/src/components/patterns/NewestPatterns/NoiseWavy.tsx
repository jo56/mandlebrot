import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };

export default function NoiseWavyGrid() {
  const [running, setRunning] = useState(false);
  const [cols, setCols] = useState(20);
  const [rows, setRows] = useState(20);
  const [amplitude, setAmplitude] = useState(20);
  const [speed, setSpeed] = useState(0.05);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = requestAnimationFrame(() => setPhase(prev => prev + speed));
    return () => cancelAnimationFrame(id);
  }, [running, phase, speed]);

  const points: Point[] = [];
  for (let i=0;i<cols;i++) for (let j=0;j<rows;j++) {
    const x = 50 + i*(500/cols);
    const y = 50 + j*(500/rows) + Math.sin((i+j)/2 + phase) * amplitude;
    points.push({ x,y });
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas width={600} height={600} elements={points as any} renderFn={(ctx, points) => {
        ctx.fillStyle = "black";
        points.forEach((p: Point) => { ctx.beginPath(); ctx.arc(p.x,p.y,3,0,Math.PI*2); ctx.fill(); });
      }}/>
      <div className="flex gap-2">
        <button onClick={() => setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running ? "Pause" : "Start"}</button>
      </div>
      <label>Columns: {cols}<input type="range" min={5} max={50} value={cols} onChange={e=>setCols(Number(e.target.value))} className="w-80"/></label>
      <label>Rows: {rows}<input type="range" min={5} max={50} value={rows} onChange={e=>setRows(Number(e.target.value))} className="w-80"/></label>
      <label>Amplitude: {amplitude}<input type="range" min={0} max={100} value={amplitude} onChange={e=>setAmplitude(Number(e.target.value))} className="w-80"/></label>
      <label>Speed: {speed.toFixed(3)}<input type="range" min={0.01} max={0.2} step={0.005} value={speed} onChange={e=>setSpeed(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}
