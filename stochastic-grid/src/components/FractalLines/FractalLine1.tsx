// src/components/FractalLine1.tsx
import React, { useRef, useEffect, useState } from "react";
import SimulationCanvas from "../Utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

// Initial line for FractalLine1
const initialLines: Line[] = [
  { start: { x: 100, y: 300 }, end: { x: 600, y: 300 } }
];

// Function to iterate lines with randomness
function iterateLines(
  lines: Line[],
  randomness: number,
  lengthFactor: number
): Line[] {
  const newLines: Line[] = [];
  lines.forEach(line => {
    const midX = (line.start.x + line.end.x) / 2;
    const midY = (line.start.y + line.end.y) / 2;

    // Random offset perpendicular to line
    const dx = line.end.x - line.start.x;
    const dy = line.end.y - line.start.y;
    const perpX = -dy;
    const perpY = dx;
    const norm = Math.sqrt(perpX * perpX + perpY * perpY) || 1;

    const offset = ((Math.random() - 0.5) * randomness);
    const newMid = {
      x: midX + (perpX / norm) * offset,
      y: midY + (perpY / norm) * offset
    };

    // Shorten lines by lengthFactor
    newLines.push(
      { start: line.start, end: newMid },
      { start: newMid, end: line.end }
    );
  });
  return newLines;
}

export default function FractalLine1() {
  const [lines, setLines] = useState<Line[]>(initialLines);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(300); // ms per iteration
  const [randomness, setRandomness] = useState(40); 
  const [lengthFactor, setLengthFactor] = useState(1); // optional for future tweaks

  // Animation loop
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setLines(prev => iterateLines(prev, randomness, lengthFactor));
    }, speed);
    return () => clearInterval(interval);
  }, [running, speed, randomness, lengthFactor]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "black";
          lines.forEach((line: Line) => {
            ctx.beginPath();
            ctx.moveTo(line.start.x, line.start.y);
            ctx.lineTo(line.end.x, line.end.y);
            ctx.stroke();
          });
        }}
      />

      <div className="flex gap-2">
        <button
          onClick={() => setRunning(r => !r)}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          {running ? "Pause" : "Resume"}
        </button>
        <button
          onClick={() => setLines(initialLines)}
          className="px-3 py-1 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-col gap-2 w-80">
        <label>
          Iteration Speed (ms): {speed}
          <input
            type="range"
            min={50}
            max={2000}
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          Randomness: {randomness}
          <input
            type="range"
            min={0}
            max={100}
            value={randomness}
            onChange={e => setRandomness(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          Line Length Factor: {lengthFactor.toFixed(2)}
          <input
            type="range"
            min={0.1}
            max={2}
            step={0.05}
            value={lengthFactor}
            onChange={e => setLengthFactor(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>
    </div>
  );
}
