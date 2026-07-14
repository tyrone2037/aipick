const fs = require("fs");
const filepath = "D:\\Desktopnew\\ai-hub\\src\\app\\page.tsx";
let c = fs.readFileSync(filepath, "utf8");
c = c.replace(/^\uFEFF/, "");

// Check if ShinyText import exists
const hasShinyText = c.includes("import ShinyText from");
console.log("Has ShinyText import:", hasShinyText);

// Check what the hero section looks like
const heroIdx = c.indexOf("className=\"hero\"");
console.log("Hero section at:", heroIdx);
console.log("Hero context:", c.substring(heroIdx - 50, heroIdx + 200));
