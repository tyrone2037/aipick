const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let c = fs.readFileSync(p, "utf8");

// Remove the inner nested flexbar - the structure should be:
// <div className="category-tabs"> directly without extra flexbar wrapper
const nestedFlexbar = `        {/* 分类导航（顶部横向） */}
        <div className="flexbar">
          <div className="w-full mb-3">
            <div className="category-tabs">`;

const fixed = `        {/* 分类导航（顶部横向） */}
        <div className="category-tabs">`;

if (!c.includes(nestedFlexbar)) { console.error("ERROR: nested flexbar not found"); process.exit(1); }
c = c.replace(nestedFlexbar, fixed);

// Also remove the extra closing div that was for the inner flexbar wrapper
// Find the closing of category-tabs div and remove the extra </div> before scroll-box
const oldClose = `            </div>
          </div>
        </div>

        {/* 右侧滚动区 */}`;

const newClose = `        </div>

        {/* 右侧滚动区 */}`;

if (!c.includes(oldClose)) { console.error("ERROR: old close tags not found"); process.exit(1); }
c = c.replace(oldClose, newClose);

// Also remove flex-1 min-w-0 from scroll-box since its not in flex layout anymore
c = c.replace(
  `<div ref={contentRef} className="flex-1 min-w-0 overflow-y-auto scroll-box">`,
  `<div ref={contentRef} className="overflow-y-auto scroll-box">`
);

fs.writeFileSync(p, c, "utf8");
console.log("OK: Fixed nested flexbar and cleaned up structure");