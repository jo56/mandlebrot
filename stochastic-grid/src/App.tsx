// App.tsx
import React, { useState } from "react";
import StochasticGrid from "./components/Grid";
import FractalLine1 from "./components/FractalLine1";
import FractalLine2 from "./components/FractalLine2";
import FractalLine3 from "./components/FractalLine3";
import Mandelbrot from "./components/Mandlebrot";
import Multibrot from "./components/Multibrot";
import JuliaSet from "./components/JuliaSet";
import BurningShip from "./components/BurningShip";

export default function App() {
  type Simulation = "grid" | "fractal1" | "fractal2" | "fractal3" | "mandlebrot" | "multibrot" | "julia" | "burningship";
  const [sim, setSim] = useState<Simulation>("grid");

  return (
    <div className="min-h-screen w-screen bg-gray-100 grid place-items-center p-6">
      {/* Inner card */}
      <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center">Complexity Simulator</h1>

        {/* Simulation Switcher */}
        <div className="flex gap-2 flex-wrap justify-center">
          <button
            onClick={() => setSim("grid")}
            className={`px-4 py-2 rounded ${sim === "grid" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            Stochastic Grid
          </button>
          <button
            onClick={() => setSim("fractal1")}
            className={`px-4 py-2 rounded ${sim === "fractal1" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            Fractal Line 1
          </button>
          <button
            onClick={() => setSim("fractal2")}
            className={`px-4 py-2 rounded ${sim === "fractal2" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            Fractal Line 2
          </button>
          <button
            onClick={() => setSim("fractal3")}
            className={`px-4 py-2 rounded ${sim === "fractal3" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            Fractal Line 3
          </button>
          
        </div>

        {/* Simulation Render */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-full flex justify-center">
            {sim === "grid" && <StochasticGrid />}
            {sim === "fractal1" && <FractalLine1 />}
            {sim === "fractal2" && <FractalLine2 />}
            {sim === "fractal3" && <FractalLine3 />}
            {sim === "mandlebrot" && <Mandelbrot />}
            {sim === "multibrot" && <Multibrot />}
            {sim === "julia" && <JuliaSet />}
            {sim === "burningship" && <BurningShip/>}
          </div>
        </div>
      </div>
    </div>
  );
}
