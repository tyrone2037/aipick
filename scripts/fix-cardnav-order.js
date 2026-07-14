const fs = require("fs");
const filepath = "D:\\Desktopnew\\ai-hub\\src\\app\\page.tsx";
let c = fs.readFileSync(filepath, "utf8");

// Remove cardNavItems from current location (after Hero content comment)
const cardNavItemsRegex = /\nconst cardNavItems = \[[\s\S]*?\];\n\n\/\*\{/;
const match = c.match(/const cardNavItems = \[[\s\S]*?\];/);
if (!match) { console.log("ERROR: cardNavItems not found"); process.exit(1); }
const block = match[0];

// Remove from current position
c = c.replace(block + "\n\n", "");

// Insert before return statement
c = c.replace(
  "  return (",
  block + "\n\n  return ("
);

fs.writeFileSync(filepath, c, "utf8");
console.log("Moved cardNavItems before return");

// Verify
const lines = c.split("\n");
const retIdx = lines.findIndex(l => l.trim() === "return (");
const cardIdx = lines.findIndex(l => l.includes("const cardNavItems"));
console.log("return ( at:", retIdx + 1, "| cardNavItems at:", cardIdx + 1);
