// src/components/AnimatedPatterns.tsx
import React, { useState, useEffect, useRef } from "react";
import SimulationCanvas from "../utils/Canvas";

// -----------------------------
// 1. Growing Branches
// -----------------------------
type Branch = { start: { x: number; y: number }; end: { x: number; y: number } };
export function GrowingBranches() {
  const [branches, setBranches] = useState<Branch[]>([{ start: { x: 300, y: 500 }, end: { x: 300, y: 400 } }]);
  const [running, setRunning] = useState(false);
  const [depth, setDepth] = useState(5);
  const [angle, setAngle] = useState(Math.PI / 6);
  const [lengthFactor, setLengthFactor] = useState(0.7);

  function iterateBranches(prev: Branch[]): Branch[] {
    if (prev.length === 0) return [];
    const newBranches: Branch[] = [];
    prev.forEach(b => {
      const dx = b.end.x - b.start.x;
      const dy = b.end.y - b.start.y;
      const len = Math.sqrt(dx * dx + dy * dy) * lengthFactor;
      if (len < 2) return;
      const baseAngle = Math.atan2(dy, dx);
      const a1 = baseAngle + angle;
      const a2 = baseAngle - angle;
      newBranches.push({
        start: b.end,
        end: { x: b.end.x + Math.cos(a1) * len, y: b.end.y + Math.sin(a1) * len },
      });
      newBranches.push({
        start: b.end,
        end: { x: b.end.x + Math.cos(a2) * len, y: b.end.y + Math.sin(a2) * len },
      });
    });
    return newBranches;
  }

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setBranches(prev => iterateBranches(prev)), 500);
    return () => clearInterval(interval);
  }, [running]);

  const handleReset = () => setBranches([{ start: { x: 300, y: 500 }, end: { x: 300, y: 400 } }]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600}
        height={600}
        elements={branches as any}
        renderFn={(ctx, brs) => {
          ctx.strokeStyle = "black";
          (brs as Branch[]).forEach(b => {
            ctx.beginPath();
            ctx.moveTo(b.start.x, b.start.y);
            ctx.lineTo(b.end.x, b.end.y);
            ctx.stroke();
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={() => setRunning(r => !r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running ? "Pause" : "Start"}</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>Depth: {depth}
        <input type="range" min={1} max={10} value={depth} onChange={e => setDepth(Number(e.target.value))} className="w-80"/>
      </label>
      <label>Branch Angle: {(angle*180/Math.PI).toFixed(0)}°
        <input type="range" min={10} max={80} value={angle*180/Math.PI} onChange={e => setAngle(Number(e.target.value)*Math.PI/180)} className="w-80"/>
      </label>
      <label>Length Factor: {lengthFactor.toFixed(2)}
        <input type="range" min={0.5} max={0.9} step={0.01} value={lengthFactor} onChange={e => setLengthFactor(Number(e.target.value))} className="w-80"/>
      </label>
    </div>
  );
}

// -----------------------------
// 2. Wavy Heightmap Grid
// -----------------------------
type GridPoint = { x: number; y: number; phase: number };
export function WavyGrid() {
  const rows = 20;
  const cols = 20;
  const [points, setPoints] = useState<GridPoint[]>([]);
  const [running, setRunning] = useState(false);
  const [amplitude, setAmplitude] = useState(20);
  const [speed, setSpeed] = useState(0.05);

  useEffect(() => {
    const pts: GridPoint[] = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        pts.push({ x: i * 600 / (cols-1), y: j * 600 / (rows-1), phase: Math.random() * Math.PI * 2 });
      }
    }
    setPoints(pts);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = requestAnimationFrame(() => {
      setPoints(prev => prev.map(p => ({ ...p, phase: p.phase + speed })));
    });
    return () => cancelAnimationFrame(id);
  }, [running, points, speed]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600} height={600} elements={points as any}
        renderFn={(ctx, pts) => {
          ctx.clearRect(0,0,600,600);
          ctx.strokeStyle = "black";
          for (let i=0; i<cols; i++){
            for (let j=0; j<rows-1; j++){
              const p1 = pts[i*rows + j] as GridPoint;
              const p2 = pts[i*rows + j+1] as GridPoint;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y + Math.sin(p1.phase)*amplitude);
              ctx.lineTo(p2.x, p2.y + Math.sin(p2.phase)*amplitude);
              ctx.stroke();
            }
          }
          for (let j=0; j<rows; j++){
            for (let i=0; i<cols-1; i++){
              const p1 = pts[i*rows + j] as GridPoint;
              const p2 = pts[(i+1)*rows + j] as GridPoint;
              ctx.beginPath();
              ctx.moveTo(p1.x + Math.sin(p1.phase)*amplitude, p1.y);
              ctx.lineTo(p2.x + Math.sin(p2.phase)*amplitude, p2.y);
              ctx.stroke();
            }
          }
        }}
      />
      <div className="flex gap-2">
        <button onClick={() => setRunning(r => !r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running ? "Pause" : "Start"}</button>
      </div>
      <label>Amplitude: {amplitude}<input type="range" min={0} max={50} value={amplitude} onChange={e=>setAmplitude(Number(e.target.value))} className="w-80"/></label>
      <label>Speed: {speed.toFixed(2)}<input type="range" min={0.01} max={0.2} step={0.01} value={speed} onChange={e=>setSpeed(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}

// -----------------------------
// 3. Particle Diffusion
// -----------------------------
type Particle = { x:number, y:number, vx:number, vy:number };
export function ParticleDiffusion() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [running,setRunning] = useState(false);
  const [count,setCount] = useState(200);
  const [speed,setSpeed] = useState(2);

  useEffect(()=>{
    const arr:Particle[]=[];
    for(let i=0;i<count;i++) arr.push({x:300,y:300,vx:(Math.random()-0.5)*speed,vy:(Math.random()-0.5)*speed});
    setParticles(arr);
  },[count,speed]);

  useEffect(()=>{
    if(!running) return;
    const id = requestAnimationFrame(()=>{
      setParticles(prev=>prev.map(p=>{
        let nx = p.x+p.vx;
        let ny = p.y+p.vy;
        if(nx<0||nx>600) p.vx*=-1;
        if(ny<0||ny>600) p.vy*=-1;
        return {x:nx,y:ny,vx:p.vx,vy:p.vy};
      }));
    });
    return ()=>cancelAnimationFrame(id);
  },[running,particles]);

  const handleReset = ()=>setParticles(Array.from({length:count},()=>({x:300,y:300,vx:(Math.random()-0.5)*speed,vy:(Math.random()-0.5)*speed})));

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600} height={600} elements={particles as any}
        renderFn={(ctx, pts)=>{
          ctx.fillStyle="black";
          (pts as Particle[]).forEach(p=>{
            ctx.beginPath();
            ctx.arc(p.x,p.y,2,0,Math.PI*2);
            ctx.fill();
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>Count: {count}<input type="range" min={50} max={1000} value={count} onChange={e=>setCount(Number(e.target.value))} className="w-80"/></label>
      <label>Speed: {speed}<input type="range" min={0.5} max={5} step={0.1} value={speed} onChange={e=>setSpeed(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}

// -----------------------------
// 4. Growing Rectangular Maze
// -----------------------------
type Cell = { x:number,y:number,visited:boolean };
export function GrowingMaze() {
  const cols = 20;
  const rows = 20;
  const [cells,setCells] = useState<Cell[]>([]);
  const [running,setRunning]=useState(false);
  const [speed,setSpeed]=useState(100);

  useEffect(()=>{
    const arr:Cell[]=[];
    for(let i=0;i<cols;i++){
      for(let j=0;j<rows;j++){
        arr.push({x:i,y:j,visited:false});
      }
    }
    setCells(arr);
  },[]);

  useEffect(()=>{
    if(!running) return;
    const id = setInterval(()=>{
      setCells(prev=>{
        const unvisited = prev.filter(c=>!c.visited);
        if(unvisited.length===0) return prev;
        const c = unvisited[Math.floor(Math.random()*unvisited.length)];
        const newCells = prev.map(cell=>cell===c?{...cell,visited:true}:cell);
        return newCells;
      });
    },speed);
    return ()=>clearInterval(id);
  },[running,speed]);

  const handleReset=()=>setCells(cells.map(c=>({...c,visited:false})));

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600} height={600} elements={cells as any}
        renderFn={(ctx,cs)=>{
          ctx.fillStyle="black";
          (cs as Cell[]).forEach(c=>{
            if(c.visited) ctx.fillRect(c.x*30,c.y*30,28,28);
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>Speed: {speed}ms<input type="range" min={10} max={500} value={speed} onChange={e=>setSpeed(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}

// -----------------------------
// 5. Random Walk Lines
// -----------------------------
type Walker = { x:number,y:number,trail: {x:number,y:number}[] };
export function RandomWalkLines() {
  const [walkers,setWalkers] = useState<Walker[]>([]);
  const [running,setRunning] = useState(false);
  const [count,setCount]=useState(20);
  const [step,setStep]=useState(5);

  useEffect(()=>{
    setWalkers(Array.from({length:count},()=>({x:300,y:300,trail:[{x:300,y:300}]})));
  },[count]);

  useEffect(()=>{
    if(!running) return;
    const id = requestAnimationFrame(()=>{
      setWalkers(prev=>prev.map(w=>{
        const nx = w.x + (Math.random()*2-1)*step;
        const ny = w.y + (Math.random()*2-1)*step;
        const trail = [...w.trail,{x:nx,y:ny}].slice(-50);
        return {x:nx,y:ny,trail};
      }));
    });
    return ()=>cancelAnimationFrame(id);
  },[running,walkers,step]);

  const handleReset=()=>setWalkers(Array.from({length:count},()=>({x:300,y:300,trail:[{x:300,y:300}]})));

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas
        width={600} height={600} elements={walkers as any}
        renderFn={(ctx,ws)=>{
          ctx.strokeStyle="black";
          (ws as Walker[]).forEach(w=>{
            ctx.beginPath();
            for(let i=0;i<w.trail.length-1;i++){
              ctx.moveTo(w.trail[i].x,w.trail[i].y);
              ctx.lineTo(w.trail[i+1].x,w.trail[i+1].y);
            }
            ctx.stroke();
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>Walker Count: {count}<input type="range" min={5} max={100} value={count} onChange={e=>setCount(Number(e.target.value))} className="w-80"/></label>
      <label>Step Size: {step}<input type="range" min={1} max={20} value={step} onChange={e=>setStep(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}

// -----------------------------
// Remaining patterns 6-15 can be built using similar structures: expanding/fading circles, rippling grids, falling lines, bouncing dots, fractal leaves, noise waves, diagonal grids, expanding squares, converging points.
// -----------------------------

// -----------------------------
// 6. Expanding/Fading Circles
// -----------------------------
type ExpCircle = { x:number,y:number,radius:number,opacity:number };
export function ExpandingCircles() {
  const [circles,setCircles]=useState<ExpCircle[]>([]);
  const [running,setRunning]=useState(false);
  const [count,setCount]=useState(20);
  const [growth,setGrowth]=useState(2);

  useEffect(()=>{
    setCircles(Array.from({length:count},()=>({x:300,y:300,radius:0,opacity:1})));
  },[count]);

  useEffect(()=>{
    if(!running) return;
    const id=requestAnimationFrame(()=>{
      setCircles(prev=>prev.map(c=>{
        let r=c.radius+growth;
        let o=Math.max(0,c.opacity-0.01);
        return {x:c.x,y:c.y,radius:r,opacity:o};
      }));
    });
    return ()=>cancelAnimationFrame(id);
  },[running,circles,growth]);

  const handleReset=()=>setCircles(Array.from({length:count},()=>({x:300,y:300,radius:0,opacity:1})));

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas width={600} height={600} elements={circles as any}
        renderFn={(ctx,cirs)=>{
          (cirs as ExpCircle[]).forEach(c=>{
            ctx.beginPath();
            ctx.globalAlpha=c.opacity;
            ctx.strokeStyle="black";
            ctx.arc(c.x,c.y,c.radius,0,Math.PI*2);
            ctx.stroke();
          });
          ctx.globalAlpha=1;
        }}
      />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>Count: {count}<input type="range" min={5} max={100} value={count} onChange={e=>setCount(Number(e.target.value))} className="w-80"/></label>
      <label>Growth: {growth}<input type="range" min={0.5} max={10} step={0.1} value={growth} onChange={e=>setGrowth(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}

// -----------------------------
// 7. Rippling Grid
// -----------------------------
type RipplePoint = {x:number,y:number,phase:number};
export function RipplingGrid() {
  const cols=20; const rows=20;
  const [points,setPoints]=useState<RipplePoint[]>([]);
  const [running,setRunning]=useState(false);
  const [amplitude,setAmplitude]=useState(15);
  const [speed,setSpeed]=useState(0.05);

  useEffect(()=>{
    const pts: RipplePoint[]=[];
    for(let i=0;i<cols;i++){
      for(let j=0;j<rows;j++){
        pts.push({x:i*600/(cols-1),y:j*600/(rows-1),phase:Math.random()*Math.PI*2});
      }
    }
    setPoints(pts);
  },[]);

  useEffect(()=>{
    if(!running) return;
    const id=requestAnimationFrame(()=>{
      setPoints(prev=>prev.map(p=>({...p,phase:p.phase+speed})));
    });
    return ()=>cancelAnimationFrame(id);
  },[running,points,speed]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas width={600} height={600} elements={points as any}
        renderFn={(ctx,pts)=>{
          ctx.clearRect(0,0,600,600);
          ctx.strokeStyle="black";
          for(let i=0;i<cols-1;i++){
            for(let j=0;j<rows-1;j++){
              const p=pts[i*rows+j] as RipplePoint;
              const nx=pts[(i+1)*rows+j] as RipplePoint;
              const ny=pts[i*rows+j+1] as RipplePoint;
              ctx.beginPath();
              ctx.moveTo(p.x,p.y+Math.sin(p.phase)*amplitude);
              ctx.lineTo(nx.x,nx.y+Math.sin(nx.phase)*amplitude);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(p.x+Math.sin(p.phase)*amplitude,p.y);
              ctx.lineTo(ny.x+Math.sin(ny.phase)*amplitude,ny.y);
              ctx.stroke();
            }
          }
        }}
      />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
      </div>
      <label>Amplitude: {amplitude}<input type="range" min={0} max={50} value={amplitude} onChange={e=>setAmplitude(Number(e.target.value))} className="w-80"/></label>
      <label>Speed: {speed.toFixed(2)}<input type="range" min={0.01} max={0.2} step={0.01} value={speed} onChange={e=>setSpeed(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}

// -----------------------------
// 8. Falling Lines
// -----------------------------
type FallingLine = {x:number,y:number,length:number,vy:number};
export function FallingLines() {
  const [lines,setLines]=useState<FallingLine[]>([]);
  const [running,setRunning]=useState(false);
  const [count,setCount]=useState(100);
  const [speed,setSpeed]=useState(2);

  useEffect(()=>{
    setLines(Array.from({length:count},()=>({x:Math.random()*600,y:Math.random()*-600,length:10+Math.random()*20,vy:1+Math.random()*speed})));
  },[count,speed]);

  useEffect(()=>{
    if(!running) return;
    const id=requestAnimationFrame(()=>{
      setLines(prev=>prev.map(l=>{
        let y=l.y+l.vy;
        if(y>600) y=-l.length;
        return {...l,y};
      }));
    });
    return ()=>cancelAnimationFrame(id);
  },[running,lines,speed]);

  const handleReset=()=>setLines(Array.from({length:count},()=>({x:Math.random()*600,y:Math.random()*-600,length:10+Math.random()*20,vy:1+Math.random()*speed})));

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas width={600} height={600} elements={lines as any}
        renderFn={(ctx,lins)=>{
          ctx.strokeStyle="black";
          (lins as FallingLine[]).forEach(l=>{
            ctx.beginPath();
            ctx.moveTo(l.x,l.y);
            ctx.lineTo(l.x,l.y+l.length);
            ctx.stroke();
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>Count: {count}<input type="range" min={10} max={500} value={count} onChange={e=>setCount(Number(e.target.value))} className="w-80"/></label>
      <label>Speed: {speed}<input type="range" min={0.5} max={10} step={0.1} value={speed} onChange={e=>setSpeed(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}

// -----------------------------
// 9. Bouncing Dots
// -----------------------------
type BounceDot={x:number,y:number,vx:number,vy:number};
export function BouncingDots(){
  const [dots,setDots]=useState<BounceDot[]>([]);
  const [running,setRunning]=useState(false);
  const [count,setCount]=useState(50);
  const [speed,setSpeed]=useState(2);

  useEffect(()=>{
    setDots(Array.from({length:count},()=>({x:Math.random()*600,y:Math.random()*600,vx:(Math.random()-0.5)*speed,vy:(Math.random()-0.5)*speed})));
  },[count,speed]);

  useEffect(()=>{
    if(!running) return;
    const id=requestAnimationFrame(()=>{
      setDots(prev=>prev.map(d=>{
        let nx=d.x+d.vx;
        let ny=d.y+d.vy;
        let nvx=d.vx;
        let nvy=d.vy;
        if(nx<0||nx>600) nvx*=-1;
        if(ny<0||ny>600) nvy*=-1;
        return {x:nx,y:ny,vx:nvx,vy:nvy};
      }));
    });
    return ()=>cancelAnimationFrame(id);
  },[running,dots]);

  const handleReset=()=>setDots(Array.from({length:count},()=>({x:Math.random()*600,y:Math.random()*600,vx:(Math.random()-0.5)*speed,vy:(Math.random()-0.5)*speed})));

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas width={600} height={600} elements={dots as any}
        renderFn={(ctx,ds)=>{
          ctx.fillStyle="black";
          (ds as BounceDot[]).forEach(d=>{
            ctx.beginPath();
            ctx.arc(d.x,d.y,3,0,Math.PI*2);
            ctx.fill();
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>Count: {count}<input type="range" min={5} max={200} value={count} onChange={e=>setCount(Number(e.target.value))} className="w-80"/></label>
      <label>Speed: {speed}<input type="range" min={0.5} max={10} step={0.1} value={speed} onChange={e=>setSpeed(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}

// -----------------------------
// 10. Fractal Leaves (branching lines downward)
// -----------------------------
type Leaf={start:{x:number,y:number},end:{x:number,y:number}};
export function FractalLeaves(){
  const [leaves,setLeaves]=useState<Leaf[]>([{start:{x:300,y:0},end:{x:300,y:50}}]);
  const [running,setRunning]=useState(false);
  const [angle,setAngle]=useState(Math.PI/8);
  const [factor,setFactor]=useState(0.7);

  function iterate(prev:Leaf[]):Leaf[]{
    const newLeaves:Leaf[]=[];
    prev.forEach(l=>{
      const dx=l.end.x-l.start.x;
      const dy=l.end.y-l.start.y;
      const len=Math.sqrt(dx*dx+dy*dy)*factor;
      if(len<2) return;
      const baseAngle=Math.atan2(dy,dx);
      [angle,-angle].forEach(a=>{
        newLeaves.push({
          start:l.end,
          end:{x:l.end.x+Math.cos(baseAngle+a)*len,y:l.end.y+Math.sin(baseAngle+a)*len}
        });
      });
    });
    return newLeaves;
  }

  useEffect(()=>{
    if(!running) return;
    const interval=setInterval(()=>setLeaves(prev=>[...prev,...iterate(prev)]),500);
    return ()=>clearInterval(interval);
  },[running]);

  const handleReset=()=>setLeaves([{start:{x:300,y:0},end:{x:300,y:50}}]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas width={600} height={600} elements={leaves as any}
        renderFn={(ctx,ls)=>{
          ctx.strokeStyle="black";
          (ls as Leaf[]).forEach(l=>{
            ctx.beginPath();
            ctx.moveTo(l.start.x,l.start.y);
            ctx.lineTo(l.end.x,l.end.y);
            ctx.stroke();
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>Angle: {(angle*180/Math.PI).toFixed(0)}°<input type="range" min={5} max={45} value={angle*180/Math.PI} onChange={e=>setAngle(Number(e.target.value)*Math.PI/180)} className="w-80"/></label>
      <label>Factor: {factor.toFixed(2)}<input type="range" min={0.5} max={0.9} step={0.01} value={factor} onChange={e=>setFactor(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}

// -----------------------------
// 11. Noise Waves
// -----------------------------
type NoisePoint = {x:number,y:number,phase:number};
export function NoiseWaves() {
  const cols=100;
  const [points,setPoints]=useState<NoisePoint[]>([]);
  const [running,setRunning]=useState(false);
  const [amplitude,setAmplitude]=useState(20);
  const [frequency,setFrequency]=useState(0.1);

  useEffect(()=>{
    setPoints(Array.from({length:cols},(_,i)=>({x:i*600/cols,y:300,phase:Math.random()*Math.PI*2})));
  },[cols]);

  useEffect(()=>{
    if(!running) return;
    const id=requestAnimationFrame(()=>{
      setPoints(prev=>prev.map(p=>({...p,phase:p.phase+frequency})));
    });
    return ()=>cancelAnimationFrame(id);
  },[running,points,frequency]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas width={600} height={600} elements={points as any}
        renderFn={(ctx,pts)=>{
          ctx.strokeStyle="black";
          ctx.beginPath();
          (pts as NoisePoint[]).forEach((p,i)=>{
            const y=300+Math.sin(p.phase)*amplitude;
            if(i===0) ctx.moveTo(p.x,y);
            else ctx.lineTo(p.x,y);
          });
          ctx.stroke();
        }}
      />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
      </div>
      <label>Amplitude: {amplitude}<input type="range" min={5} max={100} value={amplitude} onChange={e=>setAmplitude(Number(e.target.value))} className="w-80"/></label>
      <label>Frequency: {frequency.toFixed(2)}<input type="range" min={0.01} max={0.2} step={0.01} value={frequency} onChange={e=>setFrequency(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}

// -----------------------------
// 12. Diagonal Grid
// -----------------------------
type GridLine = {x1:number,y1:number,x2:number,y2:number};
export function DiagonalGrid() {
  const [lines,setLines]=useState<GridLine[]>([]);
  const [running,setRunning]=useState(false);
  const [spacing,setSpacing]=useState(50);
  const [speed,setSpeed]=useState(1);

  useEffect(()=>{
    const lns:GridLine[]=[];
    for(let x=-600;x<1200;x+=spacing){
      lns.push({x1:x,y1:0,x2:x+600,y2:600});
    }
    setLines(lns);
  },[spacing]);

  useEffect(()=>{
    if(!running) return;
    const id=requestAnimationFrame(()=>{
      setLines(prev=>prev.map(l=>({x1:l.x1+speed,y1:l.y1,x2:l.x2+speed,y2:l.y2})));
    });
    return ()=>cancelAnimationFrame(id);
  },[running,lines,speed]);

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas width={600} height={600} elements={lines as any}
        renderFn={(ctx,lns)=>{
          ctx.strokeStyle="black";
          (lns as GridLine[]).forEach(l=>{
            ctx.beginPath();
            ctx.moveTo(l.x1,l.y1);
            ctx.lineTo(l.x2,l.y2);
            ctx.stroke();
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
      </div>
      <label>Spacing: {spacing}<input type="range" min={10} max={100} value={spacing} onChange={e=>setSpacing(Number(e.target.value))} className="w-80"/></label>
      <label>Speed: {speed}<input type="range" min={0.1} max={5} step={0.1} value={speed} onChange={e=>setSpeed(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}

// -----------------------------
// 13. Expanding Squares
// -----------------------------
type Square={x:number,y:number,size:number};
export function ExpandingSquares() {
  const [squares,setSquares]=useState<Square[]>([]);
  const [running,setRunning]=useState(false);
  const [count,setCount]=useState(20);
  const [growth,setGrowth]=useState(3);

  useEffect(()=>{
    setSquares(Array.from({length:count},()=>({x:300,y:300,size:0})));
  },[count]);

  useEffect(()=>{
    if(!running) return;
    const id=requestAnimationFrame(()=>{
      setSquares(prev=>prev.map(s=>({...s,size:s.size+growth})));
    });
    return ()=>cancelAnimationFrame(id);
  },[running,squares,growth]);

  const handleReset=()=>setSquares(Array.from({length:count},()=>({x:300,y:300,size:0})));

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas width={600} height={600} elements={squares as any}
        renderFn={(ctx,sqs)=>{
          ctx.strokeStyle="black";
          (sqs as Square[]).forEach(s=>{
            ctx.strokeRect(s.x-s.size/2,s.y-s.size/2,s.size,s.size);
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>Count: {count}<input type="range" min={5} max={50} value={count} onChange={e=>setCount(Number(e.target.value))} className="w-80"/></label>
      <label>Growth: {growth}<input type="range" min={1} max={10} value={growth} onChange={e=>setGrowth(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}

// -----------------------------
// 14. Converging Points
// -----------------------------
type ConvPoint={x:number,y:number};
export function ConvergingPoints() {
  const [points,setPoints]=useState<ConvPoint[]>([]);
  const [running,setRunning]=useState(false);
  const [count,setCount]=useState(100);
  const [speed,setSpeed]=useState(2);

  useEffect(()=>{
    setPoints(Array.from({length:count},()=>({x:Math.random()*600,y:Math.random()*600})));
  },[count]);

  useEffect(()=>{
    if(!running) return;
    const id=requestAnimationFrame(()=>{
      setPoints(prev=>prev.map(p=>{
        const dx=300-p.x;
        const dy=300-p.y;
        const dist=Math.sqrt(dx*dx+dy*dy)||1;
        return {x:p.x+dx/dist*speed,y:p.y+dy/dist*speed};
      }));
    });
    return ()=>cancelAnimationFrame(id);
  },[running,points,speed]);

  const handleReset=()=>setPoints(Array.from({length:count},()=>({x:Math.random()*600,y:Math.random()*600})));

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas width={600} height={600} elements={points as any}
        renderFn={(ctx,pts)=>{
          ctx.fillStyle="black";
          (pts as ConvPoint[]).forEach(p=>{
            ctx.beginPath();
            ctx.arc(p.x,p.y,2,0,Math.PI*2);
            ctx.fill();
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>Count: {count}<input type="range" min={10} max={500} value={count} onChange={e=>setCount(Number(e.target.value))} className="w-80"/></label>
      <label>Speed: {speed}<input type="range" min={0.1} max={10} step={0.1} value={speed} onChange={e=>setSpeed(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}

// -----------------------------
// 15. Random Line Network
// -----------------------------
type RandLine={start:ConvPoint,end:ConvPoint};
export function RandomLineNetwork() {
  const [lines,setLines]=useState<RandLine[]>([]);
  const [running,setRunning]=useState(false);
  const [count,setCount]=useState(50);

  useEffect(()=>{
    setLines(Array.from({length:count},()=>({
      start:{x:Math.random()*600,y:Math.random()*600},
      end:{x:Math.random()*600,y:Math.random()*600}
    })));
  },[count]);

  useEffect(()=>{
    if(!running) return;
    const id=requestAnimationFrame(()=>{
      setLines(prev=>prev.map(l=>({
        start:{x:l.start.x+(Math.random()-0.5)*2,y:l.start.y+(Math.random()-0.5)*2},
        end:{x:l.end.x+(Math.random()-0.5)*2,y:l.end.y+(Math.random()-0.5)*2}
      })));
    });
    return ()=>cancelAnimationFrame(id);
  },[running,lines]);

  const handleReset=()=>setLines(Array.from({length:count},()=>({
    start:{x:Math.random()*600,y:Math.random()*600},
    end:{x:Math.random()*600,y:Math.random()*600}
  })));

  return (
    <div className="flex flex-col items-center gap-4">
      <SimulationCanvas width={600} height={600} elements={lines as any}
        renderFn={(ctx,lns)=>{
          ctx.strokeStyle="black";
          (lns as RandLine[]).forEach(l=>{
            ctx.beginPath();
            ctx.moveTo(l.start.x,l.start.y);
            ctx.lineTo(l.end.x,l.end.y);
            ctx.stroke();
          });
        }}
      />
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-blue-500 text-white rounded">{running?"Pause":"Start"}</button>
        <button onClick={handleReset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
      </div>
      <label>Line Count: {count}<input type="range" min={10} max={200} value={count} onChange={e=>setCount(Number(e.target.value))} className="w-80"/></label>
    </div>
  );
}
