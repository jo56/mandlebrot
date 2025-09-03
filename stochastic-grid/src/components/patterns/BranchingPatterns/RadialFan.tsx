import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

const initialLines: Line[] = [
  { start: { x: 300, y: 300 }, end: { x: 300, y: 250 } },
];

function iterateLines(lines: Line[], randomness: number, spread: number): Line[] {
  const newLines: Line[] = [];
  lines.forEach(line => {
    const dx = line.end.x - line.start.x;
    const dy = line.end.y - line.start.y;
    const length = Math.sqrt(dx * dx + dy * dy) * 0.7;

    for (let angleDeg of [-spread, 0, spread]) {
      const angle = Math.atan2(dy, dx) + (angleDeg + (Math.random() - 0.5) * randomness) * (Math.PI / 180);
      const newEnd = {
        x: line.end.x + Math.cos(angle) * length,
        y: line.end.y + Math.sin(angle) * length,
      };
      newLines.push({ start: line.end, end: newEnd });
    }
  });
  return newLines;
}

export default function RadialFan() {
  const [lines, setLines] = useState<Line[]>(initialLines);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [randomness, setRandomness] = useState(10);
  const [spread, setSpread] = useState(30);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setLines(prev => iterateLines(prev, randomness, spread)), speed);
    return () => clearInterval(interval);
  }, [running, speed, randomness, spread]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "orange";
          lines.forEach(l => { ctx.beginPath(); ctx.moveTo(l.start.x, l.start.y); ctx.lineTo(l.end.x, l.end.y); ctx.stroke(); });
        }}
      />
      <div className="flex gap-2">
        <button onClick={() => setRunning(r => !r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running ? "Pause" : "Start"}</button>
        <button onClick={() => setLines(initialLines)} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <div className="flex flex-col gap-2 w-80">
        <label>Speed (ms): {speed}<input type="range" min={50} max={2000} value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full"/></label>
        <label>Randomness: {randomness}<input type="range" min={0} max={50} value={randomness} onChange={e => setRandomness(Number(e.target.value))} className="w-full"/></label>
        <label>Spread: {spread}<input type="range" min={10} max={90} value={spread} onChange={e => setSpread(Number(e.target.value))} className="w-full"/></label>
      </div>
    </div>
  );
}
