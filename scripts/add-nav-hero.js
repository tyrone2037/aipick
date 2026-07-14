const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let c = fs.readFileSync(p, "utf8");

// Add Lightfall + imports
c = c.replace(
  `import { useState, useMemo, useRef, useEffect } from "react";`,
  `import { useState, useMemo, useRef, useEffect } from "react";\nimport Lightfall from "@/components/Lightfall";`
);

// Replace the opening return div + search bar to add nav + hero above
const oldReturn = `  return (
    <div>
      <div className="search-bar">`;

const newReturn = `  return (
    <div>
      {/* ====== Nav + Hero with extended Lightfall background ====== */}
      <div className="relative">
        {/* Gradient bg covers nav + hero area */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600 via-purple-600 to-violet-700" />
        {/* Lightfall particles over the gradient */}
        <Lightfall color="#c4b5fd" count={40} speed={0.7} width={2} height={90} />

        {/* Nav - transparent */}
        <header className="relative z-50">
          <div className="container flex items-center justify-between h-14">
            <a href="/" className="text-lg font-extrabold tracking-tight flex items-center gap-1.5 text-white">
              <span className="text-2xl">🧭</span>
              <span>AIPick</span>
            </a>
            <nav className="flex items-center gap-5">
              <a href="/categories" className="nav-link !text-white/90 hover:!text-white">全部分类</a>
              <a href="/rankings" className="nav-link !text-white/90 hover:!text-white">排行榜</a>
              <a href="/tools" className="nav-link !text-white/90 hover:!text-white">工具箱</a>
              <a href="/news" className="nav-link !text-white/90 hover:!text-white">资讯</a>
              <a href="/submit" className="nav-link !text-white/90 hover:!text-white">提交收录</a>
            </nav>
          </div>
        </header>

        {/* Hero content */}
        <section className="relative z-10 text-white text-center pt-6 pb-12">
          <div className="container">
            <h1 className="text-3xl font-extrabold mb-2">AIPick</h1>
            <p className="opacity-90">收录 {flatTools.length}+ 工具 · 按使用场景分类</p>
          </div>
        </section>
      </div>

      <div className="search-bar">`;

if (!c.includes(oldReturn)) { console.error("ERROR: old return not found"); process.exit(1); }
c = c.replace(oldReturn, newReturn);

fs.writeFileSync(p, c, "utf8");
console.log("OK: Nav + Hero with extended Lightfall background");