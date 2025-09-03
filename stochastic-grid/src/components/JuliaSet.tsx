import React, { useRef, useEffect } from "react";

export default function JuliaSet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const maxIter = 300;
    const cRe = -0.7; // Fixed Julia parameter
    const cIm = 0.27015;

    const render = () => {
      const imageData = ctx.createImageData(width, height);

      for (let px = 0; px < width; px++) {
        for (let py = 0; py < height; py++) {
          let x = (px / width) * 3.5 - 1.75;
          let y = (py / height) * 2 - 1;

          let iteration = 0;

          while (x*x + y*y <= 4 && iteration < maxIter) {
            const xTemp = x*x - y*y + cRe;
            y = 2*x*y + cIm;
            x = xTemp;
            iteration++;
          }

          const color = iteration === maxIter ? 0 : (iteration / maxIter) * 255;
          const index = (py * width + px) * 4;
          imageData.data[index] = color;
          imageData.data[index + 1] = 255 - color;
          imageData.data[index + 2] = color;
          imageData.data[index + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    render();
  }, []);

  return <canvas ref={canvasRef} width={400} height={400} />;
}
