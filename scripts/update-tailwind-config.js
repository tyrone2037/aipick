const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/tailwind.config.ts";
let c = fs.readFileSync(p, "utf8");

// Add components path to content array
c = c.replace(
  `"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",`,
  `"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",\n    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",`
);

fs.writeFileSync(p, c, "utf8");
console.log("OK: Added components path to tailwind content");