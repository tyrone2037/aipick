const fs = require("fs");
const filepath = "D:\\Desktopnew\\ai-hub\\src\\app\\page.tsx";
let c = fs.readFileSync(filepath, "utf8");
c = c.replace(/^\uFEFF/, "");

if (!c.includes("import CardNav")) {
  c = c.replace(
    "import ShinyText from \"@/components/ShinyText\";",
    "import ShinyText from \"@/components/ShinyText\";\nimport CardNav from \"@/components/CardNav\";\nimport \"@/components/CardNav.css\";"
  );
}

if (!c.includes("cardNavItems")) {
  c = c.replace(
    "export default function Home() {",
    "const cardNavItems = [{label:\"测试\",bgColor:\"#1B1722\",textColor:\"#fff\",links:[{label:\"测试链接\",ariaLabel:\"测试\",href:\"#\"}]}];\n\nexport default function Home() {"
  );
}

if (!c.includes("<CardNav")) {
  c = c.replace(
    "<section className=\"hero\">",
    "<section className=\"hero\">\n        <CardNav logo=\"\" logoAlt=\"AIPick\" items={cardNavItems} baseColor=\"rgba(255,255,255,0.95)\" menuColor=\"#333\" buttonBgColor=\"#4f46e5\" buttonTextColor=\"#fff\" ease=\"power3.out\" />"
  );
}

fs.writeFileSync(filepath, c, "utf8");
console.log("Written");
const check = fs.readFileSync(filepath, "utf8");
console.log("Has CardNav:", check.includes("CardNav"));
console.log("Has cardNavItems:", check.includes("cardNavItems"));
