const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let c = fs.readFileSync(p, "utf8");

// Remove BorderGlow wrapper and restore original scroll-box div
const oldCode = `        {/* 右侧滚动区 */}
        <BorderGlow
          borderRadius={16}
          borderWidth={2}
          animationDuration={6}
          className="flex-1 min-w-0"
        >
          <div ref={contentRef} className="overflow-y-auto scroll-box" style={{ maxHeight: "calc(100vh - 220px)" }}>`;

const newCode = `        {/* 右侧滚动区 */}
        <div ref={contentRef} className="overflow-y-auto scroll-box">`;

c = c.replace(oldCode, newCode);

// Fix the closing tags - remove extra </div> we added before
const oldClose = `          </div>
          </div>
        </BorderGlow>
      </div>

      {showTop && (`;

const newClose = `          </div>
        </div>
      </div>

      {showTop && (`;

c = c.replace(oldClose, newClose);

// Remove the import too
c = c.replace(`import BorderGlow from "@/components/BorderGlow";\n`, "");

if (!c.includes("<BorderGlow")) {
  fs.writeFileSync(p, c, "utf8");
  console.log("OK: BorderGlow removed completely");
} else {
  console.error("ERROR: BorderGlow still present");
  process.exit(1);
}