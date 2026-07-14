const fs = require("fs");
const filepath = "D:\\Desktopnew\\ai-hub\\src\\components\\CardNav.tsx";
let c = fs.readFileSync(filepath, "utf8");

// Fix the broken SVG - merge lines 7-10 into a properly formatted SVG
c = c.replace(
  "const ArrowIcon = () => (\n  <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\"\n    <path d=\"M7 17L17 7\" /><path d=\"M7 7h10v10\" />\n  </svg>\n);",
  "const ArrowIcon = () => (\n  <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\">\n    <path d=\"M7 17L17 7\" /><path d=\"M7 7h10v10\" />\n  </svg>\n);"
);

fs.writeFileSync(filepath, c, "utf8");
console.log("Fixed SVG in CardNav.tsx");

// Quick verify
const check = fs.readFileSync(filepath, "utf8");
const lines = check.split("\n");
console.log("Lines 7-11:");
for (let i = 6; i < 11; i++) console.log((i+1) + ":", lines[i]);
