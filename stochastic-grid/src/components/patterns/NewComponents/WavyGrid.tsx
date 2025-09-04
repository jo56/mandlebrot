import React, { useState, useEffect } from "react";
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
        if (i < gridSize - 1) newLines.push({ start: { x, y }, end: { x: x + spacing, y: y + (Math.random() - 0.5) * randomness } });
        if (j < gridSize - 1) newLines.push({ start: { x, y }, end: { x: x + (Math.random() - 0.5) * randomness, y: y + spacing } });
      }
    }
    setLines(newLines);
  };

  const handleReset = () => setLines([]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "purple";
          lines.forEach((l) => { ctx.beginPath(); ctx.moveTo(l.start.x, l.start.y); ctx.lineTo(l.end.x, l.end.y); ctx.stroke(); });
        }}
      />
      <div className="flex gap-2">
        <button onClick={generateGrid} className="px-3 py-1 bg-blue-500 text-white rounded">Generate Grid</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>
        Randomness: {randomness}
        <input type="range" min={0} max={50} value={randomness} onChange={e => setRandomness(Number(e.target.value))} className="w-80"/>
      </label>
      <label>
        Grid Size: {gridSize}
        <input type="range" min={5} max={20} value={gridSize} onChange={e => setGridSize(Number(e.target.value))} className="w-80"/>
      </label>
    </div>
  );
}
