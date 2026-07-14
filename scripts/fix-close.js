const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let c = fs.readFileSync(p, "utf8");

// Fix: Add missing </div> before </BorderGlow>
const oldClose = `          </div>
        </BorderGlow>
      </div>

      {showTop && (`;

const newClose = `          </div>
          </div>
        </BorderGlow>
      </div>

      {showTop && (`;

if (!c.includes(oldClose)) { console.error("ERROR: old close tags not found"); process.exit(1); }
c = c.replace(oldClose, newClose);

fs.writeFileSync(p, c, "utf8");
console.log("OK: Added missing </div> for scroll-box");