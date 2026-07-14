const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let lines = fs.readFileSync(p, "utf8").split("\n");

// Find and remove the leftover old function signature line (line 305 area)
// Look for the line starting with ": { name: string;" after the new function
let removeStart = -1, removeEnd = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim().startsWith(": { name: string; domain: string; failed: boolean;")) {
    removeStart = i;
  }
  if (removeStart >= 0 && lines[i].trim() === "}") {
    removeEnd = i;
    break;
  }
}

if (removeStart >= 0 && removeEnd >= 0) {
  // Also remove the old comment line above if it exists
  if (removeStart > 0 && lines[removeStart - 1].includes("图片 fallback")) {
    removeStart--;
  }
  lines.splice(removeStart, removeEnd - removeStart + 1);
  console.log("Removed old function from line " + (removeStart+1) + " to " + (removeEnd+1));
} else {
  console.log("Could not find leftover old function, checking...");
  // If the new function has a comment line duplicated, remove one
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].includes("// 图片 fallback") && lines[i+1].includes("// 图片 fallback")) {
      lines.splice(i, 1);
      console.log("Removed duplicate comment at line " + (i+1));
      break;
    }
  }
}

fs.writeFileSync(p, lines.join("\n"), "utf8");
console.log("Done");