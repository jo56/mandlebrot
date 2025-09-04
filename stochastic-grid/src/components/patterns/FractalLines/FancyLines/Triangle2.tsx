import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

// Updated initial triangle coordinates for 600x600 canvas
const initialLines: Line[] = [
  { start: { x: 150, y: 500 }, end: { x: 450, y: 500 } },
  { start: { x: 450, y: 500 }, end: { x: 300, y: 150 } },
  { start: { x: 300, y: 150 }, end: { x: 150, y: 500 } },
];

function iterateLines(lines: Line[], randomness: number, lengthFactor: number): Line[] {
  const newLines: Line[] = [];
  lines.forEach(line => {
    const midX = (line.start.x + line.end.x) / 2;
    const midY = (line.start.y + line.end.y) / 2;
    const offsetX = (Math.random() - 0.5) * randomness;
    const offsetY = (Math.random() - 0.5) * randomness;

    const newMid = {
      x: midX + offsetX * lengthFactor,
      y: midY + offsetY * lengthFactor
    };

    newLines.push({ start: line.start, end: newMid }, { start: newMid, end: line.end });
  });
  return newLines;
}

export default function FractalTriangle() {
  const [lines, setLines] = useState<Line[]>(initialLines);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [randomness, setRandomness] = useState(40);
  const [lengthFactor, setLengthFactor] = useState(1);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setLines(prev => iterateLines(prev, randomness, lengthFactor));
    }, speed);
    return () => clearInterval(interval);
  }, [running, speed, randomness, lengthFactor]);

  const handleRandomize = () => {
    const steps = Math.floor(Math.random() * 5) + 2; // 2–6 iterations
    let newLines = [...initialLines];
    for (let i = 0; i < steps; i++) {
      newLines = iterateLines(newLines, randomness, lengthFactor);
      if (newLines.length > 10000) break;
    }
    setLines(newLines);
    setRunning(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "black";
          lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(line.start.x, line.start.y);
            ctx.lineTo(line.end.x, line.end.y);
            ctx.stroke();
          });
        }}
        width={600}
        height={600}
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
          onClick={handleRandomize}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Randomize
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
