import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Pulse = { radius: number; opacity: number };

export default function RadialPulses() {
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [running, setRunning] = useState(false);
  const [spawnRate, setSpawnRate] = useState(3);
  const [growth, setGrowth] = useState(3);

  useEffect(() => {
    if (!running) return;
    const id = requestAnimationFrame(() => {
      setPulses(prev => {
        const updated = prev.map(p => ({ radius: p.radius + growth, opacity: p.opacity - 0.01 })).filter(p => p.opacity > 0);
        for (let i = 0; i < spawnRate; i++) updated.push({ radius: 0, opacity: 1 });
        return updated;
      });
    });
    return () => cancelAnimationFrame(id);
  }, [running, pulses, spawnRate, growth]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600} height={600} elements={pulses as any} renderFn={(ctx, pulses) => {
          ctx.strokeStyle = "black";
          pulses.forEach((p: Pulse) => { ctx.globalAlpha = p.opacity; ctx.beginPath(); ctx.arc(300, 300, p.radius, 0, Math.PI*2); ctx.stroke(); });
          ctx.globalAlpha = 1;
        }}
      />
      <div className="flex gap-2">
        <button onClick={() => setRunning(r => !r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running ? "Pause" : "Start"}</button>
        <button onClick={() => setPulses([])} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>Spawn Rate: {spawnRate}<input type="range" min={1} max={10} value={spawnRate} onChange={e => setSpawnRate(Number(e.target.value))} className="w-80"/></label>
      <label>Growth: {growth}<input type="range" min={1} max={10} value={growth} onChange={e => setGrowth(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}
