const fs = require("fs");
const filepath = "D:\\Desktopnew\\ai-hub\\src\\app\\page.tsx";
let c = fs.readFileSync(filepath, "utf8");
c = c.replace(/^\uFEFF/, "");

// Replace test cardNavItems with real categories
c = c.replace(
  /const cardNavItems = \[\{label:"测试",bgColor:"#1B1722",textColor:"#fff",links:\[\{label:"测试链接",ariaLabel:"测试",href:"#"\}\]\}\];/,
  `const cardNavItems = [
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
];`
);

fs.writeFileSync(filepath, c, "utf8");
console.log("Replaced with real categories");
console.log("Has CardNav:", c.includes("CardNav"));
console.log("Has 创作工具:", c.includes("创作工具"));
console.log("Has 测试:", c.includes("测试"));
