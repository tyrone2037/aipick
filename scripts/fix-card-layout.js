const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/globals.css";
let c = fs.readFileSync(p, "utf8");

// Change card from vertical to horizontal layout
const oldCard = `.tool-card {
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
}`;

const newCard = `.tool-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.65rem;
  padding: 0.7rem 0.8rem;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
}`;

c = c.replace(oldCard, newCard);

// Change tool-card-top from column to row
const oldTop = `.tool-card-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;
}`;

const newTop = `.tool-card-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.65rem;
  text-align: left;
  flex: 1;
  min-width: 0;
}`;

c = c.replace(oldTop, newTop);

// Update tool-info to not be 100% width
c = c.replace(`.tool-info { width: 100%; }`, `.tool-info { flex: 1; min-width: 0; }`);

// Update icon size - slightly smaller for horizontal layout
c = c.replace(
  `.tool-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;`,
  `.tool-icon {\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;`
);
c = c.replace(
  `.icon-fallback {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;`,
  `.icon-fallback {\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;`
);

// Update description to single line
c = c.replace(
  `.tool-desc { font-size: 0.68rem; color: var(--muted); line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }`,
  `.tool-desc { font-size: 0.68rem; color: var(--muted); line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }`
);

fs.writeFileSync(p, c, "utf8");
console.log("OK: Card layout changed to horizontal (icon left, text right)");