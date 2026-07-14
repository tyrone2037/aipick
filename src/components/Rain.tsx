"use client";

import { useEffect, useRef } from "react";
import "./Lightfall.css";

export default function Rain({
  modeIndex = 0,
  rainSpeed = 0.2,
  count = 600,
  color = "#a78bfa",
  className = "",
}: {
  modeIndex?: number;
  rainSpeed?: number;
  count?: number;
  color?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;

    interface Drop {
      x: number;
      y: number;
      len: number;
      speed: number;
      opacity: number;
      width: number;
    }

    const drops: Drop[] = [];

    const hexToRgb = (hex: string) => {
      const c = hex.replace("#", "");
      return [
        parseInt(c.slice(0, 2), 16),
        parseInt(c.slice(2, 4), 16),
        parseInt(c.slice(4, 6), 16),
      ];
    };

    const [cr, cg, cb] = hexToRgb(color);

    const init = () => {
      dpr = window.devicePixelRatio || 1;
      w = container!.offsetWidth;
      h = container!.offsetHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      drops.length = 0;
      for (let i = 0; i < count; i++) {
        drops.push({
          x: Math.random() * w,
          y: Math.random() * h,
          len: 10 + Math.random() * 30,
          speed: (1 + Math.random() * 3) * rainSpeed * 5,
          opacity: 0.1 + Math.random() * 0.4,
          width: 1 + Math.random() * 1.5,
        });
      }
    };

    init();
    window.addEventListener("resize", init);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Mode 0: classic rain streaks
      if (modeIndex === 0) {
        ctx.globalCompositeOperation = "lighter";
        for (let i = 0; i < drops.length; i++) {
          const d = drops[i];
          const gradient = ctx.createLinearGradient(d.x, d.y - d.len, d.x, d.y);
          gradient.addColorStop(0, `rgba(${cr},${cg},${cb},0)`);
          gradient.addColorStop(0.7, `rgba(${cr},${cg},${cb},${d.opacity})`);
          gradient.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = d.width;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(d.x, d.y - d.len);
          ctx.lineTo(d.x, d.y);
          ctx.stroke();

          d.y += d.speed;
          if (d.y > h + d.len) {
            d.y = -d.len;
            d.x = Math.random() * w;
          }
        }
      }
      // Mode 1: dots/sparkles
      else if (modeIndex === 1) {
        ctx.globalCompositeOperation = "lighter";
        for (let i = 0; i < drops.length; i++) {
          const d = drops[i];
          ctx.beginPath();
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${d.opacity})`;
          ctx.arc(d.x, d.y, d.width, 0, Math.PI * 2);
          ctx.fill();

          d.y += d.speed;
          if (d.y > h + 10) {
            d.y = -10;
            d.x = Math.random() * w;
          }
        }
      }

      ctx.globalCompositeOperation = "source-over";
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", init);
    };
  }, [modeIndex, rainSpeed, count, color]);

  return (
    <div
      ref={containerRef}
      className={`lightfall-container ${className}`}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />
    </div>
  );
}