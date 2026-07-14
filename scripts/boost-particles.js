var fs = require("fs"); var p = "D:/Desktopnew/ai-hub/src/components/Lightfall.tsx"; var c = fs.readFileSync(p, "utf8");
// Increase visibility: lower divisor and increase base count
c = c.replace("const count = Math.floor((w * h) / 8000 * density);", "const count = Math.floor((w * h) / 4000 * density);");
c = c.replace("const finalCount = Math.max(30, Math.min(150, count));", "const finalCount = Math.max(60, Math.min(200, count));");
// Lower fade alpha so trails persist
c = c.replace("ctx.fillStyle = hexToRgba(backgroundColor, 0.08);", "ctx.fillStyle = hexToRgba(backgroundColor, 0.04);");
fs.writeFileSync(p, c, "utf8");
console.log("OK: More particles, better visibility");
