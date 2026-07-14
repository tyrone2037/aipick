"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

interface BorderGlowProps {
  children: ReactNode;
  borderRadius?: number;
  borderWidth?: number;
  colors?: string[];
  animationDuration?: number;
  className?: string;
  paused?: boolean;
}

export default function BorderGlow({
  children,
  borderRadius = 12,
  borderWidth = 2,
  colors = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#818cf8", "#6366f1"],
  animationDuration = 4,
  className = "",
  paused = false,
}: BorderGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ w: Math.round(width), h: Math.round(height) });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const gradientColors = colors.join(", ");

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex ${className}`}
      style={{
        borderRadius: borderRadius + borderWidth + 4,
        padding: borderWidth + 2,
      }}
    >
      {/* Animated glow layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: borderRadius + borderWidth + 4,
          overflow: "hidden",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 0deg, ${gradientColors})`,
            animation: paused
              ? "none"
              : `spin ${animationDuration}s linear infinite`,
            filter: "blur(8px)",
            opacity: 0.7,
          }}
        />
        {/* Rotating gradient masked to border area */}
        <div
          style={{
            position: "absolute",
            top: borderWidth + 2,
            left: borderWidth + 2,
            right: borderWidth + 2,
            bottom: borderWidth + 2,
            borderRadius: borderRadius,
            background: "var(--card, #fff)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10"
        style={{
          borderRadius,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
