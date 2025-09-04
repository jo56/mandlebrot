import React, { useRef, useEffect, useState } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

export default function WavyGrid() {
  const canvasWidth = 600;
  const canvasHeight = 600;

  const [lines, setLines] = useState<Line[]>([]);
  const [running, setRunning] = useState(false);
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [amplitude, setAmplitude] = useState(20);
  const [frequency, setFrequency] = useState(0.5); // waves per row/col
  const [speed, setSpeed] = useState(0.05);

  const phaseRef = useRef(0);
  const animationRef = useRef<number>();

  const generateGrid = () => {
    const newLines: Line[] = [];
    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x1 = (j / cols) * canvasWidth;
        const x2 = ((j + 1) / cols) * canvasWidth;
        const yBase = (i / rows) * canvasHeight;

        // wave offset
        const y1 = yBase + Math.sin((j / cols) * Math.PI * 2 * frequency + phaseRef.current) * amplitude;
        const y2 = yBase + Math.sin(((j + 1) / cols) * Math.PI * 2 * frequency + phaseRef.current) * amplitude;

        newLines.push({ start: { x: x1, y: y1 }, end: { x: x2, y: y2 } });
      }
    }
    setLines(newLines);
  };

  const step = () => {
    phaseRef.current += speed;
    generateGrid();
    animationRef.current = requestAnimationFrame(step);
  };

  const handleStartPause = () => {
    if (running) {
      setRunning(false);
      cancelAnimationFrame(animationRef.current);
    } else {
      setRunning(true);
      animationRef.current = requestAnimationFrame(step);
    }
  };

  const handleReset = () => {
    setRunning(false);
    cancelAnimationFrame(animationRef.current);
    phaseRef.current = 0;
    generateGrid();
  };

  // Generate initial grid
  useEffect(() => {
    generateGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={canvasWidth}
        height={canvasHeight}
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "black";
          lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(line.start.x, line.start.y);
            ctx.lineTo(line.end.x, line.end.y);
            ctx.stroke();
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={handleStartPause} className="px-3 py-1 bg-blue-500 text-white rounded">
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">
          Reset
        </button>
      </div>
      <div className="flex flex-col gap-2 w-80">
        <label>
          Rows: {rows}
          <input type="range" min={2} max={50} value={rows} onChange={e => setRows(Number(e.target.value))} className="w-full" />
        </label>
        <label>
          Columns: {cols}
          <input type="range" min={2} max={50} value={cols} onChange={e => setCols(Number(e.target.value))} className="w-full" />
        </label>
        <label>
          Amplitude: {amplitude}
          <input type="range" min={0} max={200} value={amplitude} onChange={e => setAmplitude(Number(e.target.value))} className="w-full" />
        </label>
        <label>
          Frequency: {frequency.toFixed(2)}
          <input type="range" min={0.1} max={200} step={0.05} value={frequency} onChange={e => setFrequency(Number(e.target.value))} className="w-full" />
        </label>
        <label>
          Speed: {speed.toFixed(2)}
          <input type="range" min={0.01} max={0.5} step={0.01} value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full" />
        </label>
      </div>
    </div>
  );
}
