import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Star = { x: number; y: number; angle: number; radius: number; speed: number };

export default function RotatingStarfield() {
  const [stars, setStars] = useState<Star[]>([]);
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(150);

  useEffect(() => {
    const arr: Star[] = [];
    for (let i = 0; i < count; i++) arr.push({ x: 0, y: 0, angle: Math.random()*Math.PI*2, radius: Math.random()*250, speed: 0.01 + Math.random()*0.03 });
    setStars(arr);
  }, [count]);

  useEffect(() => {
    if (!running) return;
    const id = requestAnimationFrame(() => {
      setStars(prev => prev.map(s => ({ ...s, angle: s.angle + s.speed })));
    });
    return () => cancelAnimationFrame(id);
  }, [running, stars]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600} height={600} elements={stars as any} renderFn={(ctx, stars) => {
          ctx.fillStyle = "black";
          stars.forEach((s: Star) => {
            ctx.beginPath();
            const x = 300 + s.radius * Math.cos(s.angle);
            const y = 300 + s.radius * Math.sin(s.angle);
            ctx.arc(x, y, 2, 0, Math.PI*2);
            ctx.fill();
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={() => setRunning(r => !r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running ? "Pause" : "Start"}</button>
      </div>
      <label>Star Count: {count}<input type="range" min={50} max={30000} value={count} onChange={e => setCount(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}
