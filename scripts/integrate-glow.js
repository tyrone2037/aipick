const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let c = fs.readFileSync(p, "utf8");

// 1. Add import at the top (after the existing imports)
const importLine = `import { useState, useMemo, useRef, useEffect } from "react";`;
const newImport = `import { useState, useMemo, useRef, useEffect } from "react";\nimport BorderGlow from "@/components/BorderGlow";`;
c = c.replace(importLine, newImport);

// 2. Wrap the scroll-box with BorderGlow
const oldScroll = `        {/* 右侧滚动区 */}
        <div ref={contentRef} className="overflow-y-auto scroll-box">`;

const newScroll = `        {/* 右侧滚动区 */}
        <BorderGlow
          borderRadius={16}
          borderWidth={2}
          animationDuration={6}
          className="flex-1 min-w-0"
        >
          <div ref={contentRef} className="overflow-y-auto scroll-box" style={{ maxHeight: "calc(100vh - 220px)" }}>
`;

c = c.replace(oldScroll, newScroll);

// Close the BorderGlow component - find the scroll-box closing div and add closing tag
const oldScrollClose = `          </div>
        </div>
      </div>

      {showTop && (`;

const newScrollClose = `          </div>
        </BorderGlow>
      </div>

      {showTop && (`;

c = c.replace(oldScrollClose, newScrollClose);

if (!c.includes("import BorderGlow")) { console.error("ERROR: import failed"); process.exit(1); }
if (!c.includes("<BorderGlow")) { console.error("ERROR: component wrap failed"); process.exit(1); }

fs.writeFileSync(p, c, "utf8");
console.log("OK: BorderGlow integrated into page.tsx");