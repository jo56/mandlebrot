import React, { useState, useRef, useEffect } from "react";
import { RotateCcw, ChevronLeft, ChevronRight, Grid, Zap, TreePine, Waves, Download, Share2, Info } from "lucide-react";

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
  oscilator: { component: Oscilator, label: "Oscillator" },
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
    color: "from-emerald-400 via-teal-500 to-cyan-600",
    sims: [
      { key: "fractal1", name: "Fractal Line", description: "Self-similar recursive patterns", complexity: "Medium" },
      { key: "fractal2", name: "Fractal Steps", description: "Stepped fractal generation", complexity: "Low" },
      { key: "triangle", name: "Fractal Triangle", description: "Triangular fractal structures", complexity: "High" },
      { key: "snowflake", name: "Koch Snowflake", description: "Classic fractal geometry", complexity: "Medium" },
      { key: "fractaltree", name: "Fractal Tree", description: "Branching tree structures", complexity: "High" },
      { key: "f-spiral", name: "Fractal Spiral", description: "Spiral fractal patterns", complexity: "Medium" },
      { key: "tree", name: "Branching Tree", description: "Dynamic tree growth", complexity: "High" }
    ]
  },
  "Grids & Waves": {
    icon: Grid,
    color: "from-blue-400 via-indigo-500 to-purple-600",
    sims: [
      { key: "grid", name: "Stochastic Grid", description: "Random grid perturbations", complexity: "Low" },
      { key: "wavygrid", name: "Wavy Grid", description: "Sinusoidal grid deformations", complexity: "Medium" },
      { key: "aniwavygrid", name: "Animated Wavy Grid", description: "Dynamic wave patterns", complexity: "High" },
      { key: "noisewavy", name: "Noise Wavy Grid", description: "Perlin noise grid effects", complexity: "Medium" },
      { key: "noise", name: "Noise Landscape", description: "3D noise terrain", complexity: "High" },
      { key: "wavefrontripples", name: "Wavefront Ripples", description: "Ripple propagation", complexity: "Medium" }
    ]
  },
  "Particles & Flow": {
    icon: Waves,
    color: "from-purple-400 via-pink-500 to-rose-600",
    sims: [
      { key: "particleflow", name: "Particle Flow", description: "Fluid particle dynamics", complexity: "High" },
      { key: "particleflow2", name: "Bouncing Particles", description: "Physics-based particles", complexity: "High" },
      { key: "rings", name: "Expanding Rings", description: "Radial wave propagation", complexity: "Medium" },
      { key: "spiralwaves", name: "Spiral Waves", description: "Rotating wave patterns", complexity: "High" }
    ]
  },
  "Geometric": {
    icon: Grid,
    color: "from-orange-400 via-red-500 to-pink-600",
    sims: [
      { key: "polygon", name: "Nested Polygon", description: "Recursive polygon nesting", complexity: "Medium" },
      { key: "sunburst", name: "Radial Sunburst", description: "Radial geometric patterns", complexity: "Low" },
      { key: "recursivesquares", name: "Recursive Squares", description: "Self-similar squares", complexity: "Medium" },
      { key: "rotatingcircles", name: "Rotating Circles", description: "Orbital circle motion", complexity: "Low" },
      { key: "rotatingsquares", name: "Rotating Squares", description: "Square rotation patterns", complexity: "Low" },
      { key: "rotatingstarfield", name: "Rotating Starfield", description: "Star field rotation", complexity: "Medium" },
      { key: "zigzag", name: "Zig-Zag Line", description: "Angular line patterns", complexity: "Low" },
      { key: "radial", name: "Radial Fan", description: "Fan-shaped patterns", complexity: "Low" },
      { key: "star", name: "Recursive Star", description: "Star-based recursion", complexity: "Medium" },
      { key: "sunburst2", name: "Animated Spokes", description: "Rotating spoke patterns", complexity: "Low" }
    ]
  },
  "Complex Systems": {
    icon: Zap,
    color: "from-cyan-500 to-blue-600",
    sims: [
      { key: "growingbranch", name: "Growing Branch", description: "Organic growth patterns", complexity: "High" },
      { key: "spiral", name: "Spiral Growth", description: "Spiral development", complexity: "Medium" },
      { key: "oscilator", name: "Oscillator", description: "Harmonic oscillations", complexity: "Medium" },
      { key: "radialwave", name: "Radial Wave Pulses", description: "Pulsing wave effects", complexity: "Medium" }
    ]
  },
  "Advanced Patterns": {
    icon: Grid,
    color: "from-indigo-500 to-purple-600",
    sims: Object.keys(LargePatterns).map(key => ({
      key: key.toLowerCase(),
      name: key.replace(/([A-Z])/g, ' $1').trim(),
      description: `Advanced ${key.toLowerCase().replace(/([A-Z])/g, ' $1').trim()} pattern`,
      complexity: "High"
    }))
  }
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Fractals");
  const [selectedSim, setSelectedSim] = useState(SIMULATION_CATEGORIES.Fractals.sims[0]);
  const [showInfo, setShowInfo] = useState(false);
  const [currentSimIndex, setCurrentSimIndex] = useState(0);
  const simRef = useRef(null);

  // Removed universal simulation parameters - each component manages its own

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

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case "Low": return "text-green-400 bg-green-400/20";
      case "Medium": return "text-yellow-400 bg-yellow-400/20";
      case "High": return "text-red-400 bg-red-400/20";
      default: return "text-gray-400 bg-gray-400/20";
    }
  };

  // Get the actual simulation component
  const SimComponent = selectedSim?.key && SIMULATIONS[selectedSim.key] 
    ? SIMULATIONS[selectedSim.key].component 
    : () => <div className="flex items-center justify-center h-full text-gray-400">No simulation found</div>;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      margin: 0,
      padding: 0
    }}>
      {/* Inline styles to ensure it works regardless of external CSS */}
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        #root { 
          width: 100% !important; 
          height: auto !important; 
          min-height: 100vh !important;
          display: block !important; 
          align-items: unset !important; 
          justify-content: unset !important; 
        }
        .scrollbar-thin::-webkit-scrollbar { width: 6px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 3px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 3px; }
        .slider::-webkit-slider-thumb {
          appearance: none; height: 20px; width: 20px; border-radius: 50%;
          background: linear-gradient(135deg, #00bcd4, #2196f3);
          cursor: pointer; box-shadow: 0 4px 8px rgba(0, 188, 212, 0.3);
        }
      `}</style>

      {/* Dynamic background */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: '300px', height: '300px', 
                     background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent)', 
                     borderRadius: '50%', filter: 'blur(60px)', animation: 'pulse 3s infinite' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '400px', height: '400px',
                     background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1), transparent)',
                     borderRadius: '50%', filter: 'blur(80px)', animation: 'pulse 4s infinite' }}></div>
      </div>

      {/* Header */}
      <header style={{ position: 'relative', zIndex: 10, padding: '24px', 
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
                      backdropFilter: 'blur(20px)', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', 
                     justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', 
                         background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', 
                         borderRadius: '12px', display: 'flex', alignItems: 'center', 
                         justifyContent: 'center', boxShadow: '0 8px 24px rgba(6, 182, 212, 0.25)' }}>
              <Zap style={{ width: '24px', height: '24px', color: 'white' }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0,
                          background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
                          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Complexity Lab
              </h1>
              <p style={{ fontSize: '14px', color: '#9ca3af', margin: '4px 0 0 0' }}>
                Interactive Pattern Generation Suite
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ padding: '8px 16px', background: 'rgba(255, 255, 255, 0.1)', 
                            border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px',
                            color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', 
                            gap: '8px', transition: 'all 0.2s' }}>
              <Share2 style={{ width: '16px', height: '16px' }} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Share</span>
            </button>
            <button style={{ padding: '8px 16px', 
                            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', 
                            border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s',
                            boxShadow: '0 4px 12px rgba(6, 182, 212, 0.25)' }}>
              <Download style={{ width: '16px', height: '16px' }} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Export</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', 
                   padding: '24px', display: 'grid', gridTemplateColumns: '300px 1fr', 
                   gap: '24px', minHeight: 'calc(100vh - 120px)' }}>
        
        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Categories */}
          <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(20px)',
                       borderRadius: '24px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.2)',
                       boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', 
                        textAlign: 'center', color: '#e5e7eb' }}>Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.entries(SIMULATION_CATEGORIES).map(([category, config]) => {
                const Icon = config.icon;
                const isActive = selectedCategory === category;
                
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      padding: '16px',
                      borderRadius: '12px',
                      border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isActive 
                        ? `linear-gradient(135deg, ${config.color.replace('from-', '').replace('via-', '').replace('to-', '').split(' ').map(c => {
                            const colorMap = {
                              'emerald-400': '#34d399', 'teal-500': '#14b8a6', 'cyan-600': '#0891b2',
                              'blue-400': '#60a5fa', 'indigo-500': '#6366f1', 'purple-600': '#9333ea',
                              'purple-400': '#a78bfa', 'pink-500': '#ec4899', 'rose-600': '#e11d48',
                              'orange-400': '#fb923c', 'red-500': '#ef4444', 'pink-600': '#db2777',
                              'cyan-500': '#06b6d4'
                            };
                            return colorMap[c] || '#6366f1';
                          }).join(', ')})` 
                        : 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      transform: 'scale(1)',
                      boxShadow: isActive ? '0 8px 20px rgba(0, 0, 0, 0.3)' : 'none'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <div style={{ padding: '8px', borderRadius: '8px', 
                                 background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)' }}>
                      <Icon style={{ width: '20px', height: '20px' }} />
                    </div>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>{category}</div>
                      <div style={{ fontSize: '12px', opacity: 0.8 }}>{config.sims.length} patterns</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pattern List */}
          <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(20px)',
                       borderRadius: '24px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.2)',
                       boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', 
                         marginBottom: '24px', gap: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', textAlign: 'center', margin: 0 }}>
                {selectedCategory}
              </h3>
              <span style={{ fontSize: '12px', background: 'rgba(255, 255, 255, 0.1)', 
                            padding: '4px 12px', borderRadius: '20px', color: '#d1d5db' }}>
                {currentCategorySims.length} patterns
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', 
                         maxHeight: '400px', overflowY: 'auto' }} className="scrollbar-thin">
              {currentCategorySims.map((sim, index) => (
                <button
                  key={sim.key}
                  onClick={() => {
                    setSelectedSim(sim);
                    setCurrentSimIndex(index);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    background: selectedSim?.key === sim.key 
                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))' 
                      : 'rgba(255, 255, 255, 0.05)',
                    border: selectedSim?.key === sim.key 
                      ? '1px solid rgba(255, 255, 255, 0.3)' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                               marginBottom: '8px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: 'white', flex: 1, textAlign: 'center' }}>
                      {sim.name}
                    </div>
                    <span style={{ 
                      fontSize: '10px', 
                      padding: '2px 8px', 
                      borderRadius: '20px',
                      ...getComplexityColor(sim.complexity).split(' ').reduce((acc, className) => {
                        if (className.includes('text-')) {
                          const color = className.replace('text-', '');
                          const colorMap = {
                            'green-400': '#4ade80',
                            'yellow-400': '#facc15',
                            'red-400': '#f87171'
                          };
                          acc.color = colorMap[color] || '#9ca3af';
                        }
                        if (className.includes('bg-')) {
                          const bgColor = className.replace('bg-', '').replace('/20', '');
                          const bgColorMap = {
                            'green-400': 'rgba(74, 222, 128, 0.2)',
                            'yellow-400': 'rgba(250, 204, 21, 0.2)',
                            'red-400': 'rgba(248, 113, 113, 0.2)'
                          };
                          acc.backgroundColor = bgColorMap[bgColor] || 'rgba(156, 163, 175, 0.2)';
                        }
                        return acc;
                      }, {})
                    }}>
                      {sim.complexity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center' }}>
                    {sim.description}
                  </div>
                  {selectedSim?.key === sim.key && (
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px',
                                 background: 'linear-gradient(to bottom, #06b6d4, #3b82f6)', borderRadius: '0 4px 4px 0' }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Info Header */}
          <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(20px)',
                       borderRadius: '24px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.2)',
                       boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '64px', height: '64px', 
                             background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                             borderRadius: '16px', display: 'flex', alignItems: 'center', 
                             justifyContent: 'center', boxShadow: '0 8px 24px rgba(6, 182, 212, 0.25)' }}>
                  <TreePine style={{ width: '32px', height: '32px', color: 'white' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0 0 4px 0' }}>
                    {selectedSim?.name || "Select a Pattern"}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#d1d5db', margin: '0 0 8px 0' }}>
                    {selectedSim?.description || "Choose a simulation from the sidebar"}
                  </p>
                  {selectedSim && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                      <span style={{ 
                        fontSize: '12px', 
                        padding: '4px 12px', 
                        borderRadius: '20px',
                        ...getComplexityColor(selectedSim.complexity).split(' ').reduce((acc, className) => {
                          if (className.includes('text-')) {
                            const color = className.replace('text-', '');
                            const colorMap = { 'green-400': '#4ade80', 'yellow-400': '#facc15', 'red-400': '#f87171' };
                            acc.color = colorMap[color] || '#9ca3af';
                          }
                          if (className.includes('bg-')) {
                            const bgColor = className.replace('bg-', '').replace('/20', '');
                            const bgColorMap = { 'green-400': 'rgba(74, 222, 128, 0.2)', 'yellow-400': 'rgba(250, 204, 21, 0.2)', 'red-400': 'rgba(248, 113, 113, 0.2)' };
                            acc.backgroundColor = bgColorMap[bgColor] || 'rgba(156, 163, 175, 0.2)';
                          }
                          return acc;
                        }, {})
                      }}>
                        {selectedSim.complexity} Complexity
                      </span>
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                        {currentSimIndex + 1} of {currentCategorySims.length}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setShowInfo(!showInfo)}
                        style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '12px',
                                color: 'white', cursor: 'pointer' }}>
                  <Info style={{ width: '20px', height: '20px' }} />
                </button>
                <button onClick={prevSim} disabled={currentCategorySims.length === 0}
                        style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '12px',
                                color: 'white', cursor: 'pointer', opacity: currentCategorySims.length === 0 ? 0.5 : 1 }}>
                  <ChevronLeft style={{ width: '20px', height: '20px' }} />
                </button>
                <button onClick={nextSim} disabled={currentCategorySims.length === 0}
                        style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '12px',
                                color: 'white', cursor: 'pointer', opacity: currentCategorySims.length === 0 ? 0.5 : 1 }}>
                  <ChevronRight style={{ width: '20px', height: '20px' }} />
                </button>
              </div>
            </div>
          </div>

          {/* Simulation Display */}
          <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(20px)',
                       borderRadius: '24px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.2)',
                       boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)', flex: 1, position: 'relative' }}>
            <div style={{ height: '500px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
              {selectedSim?.key ? (
                <SimComponent 
                  ref={simRef}
                />
              ) : (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                             background: 'linear-gradient(135deg, #1f2937, #374151, #1f2937)', borderRadius: '16px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '96px', height: '96px', margin: '0 auto 24px auto',
                                 background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', borderRadius: '50%',
                                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                                 animation: 'pulse 2s infinite', boxShadow: '0 8px 24px rgba(6, 182, 212, 0.25)' }}>
                      <Zap style={{ width: '48px', height: '48px', color: 'white' }} />
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '0 0 12px 0' }}>
                      Select a Pattern
                    </h3>
                    <p style={{ fontSize: '14px', color: '#9ca3af', maxWidth: '400px', margin: '0 auto', lineHeight: 1.5 }}>
                      Choose from our collection of interactive complexity patterns and watch mathematical beauty unfold in real-time.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Floating controls removed - each component has its own controls */}
          </div>

          {/* Info Panel removed - each component manages its own parameters */}
        </div>
      </div>
    </div>
  );
}