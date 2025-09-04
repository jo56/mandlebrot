import React, { useState } from "react";

// Original imports
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

// Large pattern set
import * as LargePatterns from "./components/patterns/LargePatternSet";

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

  // Spread LargePatterns dynamically
  ...Object.fromEntries(
    Object.entries(LargePatterns).map(([key, component]) => [key.toLowerCase(), { component, label: key }])
  ),
};

export default function App() {
  const [sim, setSim] = useState<keyof typeof SIMULATIONS>("grid");

  const SimComponent = SIMULATIONS[sim].component;

  return (
    <div className="min-h-screen w-screen bg-gray-100 grid place-items-center p-6">
      <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-xl shadow-lg w-full overflow-x-auto">
        <h1 className="text-3xl font-bold text-center">Complexity Simulator</h1>

        {/* Simulation Switcher */}
        <div className="w-full flex flex-wrap justify-center gap-2">
          {Object.entries(SIMULATIONS).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setSim(key as keyof typeof SIMULATIONS)}
              className={`px-4 py-2 rounded ${sim === key ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Simulation Render */}
        <div className="w-full flex justify-center overflow-x-auto mt-4">
          <SimComponent />
        </div>
      </div>
    </div>
  );
}
