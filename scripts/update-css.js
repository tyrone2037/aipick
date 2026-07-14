const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/globals.css";
let c = fs.readFileSync(p, "utf8");

// Replace Tool Card section
const oldToolCard = `/* Tool Card */
.tool-card {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.6rem;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: all 0.15s;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}
.tool-card:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.08);
  transform: translateY(-1px);
}

/* Icon */
.tool-icon {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
  background: #f3f4f6;
}
@media (prefers-color-scheme: dark) {
  .tool-icon { background: #262626; }
}

/* Icon fallback */
.icon-fallback {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  flex-shrink: 0;
  user-select: none;
}

.tool-info { flex: 1; min-width: 0; }
.tool-name { font-weight: 600; font-size: 0.82rem; margin-bottom: 0.05rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tool-desc { font-size: 0.72rem; color: var(--muted); line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }`;

const newToolCard = `/* Tool Card - Redesigned */
.tool-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  padding: 1.25rem 0.75rem 0.75rem;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
}
.tool-card:hover {
  border-color: var(--accent);
  box-shadow: 0 4px 16px rgba(79, 70, 229, 0.12);
  transform: translateY(-2px);
}

.tool-card-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;
}

/* Icon - Redesigned */
.tool-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
  background: #f3f4f6;
}
@media (prefers-color-scheme: dark) {
  .tool-icon { background: #262626; }
}

/* Icon fallback - Redesigned */
.icon-fallback {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  flex-shrink: 0;
  user-select: none;
}

.tool-info { width: 100%; }
.tool-name { font-weight: 600; font-size: 0.82rem; margin-bottom: 0.15rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tool-desc { font-size: 0.68rem; color: var(--muted); line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* Arrow hover indicator */
.tool-card-arrow {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0;
  transform: translate(-4px, 4px);
  transition: all 0.2s ease;
  color: var(--accent);
}
.tool-card:hover .tool-card-arrow {
  opacity: 1;
  transform: translate(0, 0);
}`;

if (!c.includes(oldToolCard)) { console.error("ERROR: old CSS not found"); process.exit(1); }
c = c.replace(oldToolCard, newToolCard);
fs.writeFileSync(p, c, "utf8");
console.log("OK: globals.css updated with new card styles");