const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let c = fs.readFileSync(p, "utf8");

// The page structure needs: relative container with proper height, absolute background, then content
// Current structure at line 182: <div className="relative" style={{ minHeight: "420px" }}>
// Lightfall is inside it - should work since the container is relative with minHeight

// But the issue is that relative container with only absolutely positioned children
// will collapse. Let me add explicit height.

c = c.replace(
  `<div className="relative" style={{ minHeight: "420px" }}>`,
  `<div className="relative" style={{ height: "420px" }}>`
);

fs.writeFileSync(p, c, "utf8");
console.log("OK: Container height set to 420px");