const fs = require("fs");
const filepath = "D:\\Desktopnew\\ai-hub\\src\\app\\page.tsx";
let c = fs.readFileSync(filepath, "utf8");

// Remove BOM if exists
c = c.replace(/^\uFEFF/, "");

// 1. Add CardNav import after ShinyText import
c = c.replace(
  "import ShinyText from \"@/components/ShinyText\";",
  "import ShinyText from \"@/components/ShinyText\";\nimport CardNav from \"@/components/CardNav\";\nimport \"@/components/CardNav.css\";"
);

// 2. Add cardNavItems definition before the component function
const cardNavItemsCode = `const cardNavItems = [
  {
    label: "\u521B\u4F5C\u5DE5\u5177",
    bgColor: "#1B1722",
    textColor: "#fff",
    links: [
      { label: "\u5BF9\u8BDD AI", ariaLabel: "\u5BF9\u8BDD AI", href: "#chat" },
      { label: "\u56FE\u50CF AI", ariaLabel: "\u56FE\u50CF AI", href: "#image" },
      { label: "\u89C6\u9891 AI", ariaLabel: "\u89C6\u9891 AI", href: "#video" },
    ]
  },
  {
    label: "\u5F00\u53D1\u529E\u516C",
    bgColor: "#2F293A",
    textColor: "#fff",
    links: [
      { label: "\u7F16\u7A0B AI", ariaLabel: "\u7F16\u7A0B AI", href: "#coding" },
      { label: "\u5199\u4F5C AI", ariaLabel: "\u5199\u4F5C AI", href: "#writing" },
      { label: "\u529E\u516C AI", ariaLabel: "\u529E\u516C AI", href: "#office" },
    ]
  },
  {
    label: "\u66F4\u591A\u5DE5\u5177",
    bgColor: "#1a1a2e",
    textColor: "#fff",
    links: [
      { label: "\u97F3\u9891 AI", ariaLabel: "\u97F3\u9891 AI", href: "#audio" },
      { label: "\u641C\u7D22 AI", ariaLabel: "\u641C\u7D22 AI", href: "#search" },
      { label: "\u8BBE\u8BA1 AI", ariaLabel: "\u8BBE\u8BA1 AI", href: "#design" },
    ]
  }
];

`;

// Insert before "export default function" or "function" that returns JSX
c = c.replace(
  /(export default function|function\s+\w+\s*\([^)]*\)\s*\{)/,
  cardNavItemsCode + "$1"
);

// 3. Add CardNav inside the hero section, before the container
c = c.replace(
  "      <section className=\"hero\">\n        <div className=\"container\">\n          <h1><ShinyText text=\"AIPick\" /></h1>",
  "      <section className=\"hero relative\">\n        <div className=\"hero-nav-wrapper\">\n          <CardNav\n            logo=\"\"\n            logoAlt=\"AIPick\"\n            items={cardNavItems}\n            baseColor=\"rgba(255,255,255,0.95)\"\n            menuColor=\"#333\"\n            buttonBgColor=\"#4f46e5\"\n            buttonTextColor=\"#fff\"\n            ease=\"power3.out\"\n          />\n        </div>\n        <div className=\"container\">\n          <h1><ShinyText text=\"AIPick\" /></h1>"
);

fs.writeFileSync(filepath, c, "utf8");

// Verify
console.log("Has CardNav import:", c.includes("import CardNav"));
console.log("Has cardNavItems:", c.includes("cardNavItems"));
console.log("Has CardNav JSX:", c.includes("<CardNav"));
