import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Circle = { radius: number; opacity: number };

export default function ExpandingRings() {
  const [rings, setRings] = useState<Circle[]>([]);
  const [running, setRunning] = useState(false);
  const [spawnRate, setSpawnRate] = useState(5);
  const [growth, setGrowth] = useState(2);

  useEffect(() => {
    if (!running) return;
    const id = requestAnimationFrame(() => {
      setRings(prev => {
        const newRings = prev.map(r => ({ radius: r.radius + growth, opacity: r.opacity - 0.01 }))
                             .filter(r => r.opacity > 0);
        for (let i = 0; i < spawnRate; i++) {
          newRings.push({ radius: 0, opacity: 1 });
        }
        return newRings;
      });
    });
    return () => cancelAnimationFrame(id);
  }, [running, rings, spawnRate, growth]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600} height={600} elements={rings as any} renderFn={(ctx, rings) => {
          ctx.strokeStyle = "black";
          rings.forEach((r: Circle) => {
            ctx.beginPath();
            ctx.globalAlpha = r.opacity;
            ctx.arc(300, 300, r.radius, 0, Math.PI * 2);
            ctx.stroke();
          });
          ctx.globalAlpha = 1;
        }}
      />
      <div className="flex gap-2">
        <button onClick={() => setRunning(r => !r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running ? "Pause" : "Start"}</button>
        <button onClick={() => setRings([])} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <div className="flex flex-col gap-2 w-80">
        <label>Spawn Rate: {spawnRate}<input type="range" min={1} max={20} value={spawnRate} onChange={e => setSpawnRate(Number(e.target.value))} className="w-full"/></label>
        <label>Growth: {growth}<input type="range" min={0.5} max={5} step={0.5} value={growth} onChange={e => setGrowth(Number(e.target.value))} className="w-full"/></label>
      </div>
    </div>
  );
}
