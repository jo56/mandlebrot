import React, { useState, useEffect } from "react";
import SimulationCanvas from "../../utils/Canvas";

type Ripple = { radius: number };

export default function WavefrontRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [spacing, setSpacing] = useState(20);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setRipples(prev => [...prev.map(r=>({ radius: r.radius+speed })), { radius: 0 }]);
    }, 50);
    return () => clearInterval(interval);
  }, [running, ripples, speed]);

  const handleReset = () => setRipples([]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas width={600} height={600} elements={ripples as any} renderFn={(ctx, ripples) => {
        ctx.strokeStyle = "black";
        ripples.forEach((r: Ripple) => {
          ctx.beginPath();
          ctx.arc(300,300,r.radius,0,Math.PI*2);
          ctx.stroke();
        });
      }}/>
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>Speed: {speed}<input type="range" min={1} max={10} value={speed} onChange={e=>setSpeed(Number(e.target.value))} className="w-80"/></label>
      <label>Spacing: {spacing}<input type="range" min={5} max={50} value={spacing} onChange={e=>setSpacing(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}
