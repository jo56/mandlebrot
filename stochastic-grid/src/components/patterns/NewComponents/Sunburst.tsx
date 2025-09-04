import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

export default function Sunburst() {
  const [lines, setLines] = useState<Line[]>([]);
  const [layers, setLayers] = useState(5);
  const [branches, setBranches] = useState(3);
  const [baseLength, setBaseLength] = useState(100);
  const [randomness, setRandomness] = useState(20);

  const center = { x: 300, y: 300 };

  const generateSunburst = () => {
    const newLines: Line[] = [];

    const generateLayer = (start: Point, angle: number, length: number, depth: number) => {
      if (depth <= 0) return;
      const end = {
        x: start.x + length * Math.cos(angle),
        y: start.y + length * Math.sin(angle),
      };
      newLines.push({ start, end });

      for (let i = 0; i < branches; i++) {
        const subAngle = angle + (Math.random() - 0.5) * 0.5;
        const subLength = length * (0.5 + Math.random() * 0.5);
        generateLayer(end, subAngle, subLength, depth - 1);
      }
    };

    for (let i = 0; i < layers * branches; i++) {
      const angle = (i / (layers * branches)) * Math.PI * 2;
      const length = baseLength + (Math.random() - 0.5) * randomness;
      generateLayer(center, angle, length, layers);
    }

    setLines(newLines);
  };

  const handleReset = () => setLines([]);
  const handleRandomize = () => {
    setRandomness(Math.random() * 40);
    setBaseLength(80 + Math.random() * 40);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "black";
          lines.forEach(l => {
            ctx.beginPath();
            ctx.moveTo(l.start.x, l.start.y);
            ctx.lineTo(l.end.x, l.end.y);
            ctx.stroke();
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={generateSunburst} className="px-3 py-1 bg-blue-500 text-white rounded">Generate</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
        <button onClick={handleRandomize} className="px-3 py-1 bg-green-500 text-white rounded">Randomize</button>
      </div>
      <div className="flex flex-col gap-2 w-80">
        <label>Layers: {layers}
          <input type="range" min={1} max={10} value={layers} onChange={e => setLayers(Number(e.target.value))} className="w-full"/>
        </label>
        <label>Branches: {branches}
          <input type="range" min={1} max={5} value={branches} onChange={e => setBranches(Number(e.target.value))} className="w-full"/>
        </label>
        <label>Base Length: {baseLength}
          <input type="range" min={50} max={200} value={baseLength} onChange={e => setBaseLength(Number(e.target.value))} className="w-full"/>
        </label>
        <label>Randomness: {randomness}
          <input type="range" min={0} max={50} value={randomness} onChange={e => setRandomness(Number(e.target.value))} className="w-full"/>
        </label>
      </div>
    </div>
  );
}
