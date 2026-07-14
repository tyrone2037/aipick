const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let lines = fs.readFileSync(p, "utf8").split("\n");

// Find the leftover old function: starts with "}: { name: string;" and ends with "}"
let removeStart = -1, removeEnd = -1;
for (let i = 0; i < lines.length; i++) {
  const t = lines[i].trim();
  if (t.startsWith("}: { name: string;")) {
    removeStart = i;
    // find closing brace
    let depth = 0;
    for (let j = i; j < lines.length; j++) {
      for (const ch of lines[j]) {
        if (ch === "{") depth++;
        if (ch === "}") { depth--; if (depth === 0 && j > i) { removeEnd = j; break; } }
      }
      if (removeEnd >= 0) break;
    }
    break;
  }
}

if (removeStart >= 0 && removeEnd >= 0) {
  lines.splice(removeStart, removeEnd - removeStart + 1);
  console.log("Removed residual old function: lines " + (removeStart+1) + "-" + (removeEnd+1));
} else {
  console.log("Not found: removeStart=" + removeStart + " removeEnd=" + removeEnd);
}

fs.writeFileSync(p, lines.join("\n"), "utf8");
console.log("Done, total lines: " + lines.length);