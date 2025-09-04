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
      newLines.push({
        start: center,
        end: { x: center.x + length * Math.cos(angle) + (Math.random() - 0.5) * randomness,
               y: center.y + length * Math.sin(angle) + (Math.random() - 0.5) * randomness }
      });
    }
    setLines(newLines);
  };

  const handleReset = () => setLines([]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "red";
          lines.forEach((l) => { ctx.beginPath(); ctx.moveTo(l.start.x, l.start.y); ctx.lineTo(l.end.x, l.end.y); ctx.stroke(); });
        }}
      />
      <div className="flex gap-2">
        <button onClick={generateSunburst} className="px-3 py-1 bg-blue-500 text-white rounded">Generate Sunburst</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>
        Spokes: {spokes}
        <input type="range" min={3} max={30} value={spokes} onChange={e => setSpokes(Number(e.target.value))} className="w-80"/>
      </label>
      <label>
        Length: {length}
        <input type="range" min={50} max={400} value={length} onChange={e => setLength(Number(e.target.value))} className="w-80"/>
      </label>
      <label>
        Randomness: {randomness}
        <input type="range" min={0} max={50} value={randomness} onChange={e => setRandomness(Number(e.target.value))} className="w-80"/>
      </label>
    </div>
  );
}
