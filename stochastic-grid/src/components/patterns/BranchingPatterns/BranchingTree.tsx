import React, { useState, useEffect, useRef } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

// Function to generate new branching lines from current lines
function iterateLines(
  lines: Line[],
  angleSpread: number,
  lengthFactor: number,
  maxLines: number
): Line[] {
  if (lines.length >= maxLines) return lines;

  const newLines: Line[] = [];
  lines.forEach(line => {
    const dx = line.end.x - line.start.x;
    const dy = line.end.y - line.start.y;
    const length = Math.sqrt(dx * dx + dy * dy) * lengthFactor;

    const angle = Math.atan2(dy, dx);

    // Create two new branches
    const angle1 = angle + (Math.random() * angleSpread * Math.PI / 180);
    const angle2 = angle - (Math.random() * angleSpread * Math.PI / 180);

    const end1 = {
      x: line.end.x + length * Math.cos(angle1),
      y: line.end.y + length * Math.sin(angle1),
    };
    const end2 = {
      x: line.end.x + length * Math.cos(angle2),
      y: line.end.y + length * Math.sin(angle2),
    };

    newLines.push({ start: line.end, end: end1 });
    newLines.push({ start: line.end, end: end2 });
  });

  return [...lines, ...newLines];
}

export default function BranchingTree() {
  const canvasWidth = 1200;   // bigger width
const canvasHeight = 800;
const center: Point = { x: canvasWidth * 0.3, y: canvasHeight * 2 / 3 }; // move start left
const initialLineLength = 100;

  const [lines, setLines] = useState<Line[]>([
  { start: center, end: { x: center.x, y: center.y - initialLineLength } }
]);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [angleSpread, setAngleSpread] = useState(30); // degrees
  const [lengthFactor, setLengthFactor] = useState(0.7); // shrink per generation
  const maxLines = 5000; // increased from 2000
  const rafRef = useRef<number>();

  const iterate = () => {
    setLines(prev => iterateLines(prev, angleSpread, lengthFactor, maxLines));
    setStep(s => s + 1);
    rafRef.current = requestAnimationFrame(iterate);
  };

  const handleReset = () => {
    setRunning(false);
    setLines([{ start: center, end: { x: center.x, y: center.y - initialLineLength } }]);
    setStep(0);
  };

  const handleRandomize = () => {
    const randomSteps = Math.floor(Math.random() * 50);
    let newLines: Line[] = [{ start: center, end: { x: center.x, y: center.y - initialLineLength } }];
    for (let i = 0; i < randomSteps; i++) {
      newLines = iterateLines(newLines, angleSpread, lengthFactor, maxLines);
    }
    setLines(newLines);
    setStep(randomSteps);
    setRunning(false);
  };

  useEffect(() => {
    if (running) {
      rafRef.current = requestAnimationFrame(iterate);
    } else if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [running, angleSpread, lengthFactor]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={canvasWidth}
        height={canvasHeight}
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "brown";
          lines.forEach(l => {
            ctx.beginPath();
            ctx.moveTo(l.start.x, l.start.y);
            ctx.lineTo(l.end.x, l.end.y);
            ctx.stroke();
          });
        }}
      />

      <div className="flex gap-2">
        <button
          onClick={() => setRunning(r => !r)}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
        <button
          onClick={handleRandomize}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Randomize
        </button>
      </div>

      <div className="flex flex-col gap-2 w-80">
        <label>
          Angle Spread: {angleSpread}°
          <input
            type="range"
            min={5}
            max={90}
            value={angleSpread}
            onChange={e => setAngleSpread(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <label>
          Length Factor: {lengthFactor.toFixed(2)}
          <input
            type="range"
            min={0.5}
            max={0.95}
            step={0.01}
            value={lengthFactor}
            onChange={e => setLengthFactor(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>
    </div>
  );
}
