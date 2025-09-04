import React, { useRef, useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };

export default function FractalTree() {
  const [lines, setLines] = useState<Line[]>([]);
  const [running, setRunning] = useState(false);
  const [angle, setAngle] = useState(Math.PI / 6);
  const [depth, setDepth] = useState(5);
  const [length, setLength] = useState(100);

  const generateTree = () => {
    const newLines: Line[] = [];
    const drawBranch = (start: Point, len: number, ang: number, d: number) => {
      if (d === 0) return;
      const end = { x: start.x + Math.cos(ang) * len, y: start.y - Math.sin(ang) * len };
      newLines.push({ start, end });
      drawBranch(end, len * 0.7, ang + angle, d - 1);
      drawBranch(end, len * 0.7, ang - angle, d - 1);
    };
    drawBranch({ x: 300, y: 600 }, length, Math.PI / 2, depth);
    setLines(newLines);
  };

  useEffect(() => { if (running) generateTree(); }, [running, angle, depth, length]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600} height={600} elements={lines}
        renderFn={(ctx, lines)=>{
          ctx.strokeStyle="black";
          lines.forEach(l=>{ ctx.beginPath(); ctx.moveTo(l.start.x,l.start.y); ctx.lineTo(l.end.x,l.end.y); ctx.stroke(); })
        }}
      />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
        <button onClick={()=>setLines([])} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <div className="flex flex-col gap-2 w-80">
        <label>Angle: {(angle*180/Math.PI).toFixed(0)}°<input type="range" min={5} max={90} value={angle*180/Math.PI} onChange={e=>setAngle(Number(e.target.value)*Math.PI/180)} className="w-full"/></label>
        <label>Depth: {depth}<input type="range" min={1} max={17} value={depth} onChange={e=>setDepth(Number(e.target.value))} className="w-full"/></label>
        <label>Length: {length}<input type="range" min={50} max={200} value={length} onChange={e=>setLength(Number(e.target.value))} className="w-full"/></label>
      </div>
    </div>
  );
}
