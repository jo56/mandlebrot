import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Particle = { pos: Point; angle: number };

export default function FlowField() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(200);
  const [speed, setSpeed] = useState(2);
  const [angleStep, setAngleStep] = useState(0.1);

  useEffect(() => {
    setParticles(Array.from({ length: count }, () => ({
      pos: { x: Math.random() * 600, y: Math.random() * 600 },
      angle: Math.random() * Math.PI * 2
    })));
  }, [count]);

  useEffect(() => {
    if (!running) return;
    const id = requestAnimationFrame(() => {
      setParticles(prev => prev.map(p => {
        const angle = p.angle + (Math.random() - 0.5) * angleStep;
        const x = (p.pos.x + Math.cos(angle) * speed + 600) % 600;
        const y = (p.pos.y + Math.sin(angle) * speed + 600) % 600;
        return { pos: { x, y }, angle };
      }));
    });
    return () => cancelAnimationFrame(id);
  }, [running, particles, speed, angleStep]);

  const lines = particles.map(p => ({
    start: p.pos,
    end: { x: p.pos.x + Math.cos(p.angle) * 5, y: p.pos.y + Math.sin(p.angle) * 5 }
  }));

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600} height={600} elements={lines} renderFn={(ctx, lines) => {
          ctx.strokeStyle = "black";
          lines.forEach(l => { ctx.beginPath(); ctx.moveTo(l.start.x, l.start.y); ctx.lineTo(l.end.x, l.end.y); ctx.stroke(); });
        }}
      />
      <div className="flex gap-2">
        <button onClick={() => setRunning(r => !r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running ? "Pause" : "Start"}</button>
        <button onClick={() => setParticles([])} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <div className="flex flex-col gap-2 w-80">
        <label>Particle Count: {count}<input type="range" min={50} max={500} value={count} onChange={e => setCount(Number(e.target.value))} className="w-full"/></label>
        <label>Speed: {speed}<input type="range" min={0.5} max={10} step={0.5} value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full"/></label>
        <label>Angle Step: {angleStep.toFixed(2)}<input type="range" min={0.01} max={0.5} step={0.01} value={angleStep} onChange={e => setAngleStep(Number(e.target.value))} className="w-full"/></label>
      </div>
    </div>
  );
}
