// src/components/NestedPolygon.tsx
import React, { useState } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

function polygonPoints(center: Point, radius: number, sides: number, rotation = 0): Point[] {
  return Array.from({ length: sides }, (_, i) => {
    const angle = (i / sides) * Math.PI * 2 + rotation;
    return { x: center.x + radius * Math.cos(angle), y: center.y + radius * Math.sin(angle) };
  });
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
      const points = polygonPoints(center, radiusStep*l, sides, l*0.1);
      for (let i = 0; i < points.length; i++) {
        newLines.push({ start: points[i], end: points[(i+1) % points.length] });
      }
    }
    setLines(newLines);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "orange";
          lines.forEach(l => { ctx.beginPath(); ctx.moveTo(l.start.x, l.start.y); ctx.lineTo(l.end.x, l.end.y); ctx.stroke(); });
        }}
      />
      <div className="flex gap-2">
        <button onClick={generatePolygons} className="px-3 py-1 bg-green-500 text-white rounded">Generate Nested Polygons</button>
      </div>
    </div>
  );
}
