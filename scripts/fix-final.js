var fs = require("fs");
var p = "D:/Desktopnew/ai-hub/src/components/Lightfall.tsx";
var c = fs.readFileSync(p, "utf8");

// Fix 1: callIfFn types
c = c.replace(
  `      const callIfFn = (obj: { remove?: () => void } | null, key: string) => {
        if (obj && typeof (obj as unknown as Record<string, () => void>)[key] === "function") {
          (obj as unknown as Record<string, () => void>)[key]();
        }
      };`,
  `      const callIfFn = (obj: unknown, key: string) => {
        if (obj && typeof (obj as Record<string, unknown>)[key] === "function") {
          (obj as Record<string, () => void>)[key]();
        }
      };`
);

// Fix 2: mixBlendMode type
c = c.replace(
  `mixBlendMode?: string;`,
  `mixBlendMode?: string | undefined;`
);

c = c.replace(
  `...(mixBlendMode ? { mixBlendMode } : {})`,
  `...(mixBlendMode ? { mixBlendMode as string } : {})`
);

fs.writeFileSync(p, c, "utf8");
console.log("OK: Types fixed");