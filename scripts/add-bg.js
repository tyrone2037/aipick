var fs = require("fs"); var p = "D:/Desktopnew/ai-hub/src/components/Lightfall.tsx"; var c = fs.readFileSync(p, "utf8");
// Add a dark gradient background behind the canvas
c = c.replace(
  "<div\n      ref={containerRef}\n      className={`lightfall-container ${className}`}\n      style={{ position: \"absolute\", inset: 0, width: \"100%\", height: \"100%\", ...(mixBlendMode ? { mixBlendMode } : {}) } as CSSProperties }}\n    >\n      <canvas",
  "<div\n      ref={containerRef}\n      className={`lightfall-container ${className}`}\n      style={{ position: \"absolute\", inset: 0, width: \"100%\", height: \"100%\", background: \"linear-gradient(180deg, #1e1b4b 0%, #3b0764 50%, #2b44f3 100%)\", ...(mixBlendMode ? { mixBlendMode } : {}) } as CSSProperties }}\n    >\n      <canvas"
);
fs.writeFileSync(p, c, "utf8");
console.log("OK: Added dark gradient background");
