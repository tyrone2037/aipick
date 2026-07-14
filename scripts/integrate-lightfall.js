const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let c = fs.readFileSync(p, "utf8");

// Add import
c = c.replace(
  `import { useState, useMemo, useRef, useEffect } from "react";`,
  `import { useState, useMemo, useRef, useEffect } from "react";\nimport Lightfall from "@/components/Lightfall";`
);

// Wrap hero section with Lightfall
const oldHero = `      <section className="hero">
        <div className="container relative">
          <h1 className="text-3xl font-extrabold mb-2">AIPick</h1>
          <p className="mb-1 opacity-90">收录 {flatTools.length}+ AI 工具 · 按使用场景分类</p>
        </div>
      </section>`;

const newHero = `      <section className="hero relative overflow-hidden">
        <Lightfall color="#a78bfa" count={30} speed={0.8} width={2} height={100} />
        <div className="container relative z-10">
          <h1 className="text-3xl font-extrabold mb-2">AIPick</h1>
          <p className="mb-1 opacity-90">收录 {flatTools.length}+ AI 工具 · 按使用场景分类</p>
        </div>
      </section>`;

if (!c.includes(oldHero)) { console.error("ERROR: hero section not found"); process.exit(1); }
c = c.replace(oldHero, newHero);

fs.writeFileSync(p, c, "utf8");
console.log("OK: Lightfall integrated into hero");