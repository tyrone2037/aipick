const fs = require("fs");
const filepath = "D:\\Desktopnew\\ai-hub\\src\\app\\page.tsx";
let c = fs.readFileSync(filepath, "utf8");
c = c.replace(/^\uFEFF/, "");

// 1. Add CardNav import after ShinyText
const shinyIdx = c.indexOf("import ShinyText from \"@/components/ShinyText\";");
if (shinyIdx === -1) { console.log("ERROR: ShinyText import not found"); process.exit(1); }
c = c.substring(0, shinyIdx + 44) + "\nimport CardNav from \"@/components/CardNav\";\nimport \"@/components/CardNav.css\";" + c.substring(shinyIdx + 44);

// 2. Add cardNavItems before "export default function"
const exportIdx = c.indexOf("export default function");
if (exportIdx === -1) { console.log("ERROR: export default not found"); process.exit(1); }
const cardNavItems = `\nconst cardNavItems = [\n  {\n    label: \"创作工具\",\n    bgColor: \"#1B1722\",\n    textColor: \"#fff\",\n    links: [\n      { label: \"对话AI\", ariaLabel: \"对话AI\", href: \"#chat\" },\n      { label: \"图像AI\", ariaLabel: \"图像AI\", href: \"#image\" },\n      { label: \"视频AI\", ariaLabel: \"视频AI\", href: \"#video\" },\n    ]\n  },\n  {\n    label: \"开发办公\",\n    bgColor: \"#2F293A\",\n    textColor: \"#fff\",\n    links: [\n      { label: \"编程AI\", ariaLabel: \"编程AI\", href: \"#coding\" },\n      { label: \"写作AI\", ariaLabel: \"写作AI\", href: \"#writing\" },\n      { label: \"办公AI\", ariaLabel: \"办公AI\", href: \"#office\" },\n    ]\n  },\n  {\n    label: \"更多工具\",\n    bgColor: \"#1a1a2e\",\n    textColor: \"#fff\",\n    links: [\n      { label: \"音频AI\", ariaLabel: \"音频AI\", href: \"#audio\" },\n      { label: \"搜索AI\", ariaLabel: \"搜索AI\", href: \"#search\" },\n      { label: \"设计AI\", ariaLabel: \"设计AI\", href: \"#design\" },\n    ]\n  }\n];\n\n`;
c = c.substring(0, exportIdx) + cardNavItems + c.substring(exportIdx);

// 3. Add CardNav inside the hero section
const heroSection = "<section className=\"hero\">";
const heroIdx = c.indexOf(heroSection);
if (heroIdx === -1) { console.log("ERROR: hero section not found"); process.exit(1); }
const insertAfterHero = heroIdx + heroSection.length;
c = c.substring(0, insertAfterHero) + `\n        <div className=\"hero-nav-wrapper\" style={{ position: \"relative\", zIndex: 10, paddingTop: "1rem" }}>\n          <CardNav\n            logo=""\n            logoAlt="AIPick"\n            items={cardNavItems}\n            baseColor="rgba(255,255,255,0.95)"\n            menuColor="#333"\n            buttonBgColor="#4f46e5"\n            buttonTextColor="#fff"\n            ease="power3.out"\n          />\n        </div>` + c.substring(insertAfterHero);

fs.writeFileSync(filepath, c, "utf8");
console.log("SUCCESS");
console.log("Has CardNav import:", c.includes("import CardNav"));
console.log("Has cardNavItems:", c.includes("cardNavItems"));
console.log("Has CardNav JSX:", c.includes("<CardNav"));
