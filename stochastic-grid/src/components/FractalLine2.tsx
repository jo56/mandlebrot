// src/components/FractalLine.tsx
import React, { useRef, useEffect, useState } from "react";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

// Initial triangle
const initialTriangle: Line[] = [
  { start: { x: 300, y: 100 }, end: { x: 500, y: 500 } },
  { start: { x: 500, y: 500 }, end: { x: 100, y: 500 } },
  { start: { x: 100, y: 500 }, end: { x: 300, y: 100 } },
];

// Function to iterate lines with random splits
function iterateLines(lines: Line[]): Line[] {
  const newLines: Line[] = [];
  lines.forEach(line => {
    const midX = (line.start.x + line.end.x) / 2;
    const midY = (line.start.y + line.end.y) / 2;
    const offset = (Math.random() - 0.5) * 40; // randomness factor

    // Create two new lines forming a "bend" at the midpoint
    newLines.push(
      { start: line.start, end: { x: midX, y: midY + offset } },
      { start: { x: midX, y: midY + offset }, end: line.end }
    );
  });
  return newLines;
}

export default function FractalLine2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lines, setLines] = useState<Line[]>(initialTriangle);

  // Render lines on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    lines.forEach(line => {
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.stroke();
    });
  }, [lines]);

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="border border-gray-400"
      />
      <div className="flex gap-2">
        <button
          onClick={() => setLines(iterateLines(lines))}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Next Iteration
        </button>
        <button
          onClick={() => setLines(initialTriangle)}
          className="px-3 py-1 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
