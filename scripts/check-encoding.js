var fs = require("fs");
var p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
var buf = fs.readFileSync(p);

// Check for BOM or hidden characters at start
console.log("First 10 bytes:", Array.from(buf.slice(0, 10)).map(function(b) { return b.toString(16); }).join(" "));
console.log("File size:", buf.length, "bytes");

// Check if there are any non-ASCII characters in the first few lines
var text = buf.toString("utf8");
var firstChars = text.slice(0, 200);
var hasWeirdChars = false;
for (var i = 0; i < firstChars.length; i++) {
  var code = firstChars.charCodeAt(i);
  if (code > 127 && code !== 8212 && code !== 8226) {
    // Allow em-dash and bullet
  }
}

// Check if the file has any syntax issues by looking for common patterns
var lines = text.split("\n");
console.log("Line 1 length:", lines[0].length, "chars");
console.log("Line 1 content:", JSON.stringify(lines[0]));
console.log("Line 2 length:", lines[1].length, "chars");
console.log("Line 2 content:", JSON.stringify(lines[1]));
