import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

function iterateBranches(lines: Line[], angleRange: number, lengthFactor: number, randomness: number): Line[] {
  const newLines: Line[] = [];
  lines.forEach(line => {
    const dx = line.end.x - line.start.x;
    const dy = line.end.y - line.start.y;
    const length = Math.sqrt(dx*dx + dy*dy) * lengthFactor;
    const baseAngle = Math.atan2(dy, dx);

    [-1, 1].forEach(dir => {
      const angle = baseAngle + dir * (Math.random() * angleRange);
      const nx = line.end.x + Math.cos(angle) * length + (Math.random()-0.5)*randomness;
      const ny = line.end.y + Math.sin(angle) * length + (Math.random()-0.5)*randomness;
      newLines.push({ start: line.end, end: { x: nx, y: ny } });
    });
  });
  return newLines;
}

export default function GrowingBranches() {
  const [lines, setLines] = useState<Line[]>([{ start: { x: 300, y: 600 }, end: { x: 300, y: 500 } }]);
  const [running, setRunning] = useState(false);
  const [angleRange, setAngleRange] = useState(Math.PI/4);
  const [lengthFactor, setLengthFactor] = useState(0.7);
  const [randomness, setRandomness] = useState(5);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setLines(prev => iterateBranches(prev, angleRange, lengthFactor, randomness)), 400);
    return () => clearInterval(interval);
  }, [running, lines, angleRange, lengthFactor, randomness]);

  const handleReset = () => setLines([{ start: { x: 300, y: 600 }, end: { x: 300, y: 500 } }]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600} height={600} elements={lines} renderFn={(ctx, lines) => {
          ctx.strokeStyle = "black";
          lines.forEach(l => { ctx.beginPath(); ctx.moveTo(l.start.x,l.start.y); ctx.lineTo(l.end.x,l.end.y); ctx.stroke(); });
        }}
      />
      <div className="flex gap-2">
        <button onClick={() => setRunning(r => !r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running ? "Pause" : "Start"}</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>Branch Angle Range: {angleRange.toFixed(2)}<input type="range" min={0} max={Math.PI/2} step={0.01} value={angleRange} onChange={e => setAngleRange(Number(e.target.value))} className="w-80"/></label>
      <label>Length Factor: {lengthFactor.toFixed(2)}<input type="range" min={0.5} max={0.9} step={0.01} value={lengthFactor} onChange={e => setLengthFactor(Number(e.target.value))} className="w-80"/></label>
      <label>Randomness: {randomness}<input type="range" min={0} max={20} value={randomness} onChange={e => setRandomness(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}
