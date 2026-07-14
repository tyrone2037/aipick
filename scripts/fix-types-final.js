var fs = require("fs");
var p = "D:/Desktopnew/ai-hub/src/components/Lightfall.tsx";
var c = fs.readFileSync(p, "utf8");

// Fix 1: Use any for refs to avoid type conflicts
c = c.replace(
  `const rendererRef = useRef<{ destroy: () => void } | null>(null);
  const programRef = useRef<{ remove: () => void } | null>(null);
  const geometryRef = useRef<{ remove: () => void } | null>(null);
  const meshRef = useRef<{ remove: () => void } | null>(null);`,
  `const rendererRef = useRef<any>(null);
  const programRef = useRef<any>(null);
  const geometryRef = useRef<any>(null);
  const meshRef = useRef<any>(null);`
);

// Fix 2: Remove the optional chaining cleanup since we use any
c = c.replace(
  `      programRef.current?.remove(); geometryRef.current?.remove();
      meshRef.current?.remove(); rendererRef.current?.destroy();`,
  `      try { programRef.current?.remove(); } catch(e) {}
      try { geometryRef.current?.remove(); } catch(e) {}
      try { meshRef.current?.remove(); } catch(e) {}
      try { rendererRef.current?.destroy(); } catch(e) {}`
);

// Fix 3: mixBlendMode - cast the whole style
c = c.replace(
  `style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...(mixBlendMode ? { mixBlendMode: mixBlendMode as string } : {}) }}`,
  `style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...(mixBlendMode ? { mixBlendMode: mixBlendMode as any } : {}) }}`
);

fs.writeFileSync(p, c, "utf8");
console.log("OK");