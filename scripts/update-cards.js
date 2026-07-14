const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let c = fs.readFileSync(p, "utf8");

// Replace the tool card rendering (lines 238-248)
const oldCard = `<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {cat.tools.map((tool) => (
                    <a key={tool.name + cat.id} href={tool.url} target="_blank" rel="noopener noreferrer" className="tool-card">
                      <IconFallback name={tool.name} domain={tool.domain} failed={failedIcons.has(tool.domain)} onFail={handleIconFailed} />
                      <div className="tool-info flex-1 min-w-0">
                        <div className="tool-name">{tool.name}</div>
                        <div className="tool-desc">{tool.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>`;

const newCard = `<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {cat.tools.map((tool) => (
                    <a key={tool.name + cat.id} href={tool.url} target="_blank" rel="noopener noreferrer" className="tool-card">
                      <div className="tool-card-top">
                        <IconFallback name={tool.name} domain={tool.domain} failed={failedIcons.has(tool.domain)} onFail={handleIconFailed} />
                        <div className="tool-info">
                          <div className="tool-name">{tool.name}</div>
                          <div className="tool-desc">{tool.desc}</div>
                        </div>
                      </div>
                      <div className="tool-card-arrow">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                      </div>
                    </a>
                  ))}
                </div>`;

if (!c.includes(oldCard)) { console.error("ERROR: old card code not found"); process.exit(1); }
c = c.replace(oldCard, newCard);
fs.writeFileSync(p, c, "utf8");
console.log("OK: Card JSX updated");