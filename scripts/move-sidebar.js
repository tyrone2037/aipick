const fs = require("fs");
const p = "D:/Desktopnew/ai-hub/src/app/page.tsx";
let c = fs.readFileSync(p, "utf8");

// Step 1: Remove "AI" from category names
c = c.replace(/"🔥 大热门 AI",/g, '"🔥 大热门",');
c = c.replace(/"💬 对话 AI",/g, '"💬 对话",');
c = c.replace(/"🎨 图像 AI",/g, '"🎨 图像",');
c = c.replace(/"🎬 视频 AI",/g, '"🎬 视频",');
c = c.replace(/"💻 编程 AI",/g, '"💻 编程",');
c = c.replace(/"📝 写作 AI",/g, '"📝 写作",');
c = c.replace(/"💼 办公 AI",/g, '"💼 办公",');
c = c.replace(/"🎵 音频 AI",/g, '"🎵 音频",');
c = c.replace(/"🔍 搜索 AI",/g, '"🔍 搜索",');
c = c.replace(/"🎓 教育 AI",/g, '"🎓 教育",');
c = c.replace(/"🏥 医疗 AI",/g, '"🏥 医疗",');
c = c.replace(/"💰 金融 AI",/g, '"💰 金融",');
c = c.replace(/"🎮 游戏 AI",/g, '"🎮 游戏",');
c = c.replace(/"📊 数据 AI",/g, '"📊 数据",');
c = c.replace(/"🛠️ 工具 AI",/g, '"🛠️ 工具",');
c = c.replace(/"🚗 出行 AI",/g, '"🚗 出行",');
c = c.replace(/"🛒 电商 AI",/g, '"🛒 电商",');
c = c.replace(/"🏠 生活 AI",/g, '"🏠 生活",');
c = c.replace(/"📱 社交 AI",/g, '"📱 社交",');

// Step 2: Move sidebar from left to above the scroll box
// Remove old sidebar
const oldSidebar = `        {/* 左侧分类 */}
        <aside className="w-40 flex-shrink-0 hidden lg:block">
          <div className="sticky top-20">
            <div className="sidebar-inner">
              {allCategories.map((c) => (
                <button key={c.id} onClick={() => scrollToCategory(c.id)}
                  className={\`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors \${activeCat === c.id ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold" : "hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400"}\`}>
                  <span className="text-base">{c.icon}</span>
                  <span className="truncate flex-1">{c.name}</span>
                  
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* 右侧滚动区 */}`;

const newLayout = `        {/* 分类导航（顶部横向） */}
        <div className="flexbar">
          <div className="w-full mb-3">
            <div className="category-tabs">
              {allCategories.map((c) => (
                <button key={c.id} onClick={() => scrollToCategory(c.id)}
                  className={\`category-tab \${activeCat === c.id ? "category-tab-active" : ""}\`}>
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧滚动区 */}`;

if (!c.includes(oldSidebar)) { console.error("ERROR: old sidebar not found"); process.exit(1); }
c = c.replace(oldSidebar, newLayout);

fs.writeFileSync(p, c, "utf8");
console.log("OK: Replaced sidebar with top tabs, removed AI from names");