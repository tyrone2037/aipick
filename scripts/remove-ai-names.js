var fs = require("fs");
var p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
var c = fs.readFileSync(p, "utf8");

// Simple string replacement for each category name with "AI"
var replacements = [
  ["\u5927\u70ed\u95e8 AI", "\u5927\u70ed\u95e8"],
  ["\u5bf9\u8bdd AI", "\u5bf9\u8bdd"],
  ["\u56fe\u50cf AI", "\u56fe\u50cf"],
  ["\u89c6\u9891 AI", "\u89c6\u9891"],
  ["\u7f16\u7a0b AI", "\u7f16\u7a0b"],
  ["\u5199\u4f5c AI", "\u5199\u4f5c"],
  ["\u529e\u516c AI", "\u529e\u516c"],
  ["\u97f3\u9891 AI", "\u97f3\u9891"],
  ["\u641c\u7d22 AI", "\u641c\u7d22"],
  ["\u8bbe\u8ba1 AI", "\u8bbe\u8ba1"],
  ["\u5b66\u672f AI", "\u5b66\u672f"],
  ["\u5927\u5382 AI", "\u5927\u5382"],
  ["\u533b\u7597 AI", "\u533b\u7597"],
  ["\u91d1\u878d AI", "\u91d1\u878d"],
  ["\u6e38\u620f AI", "\u6e38\u620f"],
  ["\u6570\u636e AI", "\u6570\u636e"],
  ["\u5de5\u5177 AI", "\u5de5\u5177"],
  ["\u51fa\u884c AI", "\u51fa\u884c"],
  ["\u7535\u5546 AI", "\u7535\u5546"],
  ["\u751f\u6d3b AI", "\u751f\u6d3b"],
  ["\u793e\u4ea4 AI", "\u793e\u4ea4"],
];

replacements.forEach(function(r) {
  c = c.split(r[0]).join(r[1]);
});

fs.writeFileSync(p, c, "utf8");
console.log("OK: removed AI from all category names");