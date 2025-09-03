import React, { useState } from "react";
import StochasticGrid from "./components/grid";
import FractalLine1  from "./components/FractalLine1";
import FractalLine2 from "./components/FractalLine2";
import FractalLine3 from "./components/FractalLine3";

export default function App() {
  type Simulation =
  | "grid"
  | "fractal1"
  | "fractal2"
  | "fractal3";

const [sim, setSim] = useState<Simulation>("grid");

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-xl shadow-lg max-h-full overflow-auto">
        <h1 className="text-3xl font-bold">Complexity Simulator</h1>

      {/* Simulation Switcher */}
      <div className="flex gap-2 flex-wrap justify-center">
      <button
        onClick={() => setSim("grid")}
        className={`px-3 py-1 rounded ${sim === "grid" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
      >
        Stochastic Grid
      </button>
      <button
        onClick={() => setSim("fractal1")}
        className={`px-3 py-1 rounded ${sim === "fractal1" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
      >
        Fractal Line 1
      </button>
      <button
        onClick={() => setSim("fractal2")}
        className={`px-3 py-1 rounded ${sim === "fractal2" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
      >
        Fractal Line 2
      </button>
      <button
        onClick={() => setSim("fractal3")}
        className={`px-3 py-1 rounded ${sim === "fractal3" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
      >
        Fractal Line 3
      </button>
    </div>


      {/* Render selected simulation */}
      <div className="w-full flex justify-center mt-4">
      {sim === "grid" && <StochasticGrid />}
      {sim === "fractal1" && <FractalLine1 />}
      {sim === "fractal2" && <FractalLine2 />}
      {sim === "fractal3" && <FractalLine3 />}
    </div>
    </div>
    </div>
  );
}
