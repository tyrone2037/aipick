var fs = require("fs"); var p = "D:/Desktopnew/ai-hub/src/components/Lightfall.tsx"; var c = fs.readFileSync(p, "utf8");
// Fix the mixBlendMode spread - cast the whole object instead
c = c.replace("...(mixBlendMode ? { mixBlendMode as string } : {})", "...(mixBlendMode ? { mixBlendMode } : {})");
fs.writeFileSync(p, c, "utf8");
console.log("Fixed");
