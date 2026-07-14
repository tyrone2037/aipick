const fs = require("fs");
const filepath = "D:\\Desktopnew\\ai-hub\\src\\app\\page.tsx";
let c = fs.readFileSync(filepath, "utf8");

// Extract cardNavItems block
const match = c.match(/const cardNavItems = \[[\s\S]*?\];/);
if (!match) { console.log("ERROR: cardNavItems not found"); process.exit(1); }
const block = match[0];

// Remove from current (wrong) position
c = c.replace("  " + block + "\n", "");

// Find the last useEffect closing and insert after it
// Look for the pattern: \n  \}\);\n\n  const handleIconFailed
const insertPoint = c.indexOf("\n  const handleIconFailed");
if (insertPoint === -1) {
  console.log("ERROR: insertion point not found");
  process.exit(1);
}

// Insert cardNavItems before handleIconFailed
c = c.slice(0, insertPoint) + "\n" + block + "\n" + c.slice(insertPoint);

fs.writeFileSync(filepath, c, "utf8");
console.log("cardNavItems moved to component body level");

// Verify
const lines = c.split("\n");
const retIdx = lines.findIndex(l => l.trim() === "return (");
const cardIdx = lines.findIndex(l => l.includes("const cardNavItems"));
console.log("| return ( at:", retIdx + 1, "| cardNavItems at:", cardIdx + 1);
console.log("CardNavIsBeforeReturn:", cardIdx < retIdx);
