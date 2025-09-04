import React, { useRef, useEffect } from "react";

interface SimulationCanvasProps {
  elements: any[];
  renderFn: (ctx: CanvasRenderingContext2D, elements: any[]) => void;
  width?: number;
  height?: number;
  className?: string;
}

export default function SimulationCanvas({
  elements,
  renderFn,
  width = 600,
  height = 600,
  className = "border border-gray-400",
}: SimulationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderFn(ctx, elements);
  }, [elements, renderFn, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} className={className} />;
}
