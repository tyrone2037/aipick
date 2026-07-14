const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let c = fs.readFileSync(p, "utf8");

// Replace imports
c = c.replace(
  `import Lightfall from "@/components/Lightfall";\nimport "@/components/Lightfall.css";`,
  `import Rain from "@/components/Rain";\nimport "@/components/Lightfall.css";`
);

// Replace Lightfall component with Rain
c = c.replace(
  `        {/* Lightfall WebGL light tunnel effect */}
        <Lightfall
          colors={["#A6C8FF", "#5227FF", "#FF9FFC"]}
          backgroundColor="#0A29FF"
          speed={0.2}
          streakCount={8}
          streakWidth={1}
          streakLength={1}
          glow={1.3}
          density={1}
          twinkle={1}
          zoom={1.8}
          backgroundGlow={1}
          opacity={1}
          mouseInteraction={true}
          mouseStrength={1}
          mouseRadius={0.6}
        />`,
  `        {/* Rain effect */}
        <Rain
          modeIndex={0}
          rainSpeed={0.2}
          count={600}
          color="#a78bfa"
        />`
);

fs.writeFileSync(p, c, "utf8");
console.log("OK: Switched from Lightfall to Rain");