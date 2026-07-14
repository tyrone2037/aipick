const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let lines = fs.readFileSync(p, "utf8").split("\n");

// The issue: line 295 "return (" needs a closing ")" before "}"
// Line 302: "/>" closes the img
// We need to insert "  );" between line 302 and line 303

// Find the line with "}" that closes the function
let funcClose = -1;
for (let i = lines.length - 1; i >= 280; i--) {
  if (lines[i].trim() === "}") { funcClose = i; break; }
}

if (funcClose < 0) { console.error("Not found"); process.exit(1); }

// Insert "  ));" before the closing "}"
lines.splice(funcClose, 0, "  );");

fs.writeFileSync(p, lines.join("\n"), "utf8");
console.log("Fixed: inserted \");\" at line " + funcClose);