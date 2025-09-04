import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };

export default function NoiseLandscape() {
  const [points, setPoints] = useState<Point[]>([]);
  const [running, setRunning] = useState(false);
  const [amplitude, setAmplitude] = useState(50);
  const [frequency, setFrequency] = useState(0.1);
  const [speed, setSpeed] = useState(0.05);

  useEffect(() => {
    const initial: Point[] = [];
    for (let x = 0; x <= 600; x += 5) initial.push({ x, y: 300 });
    setPoints(initial);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = requestAnimationFrame(() => {
      setPoints(prev => prev.map(p => ({ x: p.x, y: 300 + Math.sin(p.x * frequency + Date.now() * speed) * amplitude })));
    });
    return () => cancelAnimationFrame(id);
  }, [running, points, amplitude, frequency, speed]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600} height={400} elements={points as any} renderFn={(ctx, points) => {
          ctx.strokeStyle = "black";
          ctx.beginPath();
          points.forEach((p: Point, i: number) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
          ctx.stroke();
        }}
      />
      <div className="flex gap-2">
        <button onClick={() => setRunning(r => !r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running ? "Pause" : "Start"}</button>
      </div>
      <label>Amplitude: {amplitude}<input type="range" min={10} max={200} value={amplitude} onChange={e => setAmplitude(Number(e.target.value))} className="w-80"/></label>
      <label>Frequency: {frequency.toFixed(2)}<input type="range" min={0.01} max={0.5} step={0.01} value={frequency} onChange={e => setFrequency(Number(e.target.value))} className="w-80"/></label>
      <label>Speed: {speed.toFixed(2)}<input type="range" min={0.01} max={0.2} step={0.01} value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}
