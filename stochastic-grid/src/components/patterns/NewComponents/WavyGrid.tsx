// src/components/WavyGrid.tsx
import React, { useState } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

export default function WavyGrid() {
  const [lines, setLines] = useState<Line[]>([]);
  const [gridSize, setGridSize] = useState(10);
  const [randomness, setRandomness] = useState(20);

  const generateGrid = () => {
    const newLines: Line[] = [];
    const spacing = 50;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = i * spacing;
        const y = j * spacing;
        // connect right
        if (i < gridSize - 1) {
          newLines.push({ start: {x, y}, end: {x: x + spacing, y: y + (Math.random() - 0.5)*randomness} });
        }
        // connect down
        if (j < gridSize - 1) {
          newLines.push({ start: {x, y}, end: {x: x + (Math.random() - 0.5)*randomness, y: y + spacing} });
        }
      }
    }
    setLines(newLines);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "purple";
          lines.forEach(l => { ctx.beginPath(); ctx.moveTo(l.start.x, l.start.y); ctx.lineTo(l.end.x, l.end.y); ctx.stroke(); });
        }}
      />
      <div className="flex gap-2">
        <button onClick={generateGrid} className="px-3 py-1 bg-green-500 text-white rounded">Randomize Grid</button>
      </div>
      <label className="w-80">
        Randomness: {randomness}
        <input type="range" min={0} max={50} value={randomness} onChange={e => setRandomness(Number(e.target.value))} className="w-full"/>
      </label>
    </div>
  );
}
