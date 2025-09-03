import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

const initialLines: Line[] = [
  { start: { x: 100, y: 300 }, end: { x: 500, y: 300 } },
];

function iterateLines(lines: Line[], randomness: number): Line[] {
  const newLines: Line[] = [];
  lines.forEach(line => {
    const midX = (line.start.x + line.end.x) / 2;
    const midY = (line.start.y + line.end.y) / 2 + (Math.random() - 0.5) * randomness;
    newLines.push({ start: line.start, end: { x: midX, y: midY } });
    newLines.push({ start: { x: midX, y: midY }, end: line.end });
  });
  return newLines;
}

export default function ZigZagLine() {
  const [lines, setLines] = useState<Line[]>(initialLines);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [randomness, setRandomness] = useState(20);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setLines(prev => iterateLines(prev, randomness));
    }, speed);
    return () => clearInterval(interval);
  }, [running, speed, randomness]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "purple";
          lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(line.start.x, line.start.y);
            ctx.lineTo(line.end.x, line.end.y);
            ctx.stroke();
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={() => setRunning(r => !r)} className="px-3 py-1 bg-blue-500 text-white rounded">
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={() => setLines(initialLines)} className="px-3 py-1 bg-gray-500 text-white rounded">
          Reset
        </button>
      </div>
      <div className="flex flex-col gap-2 w-80">
        <label>
          Speed (ms): {speed}
          <input type="range" min={50} max={2000} value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full" />
        </label>
        <label>
          Randomness: {randomness}
          <input type="range" min={0} max={50} value={randomness} onChange={e => setRandomness(Number(e.target.value))} className="w-full" />
        </label>
      </div>
    </div>
  );
}
