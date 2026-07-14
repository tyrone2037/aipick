const fs = require("fs");
const filepath = "D:\\Desktopnew\\ai-hub\\src\\app\\page.tsx";
let c = fs.readFileSync(filepath, "utf8");

// 1. Add CardNav imports
c = c.replace(
  "\"@/components/Lightfall.css\";",
  "\"@/components/Lightfall.css\";\nimport CardNav from \"@/components/CardNav\";\nimport \"@/components/CardNav.css\";"
);

// 2. Define cardNavItems
const cardNavItemsDef = `\nconst cardNavItems = [\n  {\n    label: \"创作工具\",\n    bgColor: \"#1B1722\",\n    textColor: \"#fff\",\n    links: [\n      { label: \"对话AI\", ariaLabel: \"对话AI\", href: \"#chat\" },\n      { label: \"图像AI\", ariaLabel: \"图像AI\", href: \"#image\" },\n      { label: \"视频AI\", ariaLabel: \"视频AI\", href: \"#video\" },\n    ]\n  },\n  {\n    label: \"开发办公\",\n    bgColor: \"#2F293A\",\n    textColor: \"#fff\",\n    links: [\n      { label: \"编程AI\", ariaLabel: \"编程AI\", href: \"#coding\" },\n      { label: \"写作AI\", ariaLabel: \"写作AI\", href: \"#writing\" },\n      { label: \"办公AI\", ariaLabel: \"办公AI\", href: \"#office\" },\n    ]\n  },\n  {\n    label: \"更多工具\",\n    bgColor: \"#1a1a2e\",\n    textColor: \"#fff\",\n    links: [\n      { label: \"音频AI\", ariaLabel: \"音频AI\", href: \"#audio\" },\n      { label: \"搜索AI\", ariaLabel: \"搜索AI\", href: \"#search\" },\n      { label: \"设计AI\", ariaLabel: \"设计AI\", href: \"#design\" },\n    ]\n  }\n];\n`;

c = c.replace(
  "        {/* Hero content */}",
  cardNavItemsDef + "\n        {/* Hero content */}"
);

// 3. Replace header with CardNav
const headerRegex = /        <header className="relative z-50">[\s\S]*?<\/header>/;
c = c.replace(
  headerRegex,
  "        <CardNav\n          logo=\"\"\n          logoAlt=\"AIPick\"\n          items={cardNavItems}\n          baseColor=\"rgba(255,255,255,0.95)\"\n          menuColor=\"#333\"\n          buttonBgColor=\"#4f46e5\"\n          buttonTextColor=\"#fff\"\n          ease=\"power3.out\"\n        />"
);

fs.writeFileSync(filepath, c, "utf8");
console.log("Done");
console.log("Has CardNav import:", c.includes("import CardNav"));
console.log("Has cardNavItems:", c.includes("cardNavItems"));
console.log("Has CardNav JSX:", c.includes("<CardNav"));
