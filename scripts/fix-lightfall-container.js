const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/components/Lightfall.tsx";
let c = fs.readFileSync(p, "utf8");

// The container needs explicit dimensions - fix the return statement
c = c.replace(
  `<div
      ref={containerRef}
      className={\`lightfall-container \${className}\`}
      style={{ ...(mixBlendMode && { mixBlendMode }) }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: mouseInteraction ? "auto" : "none" }} />
    </div>`,
  `<div
      ref={containerRef}
      className={\`lightfall-container \${className}\`}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...(mixBlendMode && { mixBlendMode }) }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: mouseInteraction ? "auto" : "none" }} />
    </div>`
);

// Also remove the use client at top since it should be handled by the importing file
// Actually keep it for safety

fs.writeFileSync(p, c, "utf8");
console.log("OK: Lightfall container now has absolute positioning + 100% dimensions");