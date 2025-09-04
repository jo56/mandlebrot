import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

const initialLines: Line[] = [
  { start: { x: 300, y: 300 }, end: { x: 300, y: 250 } },
];

function iterateLines(lines: Line[], randomness: number, branches: number): Line[] {
  const newLines: Line[] = [];
  lines.forEach(line => {
    const dx = line.end.x - line.start.x;
    const dy = line.end.y - line.start.y;
    const length = Math.sqrt(dx * dx + dy * dy) * 0.7;

    for (let i = 0; i < branches; i++) {
      const angle = Math.atan2(dy, dx) + (i * 360 / branches + (Math.random() - 0.5) * randomness) * (Math.PI / 180);
      const newEnd = { x: line.end.x + Math.cos(angle) * length, y: line.end.y + Math.sin(angle) * length };
      newLines.push({ start: line.end, end: newEnd });
    }
  });
  return newLines;
}

export default function RecursiveStar() {
  const [lines, setLines] = useState<Line[]>(initialLines);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [randomness, setRandomness] = useState(10);
  const [branches, setBranches] = useState(4);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setLines(prev => iterateLines(prev, randomness, branches)), speed);
    return () => clearInterval(interval);
  }, [running, speed, randomness, branches]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "red";
          lines.forEach(l => { ctx.beginPath(); ctx.moveTo(l.start.x, l.start.y); ctx.lineTo(l.end.x, l.end.y); ctx.stroke(); });
        }}
      />
      <div className="flex gap-2">
  <button
    onClick={() => setRunning(r => !r)}
    className="px-3 py-1 bg-blue-500 text-white rounded"
  >
    {running ? "Pause" : "Start"}
  </button>
  <button
    onClick={() => setLines(initialLines)}
    className="px-3 py-1 bg-gray-500 text-white rounded"
  >
    Reset
  </button>
    <button
    onClick={() => {
      const maxSteps = 8; // stars grow really fast!
      const randomSteps = Math.floor(Math.random() * maxSteps) + 2;
      let newLines: Line[] = initialLines;

      for (let i = 0; i < randomSteps; i++) {
        newLines = iterateLines(newLines, randomness, branches);
        if (newLines.length > 10000) break; // prevent browser freeze
      }

      setLines(newLines);
      setRunning(false);
    }}
    className="px-3 py-1 bg-green-500 text-white rounded"
  >
    Randomize
  </button>

</div>

      <div className="flex flex-col gap-2 w-80">
        <label>Speed (ms): {speed}<input type="range" min={50} max={2000} value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full"/></label>
        <label>Randomness: {randomness}<input type="range" min={0} max={50} value={randomness} onChange={e => setRandomness(Number(e.target.value))} className="w-full"/></label>
        <label>Branches: {branches}<input type="range" min={2} max={8} value={branches} onChange={e => setBranches(Number(e.target.value))} className="w-full"/></label>
      </div>
    </div>
  );
}
