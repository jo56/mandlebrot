import React, { useRef, useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

export default function Spokes() {
  const canvasSize = 600;
  const center = { x: canvasSize / 2, y: canvasSize / 2 };

  const [lines, setLines] = useState<Line[]>([]);
  const [running, setRunning] = useState(false);
  const [rays, setRays] = useState(36);
  const [radius, setRadius] = useState(250);
  const [speed, setSpeed] = useState(0.02);
  const [lineWidth, setLineWidth] = useState(1);
  const [randomness, setRandomness] = useState(0);

  const rotationRef = useRef(0);
  const animationRef = useRef<number>();

  const generateSunburst = () => {
    const newLines: Line[] = [];
    for (let i = 0; i < rays; i++) {
      const angle = (i / rays) * Math.PI * 2 + rotationRef.current;
      const randomOffset = (Math.random() - 0.5) * randomness;
      const endX = center.x + (radius + randomOffset) * Math.cos(angle);
      const endY = center.y + (radius + randomOffset) * Math.sin(angle);
      newLines.push({ start: center, end: { x: endX, y: endY } });
    }
    setLines(newLines);
  };

  const step = () => {
    rotationRef.current += speed;
    generateSunburst();
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
    rotationRef.current = 0;
    generateSunburst();
  };

  useEffect(() => {
    generateSunburst();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={canvasSize}
        height={canvasSize}
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "black";
          ctx.lineWidth = lineWidth;
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
          Rays: {rays}
          <input type="range" min={3} max={100} value={rays} onChange={e => setRays(Number(e.target.value))} className="w-full"/>
        </label>
        <label>
          Radius: {radius}
          <input type="range" min={50} max={canvasSize / 2} value={radius} onChange={e => setRadius(Number(e.target.value))} className="w-full"/>
        </label>
        <label>
          Rotation Speed: {speed.toFixed(2)}
          <input type="range" min={0.01} max={0.2} step={0.01} value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full"/>
        </label>
        <label>
          Line Width: {lineWidth}
          <input type="range" min={1} max={20} value={lineWidth} onChange={e => setLineWidth(Number(e.target.value))} className="w-full"/>
        </label>
        <label>
          Line Randomness: {randomness}
          <input type="range" min={0} max={200} value={randomness} onChange={e => setRandomness(Number(e.target.value))} className="w-full"/>
        </label>
      </div>
    </div>
  );
}
