// src/components/KochSnowflake.tsx
import React, { useState, useEffect, useRef } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

// Initial triangle for Koch snowflake
const initialTriangle: Line[] = [
  { start: { x: 300, y: 100 }, end: { x: 500, y: 500 } },
  { start: { x: 500, y: 500 }, end: { x: 100, y: 500 } },
  { start: { x: 100, y: 500 }, end: { x: 300, y: 100 } },
];

function iterateLines(lines: Line[], randomness: number): Line[] {
  const newLines: Line[] = [];
  lines.forEach(line => {
    const { start, end } = line;
    const dx = end.x - start.x;
    const dy = end.y - start.y;

    const p1 = { x: start.x + dx / 3, y: start.y + dy / 3 };
    const p2 = { x: start.x + dx * 2 / 3, y: start.y + dy * 2 / 3 };

    // Calculate peak of triangle with random offset
    const angle = Math.atan2(dy, dx) - Math.PI / 3;
    const length = Math.sqrt(dx*dx + dy*dy) / 3;
    const offset = (Math.random() - 0.5) * randomness;
    const peak = { x: p1.x + length * Math.cos(angle), y: p1.y + length * Math.sin(angle) + offset };

    newLines.push(
      { start, end: p1 },
      { start: p1, end: peak },
      { start: peak, end: p2 },
      { start: p2, end }
    );
  });
  return newLines;
}

export default function KochSnowflake() {
  const [lines, setLines] = useState<Line[]>(initialTriangle);
  const [randomness, setRandomness] = useState(20);

  const handleRandomize = () => {
    let newLines = [...initialTriangle];
    const steps = Math.floor(Math.random() * 4) + 2; // 2–5 iterations
    for (let i = 0; i < steps; i++) {
      newLines = iterateLines(newLines, randomness);
    }
    setLines(newLines);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "black";
          lines.forEach(l => { ctx.beginPath(); ctx.moveTo(l.start.x, l.start.y); ctx.lineTo(l.end.x, l.end.y); ctx.stroke(); });
        }}
      />
      <div className="flex gap-2">
        <button onClick={handleRandomize} className="px-3 py-1 bg-green-500 text-white rounded">Randomize</button>
      </div>
      <label className="w-80">
        Randomness: {randomness}
        <input type="range" min={0} max={50} value={randomness} onChange={e => setRandomness(Number(e.target.value))} className="w-full"/>
      </label>
    </div>
  );
}
