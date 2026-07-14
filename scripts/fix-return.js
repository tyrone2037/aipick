var fs = require("fs");
var p = "D:/Desktopnew/ai-hub/src/components/Lightfall.tsx";
var c = fs.readFileSync(p, "utf8");

// Replace the return statement with proper typing
c = c.replace(
  `  return (
    <div ref={containerRef} className={\`lightfall-container \${className}\`}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...(mixBlendMode ? { mixBlendMode } : {}) }} />
  );`,
  `  const style: React.CSSProperties = {
    position: "absolute", inset: 0, width: "100%", height: "100%",
    ...(mixBlendMode ? { mixBlendMode: mixBlendMode as React.CSSProperties["mixBlendMode"] } : {})
  };
  return (
    <div ref={containerRef} className={\`lightfall-container \${className}\`} style={style} />
  );`
);

// Add React import for CSSProperties
c = c.replace(
  `import { useEffect, useRef } from "react";`,
  `import { useEffect, useRef, type CSSProperties } from "react";`
);

fs.writeFileSync(p, c, "utf8");
console.log("OK");