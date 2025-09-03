
import StochasticGrid from "./components/grid";
import FractalLine1 from "./components/FractalLine1";
import FractalLine2 from "./components/FractalLine2";
import FractalLine3 from "./components/FractalLine3";
import FractalLine4 from "./components/FractalLine3";

export default function App() {
  const [sim, setSim] = useState<"grid" | "fractal">("grid");

  return (
    <div>
      <button onClick={() => setSim("grid")}>Stochastic Grid</button>
      <button onClick={() => setSim("fractal")}>Fractal Line</button>
      {sim === "grid" && <StochasticGrid />}
      {sim === "fractal1" && <FractalLine1 />}
      {sim === "fractal2" && <FractalLine2 />}
      {sim === "fractal3" && <FractalLine3/>}
      {sim === "fractal4" && <FractalLine4/>}
    </div>
  );
}