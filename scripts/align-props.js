const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let c = fs.readFileSync(p, "utf8");

// Replace custom props with official defaults
c = c.replace(
  `        <Lightfall
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
        />`,
  `        <Lightfall
          colors={["#A6C8FF", "#5227FF", "#FF9FFC"]}
          backgroundColor="#0A29FF"
          speed={1}
          streakCount={8}
          streakWidth={1}
          streakLength={1}
          glow={1}
          density={1}
          twinkle={1}
          zoom={2}
          backgroundGlow={1}
          opacity={1}
          mouseInteraction={true}
          mouseStrength={1}
          mouseRadius={0.6}
        />`
);

fs.writeFileSync(p, c, "utf8");
console.log("OK: Props aligned with official defaults");