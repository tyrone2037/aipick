var fs = require("fs");
var path = require("path");
var files = [
  "D:/Desktopnew/ai-hub/src/components/BorderGlow.tsx",
  "D:/Desktopnew/ai-hub/src/app/globals.css",
  "D:/Desktopnew/ai-hub/src/app/page.tsx"
];

files.forEach(function(f) {
  var buf = fs.readFileSync(f);
  var hasBom = buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
  var hasFeff = buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
  
  // Check for zero-width characters at start
  var text = buf.toString("utf8");
  var firstReal = text.charCodeAt(0);
  
  if (hasBom || firstReal === 0xFEFF) {
    console.log("BOM found in:", path.basename(f));
    // Remove it
    if (hasBom) buf = buf.slice(3);
    text = buf.toString("utf8");
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
    fs.writeFileSync(f, text, "utf8");
    console.log("  Fixed!");
  } else {
    console.log("OK:", path.basename(f));
  }
});
