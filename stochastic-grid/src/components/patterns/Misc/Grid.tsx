import React, { useRef, useEffect, useState } from "react";

const CELL_SIZE = 10; // pixels
const GRID_SIZE = 50; // 50x50 cells
const TICK_INTERVAL = 200; // ms

// Initialize grid randomly
function makeGrid() {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => (Math.random() < 0.5 ? 1 : 0))
  );
}

function stepGrid(grid: number[][]) {
  return grid.map((row, i) =>
    row.map((cell, j) => {
      const neighbors = countNeighbors(grid, i, j);

      // Example stochastic rule:
      if (cell === 1 && Math.random() < 0.1) return 0; // random death
      if (cell === 0 && neighbors > 2 && Math.random() < 0.3) return 1; // probabilistic birth
      return cell;
    })
  );
}

function countNeighbors(grid: number[][], x: number, y: number) {
  const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];
  return dirs.reduce((sum, [dx, dy]) => {
    const nx = x + dx, ny = y + dy;
    if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
      return sum + grid[nx][ny];
    }
    return sum;
  }, 0);
}

export default function StochasticGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid, setGrid] = useState(makeGrid);
  const [running, setRunning] = useState(false);

  // Draw grid on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        ctx.fillStyle = cell ? "black" : "white";
        ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      });
    });
  }, [grid]);

  // Run simulation loop
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setGrid(g => stepGrid(g));
    }, TICK_INTERVAL);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
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
          onClick={() => setGrid(makeGrid())}
          className="px-3 py-1 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
