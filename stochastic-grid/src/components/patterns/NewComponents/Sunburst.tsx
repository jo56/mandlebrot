// src/components/Sunburst.tsx
import React, { useState } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

export default function Sunburst() {
  const [lines, setLines] = useState<Line[]>([]);
  const [spokes, setSpokes] = useState(12);
  const [length, setLength] = useState(200);
  const [randomness, setRandomness] = useState(20);

  const generateSunburst = () => {
    const newLines: Line[] = [];
    const center = { x: 300, y: 300 };
    for (let i = 0; i < spokes; i++) {
      const angle = (i / spokes) * Math.PI * 2;
      const end: Point = { x: center.x + length*Math.cos(angle) + (Math.random()-0.5)*randomness,
                           y: center.y + length*Math.sin(angle) + (Math.random()-0.5)*randomness };
      newLines.push({ start: center, end });
    }
    setLines(newLines);
  };

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
        <button onClick={generateSunburst} className="px-3 py-1 bg-green-500 text-white rounded">Generate Sunburst</button>
      </div>
      <label className="w-80">
        Randomness: {randomness}
        <input type="range" min={0} max={50} value={randomness} onChange={e => setRandomness(Number(e.target.value))} className="w-full"/>
      </label>
    </div>
  );
}
