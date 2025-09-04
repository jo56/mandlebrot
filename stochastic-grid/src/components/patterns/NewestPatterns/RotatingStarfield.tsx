import React, { useState, useEffect, useRef } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Star = { x: number; y: number; angle: number; radius: number; speed: number };

export default function RotatingStarfield() {
  const [stars, setStars] = useState<Star[]>([]);
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(150);
  const [rotationSpeed, setRotationSpeed] = useState(0.00001); // global rotation speed
  const starsRef = useRef<Star[]>([]);

  // Initialize stars
  useEffect(() => {
    const arr: Star[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: 0,
        y: 0,
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 250,
        speed: 0.005 + Math.random() * 0.00001, // base star speed
      });
    }
    starsRef.current = arr;
    setStars([...arr]);
  }, [count]);

  // Animation loop
  useEffect(() => {
    if (!running) return;

    let animationId: number;

    const animate = () => {
      starsRef.current = starsRef.current.map(s => ({
        ...s,
        angle: s.angle + s.speed + rotationSpeed, // add global rotation speed
      }));
      setStars([...starsRef.current]);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [running, rotationSpeed]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600}
        height={600}
        elements={stars as any}
        renderFn={(ctx, stars) => {
          ctx.fillStyle = "black";
          stars.forEach((s: Star) => {
            ctx.beginPath();
            const x = 300 + s.radius * Math.cos(s.angle);
            const y = 300 + s.radius * Math.sin(s.angle);
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
          });
        }}
      />

      <div className="flex gap-2">
        <button
          onClick={() => setRunning(r => !r)}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          {running ? "Pause" : "Start"}
        </button>
      </div>

      <label>
        Star Count: {count}
        <input
          type="range"
          min={50}
          max={30000}
          value={count}
          onChange={e => setCount(Number(e.target.value))}
          className="w-80"
        />
      </label>

      <label>
        Rotation Speed: {rotationSpeed.toFixed(3)}
        <input
          type="range"
          min={0}
          max={0.1}
          step={0.001}
          value={rotationSpeed}
          onChange={e => setRotationSpeed(Number(e.target.value))}
          className="w-80"
        />
      </label>
    </div>
  );
}
