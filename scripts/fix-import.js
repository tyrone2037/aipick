const fs = require("fs");
const filepath = "D:\\Desktopnew\\ai-hub\\src\\app\\page.tsx";
let c = fs.readFileSync(filepath, "utf8");
c = c.replace(/^\uFEFF/, "");

// Fix broken import line - find and fix the ShinyText/CardNav mess
c = c.replace(
  "import ShinyText from \"@/components/ShinyTex\nimport CardNav from \"@/components/CardNav\";\nimport \"@/components/CardNav.css\";t\";",
  "import ShinyText from \"@/components/ShinyText\";\nimport CardNav from \"@/components/CardNav\";\nimport \"@/components/CardNav.css\";"
);

fs.writeFileSync(filepath, c, "utf8");
console.log("Fixed import line");

// Verify
const check = fs.readFileSync(filepath, "utf8");
console.log("Has correct import:", check.includes("import ShinyText from \"@/components/ShinyText\";"));
console.log("Has CardNav import:", check.includes("import CardNav from \"@/components/CardNav\";"));
