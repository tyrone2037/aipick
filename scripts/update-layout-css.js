const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/globals.css";
let c = fs.readFileSync(p, "utf8");

// Replace the flexbar layout - now it just wraps the top tabs + scroll area
const oldFlexbar = `/* 主体布局 */
.flexbar {
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  height: calc(100vh - 200px);
}`;

const newFlexbar = `/* 主体布局 */
.flexbar {
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}`;

c = c.replace(oldFlexbar, newFlexbar);

// Replace old sidebar-inner style with new category tabs
const oldSidebar = `/* 左侧 sidebar-inner */
.sidebar-inner {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}`;

const newSidebar = `/* Category tabs (horizontal) */
.category-tabs {
  display: flex;
  gap: 0.4rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
  flex-wrap: wrap;
}
.category-tabs::-webkit-scrollbar { display: none; }

.category-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text);
  cursor: pointer;
  transition: all 0.15s ease;
}
.category-tab:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.category-tab-active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}`;

c = c.replace(oldSidebar, newSidebar);

// Update scroll-box to take full width without left sidebar
const oldScroll = `.scroll-box {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  overflow-x: hidden;
  border: 2px solid var(--border);
  border-radius: 1rem;
  background: var(--card);
  padding: 1rem;
  scroll-behavior: smooth;
}`;

const newScroll = `.scroll-box {
  overflow-y: auto;
  overflow-x: hidden;
  border: 2px solid var(--border);
  border-radius: 1rem;
  background: var(--card);
  padding: 1rem;
  scroll-behavior: smooth;
  max-height: calc(100vh - 220px);
}`;

c = c.replace(oldScroll, newScroll);

fs.writeFileSync(p, c, "utf8");
console.log("OK: CSS updated with category tab styles");