const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let c = fs.readFileSync(p, "utf8");

const oldMarker = "function IconFallback({ name, domain, failed, onFail }: { name: string; domain: string; failed: boolean; onFail: (d: string) => void }) {";

const newCode = [
  "// 图片 fallback 组件：icon.horse (高清) → Google favicon (兜底) → emoji",
  "function IconFallback({ name, domain, failed, onFail }: { name: string; domain: string; failed: boolean; onFail: (d: string) => void }) {",
  "  const [stage, setStage] = useState<0 | 1 | 2>(0);",
  "  const [localFailed, setLocalFailed] = useState(false);",
  "  const emoji = name.charAt(0).toUpperCase();",
  "",
  "  useEffect(() => {",
  "    setStage(0);",
  "    setLocalFailed(false);",
  "  }, [domain]);",
  "",
  "  if (failed || localFailed || !domain) {",
  "    return <span className=\"icon-fallback\">{emoji}</span>;",
  "  }",
  "",
  "  const sources = [",
  "    \"https://icon.horse/icon/\" + domain,",
  "    \"https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_url=ICON&url=https://\" + domain + \"&size=128\",",
  "  ];",
  "",
  "  const handleError = () => {",
  "    if (stage < sources.length - 1) {",
  "      setStage(s => (s + 1) as 0 | 1 | 2);",
  "    } else {",
  "      setLocalFailed(true);",
  "      onFail(domain);",
  "    }",
  "  };",
  "",
  "  return (",
  "    <img",
  "      src={sources[stage]}",
  "      width={26} height={26} alt={name}",
  "      className=\"tool-icon rounded flex-shrink-0\"",
  "      onError={handleError}",
  "      loading=\"lazy\"",
  "    />",
  "  );",
  "}",
].join("\n");

const idx = c.indexOf(oldMarker);
if (idx === -1) { console.error("ERROR: marker not found"); process.exit(1); }

let depth = 0, endIdx = idx;
for (let i = idx; i < c.length; i++) {
  if (c[i] === "{") depth++;
  if (c[i] === "}") { depth--; if (depth === 0) { endIdx = i + 1; break; } }
}

c = c.substring(0, idx) + newCode + c.substring(endIdx);
fs.writeFileSync(p, c, "utf8");
console.log("OK: IconFallback replaced");