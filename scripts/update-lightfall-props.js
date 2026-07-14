const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let c = fs.readFileSync(p, "utf8");

// 1. Add CSS import at top
c = c.replace(
  `import Lightfall from "@/components/Lightfall";`,
  `import Lightfall from "@/components/Lightfall";\nimport "@/components/Lightfall.css";`
);

// 2. Remove the gradient background div (Lightfall has its own backgroundColor)
c = c.replace(
  `        {/* Gradient bg covers nav + hero area */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600 via-purple-600 to-violet-700" />
        {/* Lightfall particles over the gradient */}
        <Lightfall color="#c4b5fd" count={40} speed={0.7} width={2} height={90} />`,
  `        {/* Lightfall WebGL light tunnel effect */}
        <Lightfall
          colors={["#A6C8FF", "#5227FF", "#FF9FFC"]}
          backgroundColor="#2b44f3"
          speed={0.2}
          streakCount={1}
          streakWidth={0.7}
          streakLength={1}
          glow={1.3}
          density={0.5}
          twinkle={0.7}
          zoom={1.8}
          backgroundGlow={1}
          opacity={1}
          mouseInteraction={true}
          mouseStrength={0.6}
          mouseRadius={0.6}
        />`
);

// 3. Make the outer container taller so Lightfall has room
c = c.replace(
  `<div className="relative">`,
  `<div className="relative" style={{ minHeight: "420px" }}>`
);

if (!c.includes("backgroundColor")) { console.error("ERROR: replacement failed"); process.exit(1); }

fs.writeFileSync(p, c, "utf8");
console.log("OK: Lightfall props updated to React Bits defaults");