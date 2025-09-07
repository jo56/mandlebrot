import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Settings, ChevronLeft, ChevronRight, Grid, Zap, TreePine, Waves, Maximize2, Download, Share2, Info } from "lucide-react";

// Mock simulation components for demonstration
const MockSimulation = ({ name }) => (
  <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-xl">
    <div className="absolute inset-0 opacity-20">
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.5 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
    <div className="text-center z-10">
      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
        <Zap className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
      <p className="text-cyan-300 text-sm animate-pulse">Simulation Running...</p>
    </div>
  </div>
);

// Organized simulation categories
const SIMULATION_CATEGORIES = {
  "Fractals": {
    icon: TreePine,
    color: "from-emerald-400 via-teal-500 to-cyan-600",
    accent: "emerald",
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
    accent: "blue",
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
    accent: "purple",
    sims: [
      { key: "particleflow", name: "Particle Flow", description: "Fluid particle dynamics", complexity: "High" },
      { key: "particleflow2", name: "Bouncing Particles", description: "Physics-based particles", complexity: "High" },
      { key: "rings", name: "Expanding Rings", description: "Radial wave propagation", complexity: "Medium" },
      { key: "spiralwaves", name: "Spiral Waves", description: "Rotating wave patterns", complexity: "High" },
      { key: "radialwave", name: "Radial Wave Pulses", description: "Pulsing wave effects", complexity: "Medium" }
    ]
  },
  "Geometric": {
    icon: Settings,
    color: "from-orange-400 via-red-500 to-pink-600",
    accent: "orange",
    sims: [
      { key: "polygon", name: "Nested Polygon", description: "Recursive polygon nesting", complexity: "Medium" },
      { key: "sunburst", name: "Radial Sunburst", description: "Radial geometric patterns", complexity: "Low" },
      { key: "recursivesquares", name: "Recursive Squares", description: "Self-similar squares", complexity: "Medium" },
      { key: "rotatingcircles", name: "Rotating Circles", description: "Orbital circle motion", complexity: "Low" },
      { key: "rotatingsquares", name: "Rotating Squares", description: "Square rotation patterns", complexity: "Low" },
      { key: "rotatingstarfield", name: "Rotating Starfield", description: "Star field rotation", complexity: "Medium" },
      { key: "zigzag", name: "Zig-Zag Line", description: "Angular line patterns", complexity: "Low" },
      { key: "radial", name: "Radial Fan", description: "Fan-shaped patterns", complexity: "Low" }
    ]
  }
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Fractals");
  const [selectedSim, setSelectedSim] = useState(SIMULATION_CATEGORIES.Fractals.sims[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [currentSimIndex, setCurrentSimIndex] = useState(0);
  const simRef = useRef(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden relative">
      {/* Dynamic background mesh */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Premium header with glassmorphism */}
      <header className="relative z-10 px-6 py-6 border-b border-white/10 backdrop-blur-xl bg-black/20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Complexity Lab
                </h1>
                <p className="text-sm text-gray-400">Interactive Pattern Generation Suite</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-200 flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">Share</span>
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg shadow-lg shadow-cyan-500/25 transition-all duration-200 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-180px)]">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category Selection with enhanced cards */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-lg font-semibold mb-6 text-gray-200">Pattern Categories</h3>
              <div className="space-y-3">
                {Object.entries(SIMULATION_CATEGORIES).map(([category, config]) => {
                  const Icon = config.icon;
                  const isActive = selectedCategory === category;
                  
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full group relative overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r ' + config.color + ' text-white shadow-xl'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                      } rounded-xl p-4 transition-all duration-300 transform hover:scale-[1.02]`}
                    >
                      <div className="relative z-10 flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-white/10'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-sm">{category}</div>
                          <div className="text-xs opacity-80">{config.sims.length} patterns</div>
                        </div>
                      </div>
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Pattern List */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl flex-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-200">
                  {selectedCategory}
                </h3>
                <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300">
                  {currentCategorySims.length} available
                </span>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-white/5">
                {currentCategorySims.map((sim, index) => (
                  <button
                    key={sim.key}
                    onClick={() => {
                      setSelectedSim(sim);
                      setCurrentSimIndex(index);
                    }}
                    className={`w-full text-left group relative overflow-hidden ${
                      selectedSim?.key === sim.key
                        ? 'bg-gradient-to-r from-white/20 to-white/10 border-white/30 shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 border-white/10'
                    } border rounded-xl p-4 transition-all duration-200 hover:scale-[1.01]`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-medium text-sm text-white">{sim.name}</div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getComplexityColor(sim.complexity)}`}>
                        {sim.complexity}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 leading-relaxed">{sim.description}</div>
                    
                    {selectedSim?.key === sim.key && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Premium Info Header */}
            <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                    <TreePine className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedSim?.name || "Select a Pattern"}</h2>
                    <p className="text-gray-300 text-sm mb-2">{selectedSim?.description || "Choose a simulation from the sidebar"}</p>
                    {selectedSim && (
                      <div className="flex items-center space-x-4">
                        <span className={`text-xs px-3 py-1 rounded-full ${getComplexityColor(selectedSim.complexity)}`}>
                          {selectedSim.complexity} Complexity
                        </span>
                        <span className="text-xs text-gray-400">
                          {currentSimIndex + 1} of {currentCategorySims.length}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-200"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                  <button
                    onClick={prevSim}
                    disabled={currentCategorySims.length === 0}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSim}
                    disabled={currentCategorySims.length === 0}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Premium Simulation Display */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl flex-1 relative overflow-hidden">
              <div className="h-full min-h-[500px] rounded-2xl overflow-hidden relative">
                {selectedSim?.key ? (
                  <MockSimulation name={selectedSim.name} />
                ) : (
                  <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black rounded-2xl">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-cyan-500/25">
                        <Zap className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Select a Pattern</h3>
                      <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                        Choose from our collection of interactive complexity patterns and watch mathematical beauty unfold in real-time.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Premium Floating Controls */}
              {selectedSim?.key && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20 shadow-2xl">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl hover:scale-110 transition-all duration-200 shadow-lg shadow-cyan-500/25"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      )}
                    </button>
                    
                    <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200">
                      <RotateCcw className="w-5 h-5 text-white" />
                    </button>
                    
                    <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </button>
                    
                    <div className="h-8 w-px bg-white/30" />
                    
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-gray-300 font-medium">
                        Pattern {currentSimIndex + 1}
                      </span>
                      <span className="text-xs text-gray-500">
                        of {currentCategorySims.length}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Info Panel */}
            {showInfo && selectedSim?.key && (
              <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl">
                <h3 className="text-lg font-semibold text-white mb-4">Pattern Information</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Animation Speed
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          defaultValue="75"
                          className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>Slow</span>
                          <span>Fast</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Pattern Complexity
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          defaultValue="60"
                          className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>Simple</span>
                          <span>Complex</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Scale Factor
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="50"
                          max="200"
                          defaultValue="100"
                          className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>50%</span>
                          <span>200%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Iteration Depth
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          defaultValue="5"
                          className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>1</span>
                          <span>10</span>
                        </div>
                      </div>
                    </div>
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
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00bcd4, #2196f3);
          cursor: pointer;
          box-shadow: 0 6px 12px rgba(0, 188, 212, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00bcd4, #2196f3);
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 6px 12px rgba(0, 188, 212, 0.3);
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}