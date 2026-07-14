const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let lines = fs.readFileSync(p, "utf8").split("\n");

// Find the boundary: new function starts around "const [stage"
// It should end after "loading="lazy"" -> "  );" -> "}"
// Currently after "  );" (line 303) there's leftover old code starting with "  return ("
// We need to: add "}" after line 303 and remove everything from line 304 onwards (which is old code)

// Find the line with "loading=\"lazy\"" that's near "onError={handleError}"
let imgEnd = -1;
for (let i = 270; i < lines.length; i++) {
  if (lines[i].trim() === "loading=\"lazy\"" && i > 0 && lines[i-1].includes("onError")) {
    imgEnd = i;
    break;
  }
}

if (imgEnd < 0) { console.error("Could not find img tag end"); process.exit(1); }

// Next line should be "  );" - the return statement close
// We need to add "}" after it to close the function
// And remove any old code that comes after

const returnClose = imgEnd + 1; // should be "  );"
const funcEnd = imgEnd + 2; // where we put "}"

let newLines = lines.slice(0, returnClose + 1); // keep up to and including "  );"
newLines.push("}"); // close the function

// Check if there's "// 图片 fallback" comment after - that would be the old function, skip all of it
// We're done - write the file
fs.writeFileSync(p, newLines.join("\n"), "utf8");
console.log("Fixed: function ends at line " + newLines.length);
console.log("Last 5 lines:");
newLines.slice(-5).forEach((l, i) => console.log("  " + (newLines.length - 5 + i + 1) + ": " + l));