var lines = require("fs").readFileSync("D:/Desktopnew/ai-hub/src/app/page.tsx", "utf8").split("\n");
var found = false;
lines.forEach(function(l, i) {
  if (l.indexOf("AI\", tools:") > 0) {
    console.log((i+1) + ": " + l.trim());
    found = true;
  }
});
if (!found) console.log("OK: No category names contain AI");