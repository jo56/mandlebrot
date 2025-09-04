import React, { useRef, useEffect, useState } from "react";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

// Initial triangle
const initialTriangle: Line[] = [
  { start: { x: 300, y: 100 }, end: { x: 500, y: 500 } },
  { start: { x: 500, y: 500 }, end: { x: 100, y: 500 } },
  { start: { x: 100, y: 500 }, end: { x: 300, y: 100 } },
];

// Function to iterate lines with midpoint offset
function iterateLines(lines: Line[], randomness: number, lineRandomness: number): Line[] {
  const newLines: Line[] = [];
  lines.forEach(line => {
    const midX = (line.start.x + line.end.x) / 2;
    const midY = (line.start.y + line.end.y) / 2;
    const offset = (Math.random() - 0.5) * randomness;

    // create midpoint with offset
    let mid = { x: midX, y: midY + offset };

    // optionally jitter start and end points per line
    const jitterStart = {
      x: line.start.x + (Math.random() - 0.5) * lineRandomness,
      y: line.start.y + (Math.random() - 0.5) * lineRandomness,
    };
    const jitterEnd = {
      x: line.end.x + (Math.random() - 0.5) * lineRandomness,
      y: line.end.y + (Math.random() - 0.5) * lineRandomness,
    };

    newLines.push(
      { start: jitterStart, end: mid },
      { start: mid, end: jitterEnd }
    );
  });
  return newLines;
}

export default function Triangle1() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lines, setLines] = useState<Line[]>(initialTriangle);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(500); // ms per iteration
  const [randomness, setRandomness] = useState(40); // midpoint offset
  const [lineRandomness, setLineRandomness] = useState(10); // jitter per line

  const handleRandomize = () => {
    const maxSteps = 5;
    const randomSteps = Math.floor(Math.random() * maxSteps) + 2;
    let newLines = [...initialTriangle];
    for (let i = 0; i < randomSteps; i++) {
      newLines = iterateLines(newLines, randomness, lineRandomness);
      if (newLines.length > 10000) break;
    }
    setLines(newLines);
    setRunning(false);
  };

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

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setLines(prev => iterateLines(prev, randomness, lineRandomness));
    }, speed);
    return () => clearInterval(interval);
  }, [running, speed, randomness, lineRandomness]);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas ref={canvasRef} width={600} height={600} className="border border-gray-400" />
      <div className="flex gap-2">
        <button onClick={() => setRunning(r => !r)} className="px-3 py-1 bg-blue-500 text-white rounded">
          {running ? "Pause" : "Resume"}
        </button>
        <button onClick={() => setLines(initialTriangle)} className="px-3 py-1 bg-gray-500 text-white rounded">
          Reset
        </button>
        <button onClick={handleRandomize} className="px-3 py-1 bg-green-500 text-white rounded">
          Randomize
        </button>
      </div>
      <div className="flex flex-col gap-2 w-80">
        <label>
          Iteration Speed (ms): {speed}
          <input type="range" min={50} max={2000} value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full" />
        </label>
        <label>
          Midpoint Randomness: {randomness}
          <input type="range" min={0} max={100} value={randomness} onChange={e => setRandomness(Number(e.target.value))} className="w-full" />
        </label>
        <label>
          Line Randomness: {lineRandomness}
          <input type="range" min={0} max={50} value={lineRandomness} onChange={e => setLineRandomness(Number(e.target.value))} className="w-full" />
        </label>
      </div>
    </div>
  );
}
