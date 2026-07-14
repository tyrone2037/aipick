const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let c = fs.readFileSync(p, "utf8");

// Remove Lightfall import (we will re-add it differently)
c = c.replace(`import Lightfall from "@/components/Lightfall";\n`, "");

// Remove hero section - its now in layout
const oldHero = `      <section className="hero relative overflow-hidden">
        <Lightfall color="#a78bfa" count={30} speed={0.8} width={2} height={100} />
        <div className="container relative z-10">
          <h1 className="text-3xl font-extrabold mb-2">AIPick</h1>
          <p className="mb-1 opacity-90">收录 {flatTools.length}+ AI 工具 · 按使用场景分类</p>
        </div>
      </section>

      <div className="search-bar">`;

const newSearch = `      <div className="search-bar">`;

c = c.replace(oldHero, newSearch);

fs.writeFileSync(p, c, "utf8");
console.log("OK: Hero removed from page, will show via layout");