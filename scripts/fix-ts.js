var fs = require("fs"); var p = "D:/Desktopnew/ai-hub/src/components/Lightfall.tsx"; var c = fs.readFileSync(p, "utf8");
// Fix 1: Rename local variable that shadows prop "twinkle"
c = c.replace("const twinkle = 1 + Math.sin(time * p.twinkleSpeed + p.twinklePhase) * twinkle * 0.4;", "const twinkleVal = 1 + Math.sin(time * p.twinkleSpeed + p.twinklePhase) * twinkle * 0.4;");
c = c.replace("let alpha = p.opacity * twinkle * glow;", "let alpha = p.opacity * twinkleVal * glow;");
// Fix 2: Style type - cast properly
c = c.replace("style={{ position: \"absolute\", inset: 0, width: \"100%\", height: \"100%\", ...(mixBlendMode ? { mixBlendMode } : {}) }}", "style={{ position: \"absolute\", inset: 0, width: \"100%\", height: \"100%\", ...(mixBlendMode ? { mixBlendMode } : {}) } as React.CSSProperties}");
c = c.replace("import { useEffect, useRef } from \"react\";", "import { useEffect, useRef, type CSSProperties } from \"react\";");
fs.writeFileSync(p, c, "utf8");
console.log("OK: Fixed variable shadowing and type issues");
