import React, { useRef, useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

const initialLine: Line = { start: { x: 300, y: 300 }, end: { x: 500, y: 300 } };
const MAX_LINES = 5000; // cap total lines

function iterateSpiral(lines: Line[], randomness: number, maxLines: number): Line[] {
  if (lines.length >= maxLines) return lines;
  const newLines: Line[] = [];
  for (let line of lines) {
    const midX = (line.start.x + line.end.x) / 2;
    const midY = (line.start.y + line.end.y) / 2;
    const offset = (Math.random() - 0.5) * randomness;
    newLines.push(
      { start: line.start, end: { x: midX + offset, y: midY + offset } },
      { start: { x: midX + offset, y: midY + offset }, end: line.end }
    );
    if (newLines.length >= maxLines) break;
  }
  return newLines;
}

export default function FractalSpiral() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<Line[]>([initialLine]);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(100); // delay in ms
  const [randomness, setRandomness] = useState(20);
  const [tick, setTick] = useState(0); // used to trigger redraw

  // Draw lines directly to canvas
  const drawLines = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    linesRef.current.forEach(line => {
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.stroke();
    });
  };

  // Animation loop
  useEffect(() => {
    if (!running) return;
    let animationId: number;

    const animate = () => {
      linesRef.current = iterateSpiral(linesRef.current, randomness, MAX_LINES);
      drawLines();
      animationId = window.setTimeout(() => {
        if (running) requestAnimationFrame(animate);
      }, speed);
    };

    requestAnimationFrame(animate);

    return () => window.clearTimeout(animationId);
  }, [running, randomness, speed]);

  const handleReset = () => {
    linesRef.current = [initialLine];
    drawLines();
    setRunning(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="border border-gray-400"
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
      </div>

      <div className="flex flex-col gap-2 w-80">
        <label>
          Randomness: {randomness}
          <input
            type="range"
            min={0}
            max={50}
            value={randomness}
            onChange={e => setRandomness(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <label>
          Speed (ms): {speed}
          <input
            type="range"
            min={10}
            max={500}
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>
    </div>
  );
}
