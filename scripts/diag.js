var fs = require("fs");
var p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
var c = fs.readFileSync(p, "utf8");
var lines = c.split("\n");

// Find all export default function declarations
lines.forEach(function(l, i) {
  if (l.includes("export default") || l.includes("function HomePage")) {
    console.log((i+1) + ": " + l);
  }
});

// Check what comes right before the return statement
console.log("\nLines around return:");
for (var i = 175; i < 185; i++) {
  console.log((i+1) + ": " + JSON.stringify(lines[i]));
}

// Count braces in the whole file
var depth = 0;
var errors = [];
for (var i = 0; i < c.length; i++) {
  if (c[i] === "{") depth++;
  if (c[i] === "}") {
    depth--;
    if (depth < 0) errors.push("Extra close brace at char " + i);
  }
}
console.log("\nFinal brace depth:", depth);
if (errors.length) console.log("Errors:", errors);
