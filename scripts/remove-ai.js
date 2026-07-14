var fs = require("fs");
var p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
var c = fs.readFileSync(p, "utf8");

// Category names that need "AI" removed
var names = ["大热门", "对话", "图像", "视频", "编程", "写作", "办公", "音频", "搜索", "设计", "学术", "大厂", "医疗", "金融", "游戏", "数据", "工具", "出行", "电商", "生活", "social"];

names.forEach(function(n) {
  // Match in allCategories data (category definitions)
  var re = new RegExp("(\\"":\\s*") + n + " AI(\"" + ")", "g");
  c = c.replace(re, "$1" + n + "$2");
});

fs.writeFileSync(p, c, "utf8");
console.log("OK: removed AI from category names");
