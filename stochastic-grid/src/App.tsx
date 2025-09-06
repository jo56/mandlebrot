import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Settings, ChevronLeft, ChevronRight, Grid, Zap, TreePine, Waves } from "lucide-react";

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

// Organized simulation categories
const SIMULATION_CATEGORIES = {
  "Fractals": {
    icon: TreePine,
    color: "from-emerald-500 to-teal-600",
    sims: [
      { key: "fractal1", name: "Fractal Line", description: "Self-similar recursive patterns" },
      { key: "fractal2", name: "Fractal Steps", description: "Stepped fractal generation" },
      { key: "triangle", name: "Fractal Triangle", description: "Triangular fractal structures" },
      { key: "snowflake", name: "Koch Snowflake", description: "Classic fractal geometry" },
      { key: "fractaltree", name: "Fractal Tree", description: "Branching tree structures" },
      { key: "f-spiral", name: "Fractal Spiral", description: "Spiral fractal patterns" },
      { key: "tree", name: "Branching Tree", description: "Dynamic tree growth" }
    ]
  },
  "Grids & Waves": {
    icon: Grid,
    color: "from-blue-500 to-indigo-600",
    sims: [
      { key: "grid", name: "Stochastic Grid", description: "Random grid perturbations" },
      { key: "wavygrid", name: "Wavy Grid", description: "Sinusoidal grid deformations" },
      { key: "aniwavygrid", name: "Animated Wavy Grid", description: "Dynamic wave patterns" },
      { key: "noisewavy", name: "Noise Wavy Grid", description: "Perlin noise grid effects" },
      { key: "noise", name: "Noise Landscape", description: "3D noise terrain" },
      { key: "wavefrontripples", name: "Wavefront Ripples", description: "Ripple propagation" }
    ]
  },
  "Particles & Flow": {
    icon: Waves,
    color: "from-purple-500 to-pink-600",
    sims: [
      { key: "particleflow", name: "Particle Flow", description: "Fluid particle dynamics" },
      { key: "particleflow2", name: "Bouncing Particles", description: "Physics-based particles" },
      { key: "rings", name: "Expanding Rings", description: "Radial wave propagation" },
      { key: "spiralwaves", name: "Spiral Waves", description: "Rotating wave patterns" },
      { key: "radialwave", name: "Radial Wave Pulses", description: "Pulsing wave effects" }
    ]
  },
  "Geometric": {
    icon: Settings,
    color: "from-orange-500 to-red-600",
    sims: [
      { key: "polygon", name: "Nested Polygon", description: "Recursive polygon nesting" },
      { key: "sunburst", name: "Radial Sunburst", description: "Radial geometric patterns" },
      { key: "recursivesquares", name: "Recursive Squares", description: "Self-similar squares" },
      { key: "rotatingcircles", name: "Rotating Circles", description: "Orbital circle motion" },
      { key: "rotatingsquares", name: "Rotating Squares", description: "Square rotation patterns" },
      { key: "rotatingstarfield", name: "Rotating Starfield", description: "Star field rotation" },
      { key: "zigzag", name: "Zig-Zag Line", description: "Angular line patterns" },
      { key: "radial", name: "Radial Fan", description: "Fan-shaped patterns" },
      { key: "star", name: "Recursive Star", description: "Star-based recursion" },
      { key: "sunburst2", name: "Animated Spokes", description: "Rotating spoke patterns" }
    ]
  },
  "Complex Systems": {
    icon: Zap,
    color: "from-cyan-500 to-blue-600",
    sims: [
      { key: "growingbranch", name: "Growing Branch", description: "Organic growth patterns" },
      { key: "spiral", name: "Spiral Growth", description: "Spiral development" },
      { key: "oscilator", name: "Oscillator", description: "Harmonic oscillations" },
      { key: "growingbranches", name: "Growing Branches", description: "Multi-branch systems" },
      { key: "particlediffusion", name: "Particle Diffusion", description: "Diffusion dynamics" },
      { key: "growingmaze", name: "Growing Maze", description: "Maze generation" },
      { key: "randomwalklines", name: "Random Walk Lines", description: "Stochastic paths" }
    ]
  }
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Fractals");
  const [selectedSim, setSelectedSim] = useState(SIMULATION_CATEGORIES.Fractals.sims[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentSimIndex, setCurrentSimIndex] = useState(0);
  const simRef = useRef<any>(null);

  const currentCategorySims = SIMULATION_CATEGORIES[selectedCategory]?.sims || [];
  
  const nextSim = () => {
    const nextIndex = (currentSimIndex + 1) % currentCategorySims.length;
    setCurrentSimIndex(nextIndex);
    setSelectedSim(currentCategorySims[nextIndex]);
  };

  const prevSim = () => {
    const prevIndex = currentSimIndex === 0 ? currentCategorySims.length - 1 : currentSimIndex - 1;
    setCurrentSimIndex(prevIndex);
    setSelectedSim(currentCategorySims[prevIndex]);
  };

  useEffect(() => {
    setCurrentSimIndex(0);
    if (currentCategorySims.length > 0) {
      setSelectedSim(currentCategorySims[0]);
    }
  }, [selectedCategory]);

  // Get the actual simulation component
  const SimComponent = selectedSim?.key && SIMULATIONS[selectedSim.key] 
    ? SIMULATIONS[selectedSim.key].component 
    : () => <div className="flex items-center justify-center h-full text-gray-400">No simulation found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-30">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-cyan-400 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Complexity Lab
              </h1>
              <p className="text-sm text-gray-400">Interactive Pattern Generation</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowControls(!showControls)}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Category Selection */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {Object.entries(SIMULATION_CATEGORIES).map(([category, config]) => {
                  const Icon = config.icon;
                  const isActive = selectedCategory === category;
                  
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                          : 'hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulation List */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 flex-1">
              <h3 className="text-lg font-semibold mb-4">
                {selectedCategory} Patterns
              </h3>
              <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
                {currentCategorySims.map((sim, index) => (
                  <button
                    key={sim.key}
                    onClick={() => {
                      setSelectedSim(sim);
                      setCurrentSimIndex(index);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedSim?.key === sim.key
                        ? 'bg-white/20 border border-white/30'
                        : 'hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <div className="font-medium text-sm">{sim.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{sim.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Simulation Info */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedSim?.name || "Select a Pattern"}</h2>
                  <p className="text-gray-400">{selectedSim?.description || "Choose a simulation from the sidebar"}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevSim}
                    disabled={currentCategorySims.length === 0}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSim}
                    disabled={currentCategorySims.length === 0}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Simulation Display */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 flex-1 relative overflow-hidden">
              <div className="h-full min-h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                {selectedSim?.key ? (
                  <SimComponent ref={simRef} />
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Select a Pattern</h3>
                    <p className="text-gray-400 text-sm">Choose a simulation from the categories on the left</p>
                  </div>
                )}
              </div>

              {/* Floating Controls */}
              {selectedSim?.key && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full hover:scale-110 transition-transform"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      )}
                    </button>
                    
                    <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <RotateCcw className="w-4 h-4 text-white" />
                    </button>
                    
                    <div className="h-6 w-px bg-white/30" />
                    
                    <span className="text-sm text-gray-300 px-2">
                      {currentSimIndex + 1} / {currentCategorySims.length}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Control Panel (when expanded) */}
            {showControls && selectedSim?.key && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 space-y-4">
                <h3 className="text-lg font-semibold">Simulation Parameters</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Speed: 50%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="50"
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Complexity: 75%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="75"
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Scale: 100%
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="200"
                      defaultValue="100"
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Iterations: 25
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      defaultValue="25"
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00bcd4, #2196f3);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00bcd4, #2196f3);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}