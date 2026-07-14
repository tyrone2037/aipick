var fs = require("fs");
var p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
var buf = fs.readFileSync(p);

// Remove BOM if present
if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
  buf = buf.slice(3);
  console.log("Removed UTF-8 BOM");
}

// Also remove any zero-width no-break space (U+FEFF) at start
var text = buf.toString("utf8");
if (text.charCodeAt(0) === 0xFEFF) {
  text = text.slice(1);
  console.log("Removed U+FEFF");
}

fs.writeFileSync(p, text, "utf8");
console.log("File saved, first 50 chars:", JSON.stringify(text.slice(0, 50)));
