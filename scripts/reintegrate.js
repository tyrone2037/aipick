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

// 2. Replace header with CardNav (inside the hero section)
const headerBlock = /(<header className="relative z-50">[\s\S]*?<\/header>)/;
c = c.replace(
  headerBlock,
  "<CardNav\n          logo=\"\"\n          logoAlt=\"AIPick\"\n          items={cardNavItems}\n          baseColor=\"rgba(255,255,255,0.95)\"\n          menuColor=\"#333\"\n          buttonBgColor=\"#4f46e5\"\n          buttonTextColor=\"#fff\"\n          ease=\"power3.out\"\n        />"
);

// 3. Add cardNavItems definition before the component function
const cardNavItemsCode = `const cardNavItems = [
  {
    label: "创作工具",
    bgColor: "#1B1722",
    textColor: "#fff",
    links: [
      { label: "对话AI", ariaLabel: "对话AI", href: "#chat" },
      { label: "图像AI", ariaLabel: "图像AI", href: "#image" },
      { label: "视频AI", ariaLabel: "视频AI", href: "#video" },
    ]
  },
  {
    label: "开发办公",
    bgColor: "#2F293A",
    textColor: "#fff",
    links: [
      { label: "编程AI", ariaLabel: "编程AI", href: "#coding" },
      { label: "写作AI", ariaLabel: "写作AI", href: "#writing" },
      { label: "办公AI", ariaLabel: "办公AI", href: "#office" },
    ]
  },
  {
    label: "更多工具",
    bgColor: "#1a1a2e",
    textColor: "#fff",
    links: [
      { label: "音频AI", ariaLabel: "音频AI", href: "#audio" },
      { label: "搜索AI", ariaLabel: "搜索AI", href: "#search" },
      { label: "设计AI", ariaLabel: "设计AI", href: "#design" },
    ]
  }
];

`;

// Insert before "export default function" or "function" that returns JSX
c = c.replace(
  /(export default function|function\s+\w+\s*\([^)]*\)\s*\{)/,
  cardNavItemsCode + "$1"
);

fs.writeFileSync(filepath, c, "utf8");

// Verify
console.log("Has CardNav import:", c.includes("import CardNav"));
console.log("Has cardNavItems:", c.includes("cardNavItems"));
console.log("Has CardNav JSX:", c.includes("<CardNav"));
console.log("Has header:", c.includes("<header"));
