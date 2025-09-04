import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Square = { x: number; y: number; size: number; angle: number };

export default function RotatingSquares() {
  const [squares, setSquares] = useState<Square[]>([]);
  const [running, setRunning] = useState(false);
  const [gridSize, setGridSize] = useState(8);
  const [squareSize, setSquareSize] = useState(40);
  const [rotationSpeed, setRotationSpeed] = useState(0.05);

  useEffect(() => {
    const temp: Square[] = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        temp.push({ x: i * squareSize + squareSize/2, y: j*squareSize + squareSize/2, size: squareSize, angle: Math.random()*Math.PI*2 });
      }
    }
    setSquares(temp);
  }, [gridSize, squareSize]);

  useEffect(() => {
    if (!running) return;
    const id = requestAnimationFrame(() => {
      setSquares(prev => prev.map(s => ({ ...s, angle: s.angle + rotationSpeed })));
    });
    return () => cancelAnimationFrame(id);
  }, [running, squares, rotationSpeed]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600} height={600} elements={squares as any} renderFn={(ctx, squares) => {
          ctx.strokeStyle = "black";
          squares.forEach((s: Square) => {
            ctx.save();
            ctx.translate(s.x, s.y);
            ctx.rotate(s.angle);
            ctx.strokeRect(-s.size/2, -s.size/2, s.size, s.size);
            ctx.restore();
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={() => setRunning(r => !r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running ? "Pause" : "Start"}</button>
        <button onClick={() => setSquares([])} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <div className="flex flex-col gap-2 w-80">
        <label>Grid Size: {gridSize}<input type="range" min={2} max={20} value={gridSize} onChange={e => setGridSize(Number(e.target.value))} className="w-full"/></label>
        <label>Square Size: {squareSize}<input type="range" min={10} max={80} value={squareSize} onChange={e => setSquareSize(Number(e.target.value))} className="w-full"/></label>
        <label>Rotation Speed: {rotationSpeed.toFixed(2)}<input type="range" min={0.01} max={0.2} step={0.01} value={rotationSpeed} onChange={e => setRotationSpeed(Number(e.target.value))} className="w-full"/></label>
      </div>
    </div>
  );
}
