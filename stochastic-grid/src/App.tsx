import React, { useState } from "react";
import StochasticGrid from "./components/patterns/Misc/Grid";
import FractalLine1 from "./components/patterns/FractalLines/FractalLine1";
import FractalLine2 from "./components/patterns/FractalLines/FractalLine2";
import Triangle1 from "./components/patterns/FractalLines/Triangle1";
import FractalTriangle from "./components/patterns/FractalLines/FancyLines/Triangle2";
import ZigZagLine from "./components/patterns/FractalLines/FancyLines/ZigZagLine";
import BranchingTree from "./components/patterns/BranchingPatterns/BranchingTree";

// New patterns
import RadialFan from "./components/patterns/BranchingPatterns/RadialFan";
import RecursiveStar from "./components/patterns/BranchingPatterns/RecursiveStar";
import SpiralGrowth from "./components/patterns/BranchingPatterns/SpiralGrowth";

export default function App() {
  type Simulation =
    | "grid"
    | "fractal1"
    | "fractal2"
    | "fractal3"
    | "triangle"
    | "zigzag"
    | "tree"
    | "radial"
    | "star"
    | "spiral"
    | "leaf";

  const [sim, setSim] = useState<Simulation>("grid");

  return (
    <div className="min-h-screen w-screen bg-gray-100 grid place-items-center p-6">
  <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-xl shadow-lg w-full overflow-x-auto">
    
        <h1 className="text-3xl font-bold text-center">Complexity Simulator</h1>

        {/* Simulation Switcher */}
        <div className="w-full flex justify-center">
          {/* Existing patterns */}
          <button onClick={() => setSim("grid")} className={`px-4 py-2 rounded ${sim === "grid" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Stochastic Grid</button>
          <button onClick={() => setSim("fractal2")} className={`px-4 py-2 rounded ${sim === "fractal1" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Fractal Steps</button>
          <button onClick={() => setSim("fractal1")} className={`px-4 py-2 rounded ${sim === "fractal2" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Fractal Line</button>
          <button onClick={() => setSim("fractal3")} className={`px-4 py-2 rounded ${sim === "fractal3" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Fractal Triangle 1</button>
          <button onClick={() => setSim("triangle")} className={`px-4 py-2 rounded ${sim === "triangle" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Fractal Triangle 2</button>
          <button onClick={() => setSim("zigzag")} className={`px-4 py-2 rounded ${sim === "zigzag" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Zig-Zag Line</button>
          <button onClick={() => setSim("tree")} className={`px-4 py-2 rounded ${sim === "tree" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Branching Tree</button>

          {/* New patterns */}
          <button onClick={() => setSim("radial")} className={`px-4 py-2 rounded ${sim === "radial" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Radial Fan</button>
          <button onClick={() => setSim("star")} className={`px-4 py-2 rounded ${sim === "star" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Recursive Star</button>
          <button onClick={() => setSim("spiral")} className={`px-4 py-2 rounded ${sim === "spiral" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Spiral Growth</button>
          
        </div>

        {/* Simulation Render */}
        <div className="w-full flex justify-center overflow-x-auto">
            {sim === "grid" && <StochasticGrid />}
            {sim === "fractal1" && <FractalLine1 />}
            {sim === "fractal2" && <FractalLine2 />}
            {sim === "fractal3" && <Triangle1 />}
            {sim === "triangle" && <FractalTriangle />}
            {sim === "zigzag" && <ZigZagLine />}
            {sim === "tree" && <BranchingTree />}
            {sim === "radial" && <RadialFan />}
            {sim === "star" && <RecursiveStar />}
            {sim === "spiral" && <SpiralGrowth />}
        </div>
      </div>
    </div>
  );
}
