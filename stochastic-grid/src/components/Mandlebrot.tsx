import React, { useRef, useEffect } from "react";

export default function Mandelbrot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const maxIter = 300;

    const render = () => {
      const imageData = ctx.createImageData(width, height);
      for (let px = 0; px < width; px++) {
        for (let py = 0; py < height; py++) {
          let x0 = (px / width) * 3.5 - 2.5;
          let y0 = (py / height) * 2 - 1;

          let x = 0, y = 0;
          let iteration = 0;

          while (x*x + y*y <= 4 && iteration < maxIter) {
            const xTemp = x*x - y*y + x0;
            y = 2*x*y + y0;
            x = xTemp;
            iteration++;
          }

          const color = iteration === maxIter ? 0 : (iteration / maxIter) * 255;
          const index = (py * width + px) * 4;
          imageData.data[index] = color;
          imageData.data[index + 1] = color;
          imageData.data[index + 2] = 255 - color;
          imageData.data[index + 3] = 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };

    render();
  }, []);

  return <canvas ref={canvasRef} width={400} height={400} />;
}
