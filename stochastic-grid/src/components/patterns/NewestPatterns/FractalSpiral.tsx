import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

function iterateSpiral(lines: Line[], randomness: number): Line[] {
  const newLines: Line[] = [];
  lines.forEach(line => {
    const midX = (line.start.x + line.end.x) / 2;
    const midY = (line.start.y + line.end.y) / 2;
    const offset = (Math.random() - 0.5) * randomness;
    newLines.push(
      { start: line.start, end: { x: midX + offset, y: midY + offset } },
      { start: { x: midX + offset, y: midY + offset }, end: line.end }
    );
  });
  return newLines;
}

export default function FractalSpiral() {
  const [lines, setLines] = useState<Line[]>([{ start: { x: 300, y: 300 }, end: { x: 500, y: 300 } }]);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [randomness, setRandomness] = useState(20);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setLines(prev => iterateSpiral(prev, randomness)), speed);
    return () => clearInterval(interval);
  }, [running, speed, randomness]);

  const handleReset = () => setLines([{ start: { x: 300, y: 300 }, end: { x: 500, y: 300 } }]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600} height={600} elements={lines} renderFn={(ctx, lines) => {
          ctx.strokeStyle = "black";
          lines.forEach(line => { ctx.beginPath(); ctx.moveTo(line.start.x, line.start.y); ctx.lineTo(line.end.x, line.end.y); ctx.stroke(); });
        }}
      />
      <div className="flex gap-2">
        <button onClick={() => setRunning(r => !r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running ? "Pause" : "Start"}</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>Randomness: {randomness}<input type="range" min={0} max={50} value={randomness} onChange={e => setRandomness(Number(e.target.value))} className="w-80"/></label>
      <label>Speed (ms): {speed}<input type="range" min={10} max={500} value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}
