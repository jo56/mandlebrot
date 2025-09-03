import React, { useState, useEffect, useRef } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

export default function SpiralGrowth() {
  const canvasWidth = 600;
  const canvasHeight = 600;
  const center = { x: canvasWidth / 2, y: canvasHeight / 2 };

  const [lines, setLines] = useState<Line[]>([]);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [angleIncrement, setAngleIncrement] = useState(20); // degrees per step
  const [growthFactor, setGrowthFactor] = useState(5); // radius increase per step
  const [branchFactor, setBranchFactor] = useState(0); // optional branching
  const rafRef = useRef<number>();

  const iterate = () => {
    setLines(prev => {
      const newLines: Line[] = [...prev];
      const radius = step * growthFactor;
      const angleRad = (step * angleIncrement * Math.PI) / 180;
      const startPoint = prev.length === 0 ? center : prev[prev.length - 1].end;

      const endPoint: Point = {
        x: center.x + radius * Math.cos(angleRad),
        y: center.y + radius * Math.sin(angleRad),
      };

      newLines.push({ start: startPoint, end: endPoint });

      // Optional branching
      if (branchFactor > 0) {
        const branchAngle = Math.PI / 4; // 45°
        const branchEnd1 = {
          x: endPoint.x + radius * 0.3 * Math.cos(angleRad + branchAngle),
          y: endPoint.y + radius * 0.3 * Math.sin(angleRad + branchAngle),
        };
        const branchEnd2 = {
          x: endPoint.x + radius * 0.3 * Math.cos(angleRad - branchAngle),
          y: endPoint.y + radius * 0.3 * Math.sin(angleRad - branchAngle),
        };
        newLines.push({ start: endPoint, end: branchEnd1 });
        newLines.push({ start: endPoint, end: branchEnd2 });
      }

      return newLines;
    });
    setStep(s => s + 1);
    rafRef.current = requestAnimationFrame(iterate);
  };

  useEffect(() => {
    if (running) {
      rafRef.current = requestAnimationFrame(iterate);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [running, angleIncrement, growthFactor, branchFactor]);

  const handleReset = () => {
    setRunning(false);
    setLines([]);
    setStep(0);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        elements={lines}
        renderFn={(ctx, lines) => {
          ctx.strokeStyle = "purple";
          const path = new Path2D();
          lines.forEach(l => {
            path.moveTo(l.start.x, l.start.y);
            path.lineTo(l.end.x, l.end.y);
          });
          ctx.stroke(path);
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
      </div>

      <div className="flex flex-col gap-2 w-80">
        <label>
          Angle Increment: {angleIncrement}°
          <input
            type="range"
            min={5}
            max={45}
            value={angleIncrement}
            onChange={e => setAngleIncrement(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <label>
          Growth Factor: {growthFactor}
          <input
            type="range"
            min={1}
            max={20}
            value={growthFactor}
            onChange={e => setGrowthFactor(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <label>
          Branch Factor: {branchFactor}
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={branchFactor}
            onChange={e => setBranchFactor(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>
    </div>
  );
}
