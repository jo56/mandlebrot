import React, { useState } from "react";
import StochasticGrid from "./components/patterns/Misc/Grid";
import WavyGrid from "./components/patterns/NewComponents/WavyGrid";
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

import KochSnowflake from "./components/patterns/NewComponents/KochSnowflake";
import NestedPolygon from "./components/patterns/NewComponents/NestedPolygon";
import Sunburst from "./components/patterns/NewComponents/Sunburst";
import Spokes from "./components/patterns/NewComponents/Spokes";
import AnimatedWavyGrid from "./components/patterns/AnimatedComponents/AnimatedWavyGrid";
import ParticleFlow from "./components/patterns/AnimatedComponents/ParticleFlow";
import FractalTree from "./components/patterns/AnimatedComponents/FractalTree";
import ExpandingRings from "./components/patterns/NewestPatterns/ExpandingRings";
import FractalSpiral from "./components/patterns/NewestPatterns/FractalSpiral";
import NoiseLandscape from "./components/patterns/NewestPatterns/NoiseLandscape";
import Oscilator from "./components/patterns/NewestPatterns/Oscilator";
import FlowField from "./components/patterns/NewestPatterns/ParticleFlow2";
import RadialPulses from "./components/patterns/NewestPatterns/RadialWavePulses";
import RotatingCircles from "./components/patterns/NewestPatterns/RotatingCircles";
import RotatingSquares from "./components/patterns/NewestPatterns/RotatingSquares";
import RotatingStarfield from "./components/patterns/NewestPatterns/RotatingStarfield";
import SpiralWaves from "./components/patterns/NewestPatterns/SpiralWaves";

export default function App() {
  type Simulation =
    | "grid"
    | "wavygrid"
    | "fractal1"
    | "fractal2"
    | "fractal3"
    | "triangle"
    | "zigzag"
    | "tree"
    | "radial"
    | "star"
    | "spiral"
    | "leaf"
    | "snowflake"
    | "polygon"
    | "sunburst"
    | "sunburst2"
    | "aniwavygrid"
    | "fractaltree"
    | "particleflow"
    | "rings"
    | "f-spiral"
    | "noise"
    | "osiclator"
    | "particleflow2"
    | "radialwave"
    | "rotatingcircles"
    | "rotatingsquares"
    | "rotatingstarfield"
    | "spiralwaves";

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
          <button onClick={() => setSim("snowflake")} className={`px-4 py-2 rounded ${sim === "snowflake" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Koch Snowflake</button>
          <button onClick={() => setSim("polygon")} className={`px-4 py-2 rounded ${sim === "polygon" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Nested Polygon</button>
          <button onClick={() => setSim("wavygrid")} className={`px-4 py-2 rounded ${sim === "wavygrid" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Wavy Lines</button>
          
          <button onClick={() => setSim("sunburst")} className={`px-4 py-2 rounded ${sim === "polygon" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Radial Sunburst</button>
          <button onClick={() => setSim("sunburst2")} className={`px-4 py-2 rounded ${sim === "polygon" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Animated Spokes</button>
          <button onClick={() => setSim("aniwavygrid")} className={`px-4 py-2 rounded ${sim === "polygon" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Wavy Grid</button>
          <button onClick={() => setSim("fractaltree")} className={`px-4 py-2 rounded ${sim === "polygon" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Fractal Tree</button>
          <button onClick={() => setSim("particleflow")} className={`px-4 py-2 rounded ${sim === "polygon" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Particle Flow</button>

          <button onClick={() => setSim("rings")} className={`px-4 py-2 rounded ${sim === "polygon" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Expanding Rings</button>
          <button onClick={() => setSim("f-spiral")} className={`px-4 py-2 rounded ${sim === "polygon" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Fractal Spiral</button>
          <button onClick={() => setSim("noise")} className={`px-4 py-2 rounded ${sim === "polygon" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Noise Landscape</button>
          <button onClick={() => setSim("particleflow2")} className={`px-4 py-2 rounded ${sim === "polygon" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Particle Flow 2</button>
          <button onClick={() => setSim("radialwave")} className={`px-4 py-2 rounded ${sim === "polygon" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Radial Wave Pulses</button>
          <button onClick={() => setSim("rotatingcircles")} className={`px-4 py-2 rounded ${sim === "polygon" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Rotating Circles</button>
          <button onClick={() => setSim("rotatingsquares")} className={`px-4 py-2 rounded ${sim === "polygon" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Rotating Squares</button>
          <button onClick={() => setSim("rotatingstarfield")} className={`px-4 py-2 rounded ${sim === "polygon" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Rotating Starfield</button>
          <button onClick={() => setSim("spiralwaves")} className={`px-4 py-2 rounded ${sim === "polygon" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Spiral Waves</button>

        </div>

        {/* Simulation Render */}
        <div className="w-full flex justify-center overflow-x-auto">
            {sim === "grid" && <StochasticGrid />}
            {sim === "wavygrid" && <WavyGrid />}
            {sim === "fractal1" && <FractalLine1 />}
            {sim === "fractal2" && <FractalLine2 />}
            {sim === "fractal3" && <Triangle1 />}
            {sim === "triangle" && <FractalTriangle />}
            {sim === "zigzag" && <ZigZagLine />}
            {sim === "tree" && <BranchingTree />}
            {sim === "radial" && <RadialFan />}
            {sim === "star" && <RecursiveStar />}
            {sim === "spiral" && <SpiralGrowth />}
            {sim === "snowflake" && <KochSnowflake/>}
            {sim === "polygon" && <NestedPolygon/>}
            {sim === "sunburst" && <Sunburst/>}
            {sim === "sunburst2" && <Spokes/>}
            {sim === "aniwavygrid" && <AnimatedWavyGrid/>}
            {sim === "fractaltree" && <FractalTree/>}
            {sim === "particleflow" && <ParticleFlow/>}
            {sim === "rings" && <ExpandingRings/>}
            {sim === "f-spiral"&& <FractalSpiral/>}
            {sim === "noise" && <NoiseLandscape/>}
            {sim ===  "particleflow2"  && <FlowField/>}
    {sim ===  "radialwave"  && <RadialPulses/>}
    {sim ===  "rotatingcircles"   && <RotatingCircles/>}
    {sim ===  "rotatingsquares"   && <RotatingSquares/>}
    {sim ===  "rotatingstarfield"   && <RotatingStarfield/>}
    {sim ===  "spiralwaves" && <SpiralWaves/>};
        </div>
      </div>
    </div>
  );
}
