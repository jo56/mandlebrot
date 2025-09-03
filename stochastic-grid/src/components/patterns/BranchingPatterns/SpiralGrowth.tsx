import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

const initialLines: Line[] = [
  { start: { x: 300, y: 300 }, end: { x: 300, y: 280 } },
];

function iterateLines(lines: Line[], randomness: number, rotation: number): Line[] {
  const newLines: Line[] = [];
  lines.forEach(line => {
    const dx = line.end.x - line.start.x;
    const dy = line.end.y - line.start.y;
    const length = Math.sqrt(dx*dx + dy*dy) * 0.9;

    const angle = Math.atan2(dy, dx) + rotation * (Math.PI / 180) + (Math.random() - 0.5) * randomness * (Math.PI / 180);
    const newEnd = { x: line.end.x + Math.cos(angle) * length, y: line.end.y + Math.sin(angle) * length };
    newLines.push({ start: line.end, end: newEnd });
  });
  return newLines;
}

export default function SpiralGrowth() {
  const [lines, setLines] = useState<Line[]>(initialLines);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [randomness, setRandomness] = useState(5);
  const [rotation, setRotation] = useState(20);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setLines(prev => iterateLines(prev, randomness, rotation)), speed);
    return () => clearInterval(interval);
  }, [running, speed, randomness, rotation]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "blue";
          lines.forEach(l => { ctx.beginPath(); ctx.moveTo(l.start.x, l.start.y); ctx.lineTo(l.end.x, l.end.y); ctx.stroke(); });
        }}
      />
      <div className="flex gap-2">
        <button onClick={() => setRunning(r => !r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running ? "Pause" : "Start"}</button>
        <button onClick={() => setLines(initialLines)} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <div className="flex flex-col gap
