const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let c = fs.readFileSync(p, "utf8");

// Remove the count badge from sidebar buttons
const oldCode = `<span className="text-[10px] text-gray-400">{c.tools.length}</span>`;
const newCode = "";

if (!c.includes(oldCode)) { console.error("ERROR: not found"); process.exit(1); }
c = c.replace(oldCode, newCode);
fs.writeFileSync(p, c, "utf8");
console.log("OK: Removed tool count from sidebar");