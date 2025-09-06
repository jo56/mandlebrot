import React, { useState, useRef } from "react";

// === Simulation imports ===
import StochasticGrid from "./components/patterns/Misc/Grid";
import WavyGrid from "./components/patterns/NewComponents/WavyGrid";
import FractalLine1 from "./components/patterns/FractalLines/FractalLine1";
import FractalLine2 from "./components/patterns/FractalLines/FractalLine2";
import Triangle1 from "./components/patterns/FractalLines/Triangle1";
import FractalTriangle from "./components/patterns/FractalLines/FancyLines/Triangle2";
import ZigZagLine from "./components/patterns/FractalLines/FancyLines/ZigZagLine";
import BranchingTree from "./components/patterns/BranchingPatterns/BranchingTree";
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
import GrowingBranches from "./components/patterns/NewestPatterns/GrowingBranch";
import NoiseWavyGrid from "./components/patterns/NewestPatterns/NoiseWavy";
import RecursiveSquares from "./components/patterns/NewestPatterns/REcursiveSquares";
import WavefrontRipples from "./components/patterns/NewestPatterns/WavefrontRipples";
import * as LargePatterns from "./components/patterns/LargePatternSet";

// === Simulation registry ===
const SIMULATIONS = {
  grid: { component: StochasticGrid, label: "Stochastic Grid" },
  wavygrid: { component: WavyGrid, label: "Wavy Grid" },
  fractal1: { component: FractalLine1, label: "Fractal Line" },
  fractal2: { component: FractalLine2, label: "Fractal Steps" },
  fractal3: { component: Triangle1, label: "Fractal Triangle 1" },
  triangle: { component: FractalTriangle, label: "Fractal Triangle 2" },
  zigzag: { component: ZigZagLine, label: "Zig-Zag Line" },
  tree: { component: BranchingTree, label: "Branching Tree" },
  radial: { component: RadialFan, label: "Radial Fan" },
  star: { component: RecursiveStar, label: "Recursive Star" },
  spiral: { component: SpiralGrowth, label: "Spiral Growth" },
  snowflake: { component: KochSnowflake, label: "Koch Snowflake" },
  polygon: { component: NestedPolygon, label: "Nested Polygon" },
  sunburst: { component: Sunburst, label: "Radial Sunburst" },
  sunburst2: { component: Spokes, label: "Animated Spokes" },
  aniwavygrid: { component: AnimatedWavyGrid, label: "Animated Wavy Grid" },
  fractaltree: { component: FractalTree, label: "Fractal Tree" },
  particleflow: { component: ParticleFlow, label: "Particle Flow" },
  rings: { component: ExpandingRings, label: "Expanding Rings" },
  "f-spiral": { component: FractalSpiral, label: "Fractal Spiral" },
  noise: { component: NoiseLandscape, label: "Noise Landscape" },
  oscilator: { component: Oscilator, label: "Oscilator" },
  particleflow2: { component: FlowField, label: "Bouncing Particles" },
  radialwave: { component: RadialPulses, label: "Radial Wave Pulses" },
  rotatingcircles: { component: RotatingCircles, label: "Rotating Circles" },
  rotatingsquares: { component: RotatingSquares, label: "Rotating Squares" },
  rotatingstarfield: { component: RotatingStarfield, label: "Rotating Starfield" },
  spiralwaves: { component: SpiralWaves, label: "Spiral Waves" },
  growingbranch: { component: GrowingBranches, label: "Growing Branch" },
  noisewavy: { component: NoiseWavyGrid, label: "Noise Wavy Grid" },
  recursivesquares: { component: RecursiveSquares, label: "Recursive Squares" },
  wavefrontripples: { component: WavefrontRipples, label: "Wavefront Ripples" },
  ...Object.fromEntries(
    Object.entries(LargePatterns).map(([key, component]) => [
      key.toLowerCase(),
      { component, label: key },
    ])
  ),
};

export default function App() {
  const simKeys = Object.keys(SIMULATIONS);
  const [selectedSim, setSelectedSim] = useState(simKeys[0]);
  const simRef = useRef<any>(null);
  const SimComponent = SIMULATIONS[selectedSim].component;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-700 to-cyan-500 shadow-lg rounded-b-2xl">
        <h1 className="text-3xl font-bold tracking-wide">Complexity Lab</h1>
      </header>

      {/* Simulation selector */}
      <div className="p-6 flex justify-center">
        <select
          value={selectedSim}
          onChange={(e) => setSelectedSim(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {simKeys.map((key) => (
            <option key={key} value={key}>
              {SIMULATIONS[key].label}
            </option>
          ))}
        </select>
      </div>

      {/* Main preview */}
      <main className="flex-1 flex justify-center items-center p-6">
        <div className="w-full max-w-6xl h-[600px] bg-gray-800 rounded-2xl shadow-2xl flex justify-center items-center overflow-hidden">
          <SimComponent ref={simRef} />
        </div>
      </main>
    </div>
  );
}
