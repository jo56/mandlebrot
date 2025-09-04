import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Line = { start: { x: number; y: number }, end: { x: number; y: number } };

export default function SpiralWaves() {
  const [lines, setLines] = useState<Line[]>([]);
  const [running, setRunning] = useState(false);
  const [turns, setTurns] = useState(5);
  const [pointsPerTurn, setPointsPerTurn] = useState(100);
  const [rotationSpeed, setRotationSpeed] = useState(0.05);

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = requestAnimationFrame(() => {
      const newLines: Line[] = [];
      const center = { x: 300, y: 300 };
      const totalPoints = turns * pointsPerTurn;
      for (let i = 1; i < totalPoints; i++) {
        const t0 = (i - 1) / pointsPerTurn * 2 * Math.PI;
        const t1 = i / pointsPerTurn * 2 * Math.PI;
        const r0 = i * 2;
        const r1 = (i + 1) * 2;
        const x0 = center.x + r0 * Math.cos(t0 + phase);
        const y0 = center.y + r0 * Math.sin(t0 + phase);
        const x1 = center.x + r1 * Math.cos(t1 + phase);
        const y1 = center.y + r1 * Math.sin(t1 + phase);
        newLines.push({ start: { x: x0, y: y0 }, end: { x: x1, y: y1 } });
      }
      setLines(newLines);
      setPhase(p => p + rotationSpeed);
    });
    return () => cancelAnimationFrame(id);
  }, [running, phase, turns, pointsPerTurn, rotationSpeed]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas width={600} height={600} elements={lines} renderFn={(ctx, lines) => {
        ctx.strokeStyle = "black";
        lines.forEach(l => { ctx.beginPath(); ctx.moveTo(l.start.x, l.start.y); ctx.lineTo(l.end.x, l.end.y); ctx.stroke(); });
      }} />
      <div className="flex gap-2">
        <button onClick={() => setRunning(r => !r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running ? "Pause" : "Start"}</button>
        <button onClick={() => { setPhase(0); setLines([]); }} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <div className="flex flex-col gap-2 w-80">
        <label>Turns: {turns}<input type="range" min={1} max={20} value={turns} onChange={e => setTurns(Number(e.target.value))} className="w-full"/></label>
        <label>Points per Turn: {pointsPerTurn}<input type="range" min={10} max={200} value={pointsPerTurn} onChange={e => setPointsPerTurn(Number(e.target.value))} className="w-full"/></label>
        <label>Rotation Speed: {rotationSpeed.toFixed(2)}<input type="range" min={0.01} max={0.2} step={0.01} value={rotationSpeed} onChange={e => setRotationSpeed(Number(e.target.value))} className="w-full"/></label>
      </div>
    </div>
  );
}
