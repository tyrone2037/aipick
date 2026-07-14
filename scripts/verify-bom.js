var fs = require("fs");
var p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
var text = fs.readFileSync(p, "utf8");

// Check for any remaining BOM-like characters
var firstChar = text.charCodeAt(0);
console.log("First char code:", firstChar, "(should be 34 for double quote)");

// Check line 1 specifically
var lines = text.split("\n");
console.log("Line 1 char codes:", Array.from(lines[0]).slice(0, 15).map(function(c) { return c.charCodeAt(0); }).join(" "));

// Verify the file syntax is clean
console.log("Has \"use client\":", lines[0].includes("\"use client\""));
console.log("Line 1 trimmed:", JSON.stringify(lines[0].trim()));
