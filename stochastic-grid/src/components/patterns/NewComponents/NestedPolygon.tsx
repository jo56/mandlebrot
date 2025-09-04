import React, { useState } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

function polygonPoints(center: Point, radius: number, sides: number, rotation = 0): Point[] {
  return Array.from({ length: sides }, (_, i) => ({
    x: center.x + radius * Math.cos((i / sides) * Math.PI * 2 + rotation),
    y: center.y + radius * Math.sin((i / sides) * Math.PI * 2 + rotation),
  }));
}

export default function NestedPolygon() {
  const [lines, setLines] = useState<Line[]>([]);
  const [sides, setSides] = useState(5);
  const [layers, setLayers] = useState(5);

  const generatePolygons = () => {
    const newLines: Line[] = [];
    const center = { x: 300, y: 300 };
    const radiusStep = 200 / layers;
    for (let l = 1; l <= layers; l++) {
      const points = polygonPoints(center, radiusStep * l, sides, l * 0.1);
      for (let i = 0; i < points.length; i++) {
        newLines.push({ start: points[i], end: points[(i + 1) % points.length] });
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
          ctx.strokeStyle = "black";
          lines.forEach((l) => { ctx.beginPath(); ctx.moveTo(l.start.x, l.start.y); ctx.lineTo(l.end.x, l.end.y); ctx.stroke(); });
        }}
      />
      <div className="flex gap-2">
        <button onClick={generatePolygons} className="px-3 py-1 bg-blue-500 text-white rounded">Generate Polygons</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>
        Sides: {sides}
        <input type="range" min={1} max={50} value={sides} onChange={e => setSides(Number(e.target.value))} className="w-80"/>
      </label>
      <label>
        Layers: {layers}
        <input type="range" min={1} max={200} value={layers} onChange={e => setLayers(Number(e.target.value))} className="w-80"/>
      </label>
    </div>
  );
}
