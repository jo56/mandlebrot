import React, { useState } from "react";
import SimulationCanvas from "./canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

// Example iteration function for FractalLine1
function iterateLines(lines: Line[]): Line[] {
  const newLines: Line[] = [];
  lines.forEach(line => {
    const midX = (line.start.x + line.end.x) / 2;
    const midY = (line.start.y + line.end.y) / 2;
    const offset = (Math.random() - 0.5) * 40;

    newLines.push(
      { start: line.start, end: { x: midX, y: midY + offset } },
      { start: { x: midX, y: midY + offset }, end: line.end }
    );
  });
  return newLines;
}

export const FractalLine1 = () => {
  const [lines, setLines] = useState<Line[]>([{ start: { x: 300, y: 300 }, end: { x: 400, y: 300 } }]);

  return (
    <div>
      <SimulationCanvas
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "black";
          lines.forEach((line: Line) => {
            ctx.beginPath();
            ctx.moveTo(line.start.x, line.start.y);
            ctx.lineTo(line.end.x, line.end.y);
            ctx.stroke();
          });
        }}
      />
      <button onClick={() => setLines(iterateLines(lines))}>Next Iteration</button>
      <button onClick={() => setLines([{ start: { x: 300, y: 300 }, end: { x: 400, y: 300 } }])}>Reset</button>
    </div>
  );
};
