import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Square = { x: number; y: number; size: number };

function subdivide(squares: Square[], jitter: number): Square[] {
  const newSquares: Square[] = [];
  squares.forEach(s => {
    const half = s.size/2;
    const offset = (Math.random()-0.5)*jitter;
    newSquares.push(
      { x: s.x + offset, y: s.y + offset, size: half },
      { x: s.x + half + offset, y: s.y + offset, size: half },
      { x: s.x + offset, y: s.y + half + offset, size: half },
      { x: s.x + half + offset, y: s.y + half + offset, size: half },
    );
  });
  return newSquares;
}

export default function RecursiveSquares() {
  const [squares, setSquares] = useState<Square[]>([{ x: 100, y: 100, size: 400 }]);
  const [running, setRunning] = useState(false);
  const [jitter, setJitter] = useState(10);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setSquares(prev => subdivide(prev, jitter)), 500);
    return () => clearInterval(interval);
  }, [running, squares, jitter]);

  const handleReset = () => setSquares([{ x: 100, y: 100, size: 400 }]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas width={600} height={600} elements={squares as any} renderFn={(ctx, squares) => {
        ctx.strokeStyle = "black";
        squares.forEach((s: Square) => { ctx.strokeRect(s.x, s.y, s.size, s.size); });
      }}/>
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>Jitter: {jitter}<input type="range" min={0} max={50} value={jitter} onChange={e=>setJitter(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}
