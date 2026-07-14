"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import ShinyText from "@/components/ShinyText";
import IconFallback from "@/components/IconFallback";
import NewsPanel from "@/components/NewsPanel";

const allCategories = [
  { id: "hot", icon: "🔥", name: "大热门", tools: [
    { name: "ChatGPT", desc: "OpenAI 旗舰对话", url: "https://chat.openai.com", domain: "openai.com" },
    { name: "Claude", desc: "长文本标杆", url: "https://claude.ai", domain: "claude.ai" },
    { name: "Midjourney", desc: "图像王者", url: "https://midjourney.com", domain: "midjourney.com" },
    { name: "Cursor", desc: "AI 编程 IDE", url: "https://www.cursor.com", domain: "cursor.com" },
    { name: "DeepSeek", desc: "国产开源之光", url: "https://chat.deepseek.com", domain: "deepseek.com" },
    { name: "Kimi", desc: "超长上下文", url: "https://kimi.moonshot.cn", domain: "moonshot.cn" },
    { name: "Gemini", desc: "Google 多模态", url: "https://gemini.google.com", domain: "gemini.google.com" },
    { name: "Grok", desc: "马斯克倚剑", url: "https://grok.x.ai", domain: "x.ai" },
  ]},
  { id: "chat", icon: "💬", name: "对话", tools: [
    { name: "ChatGPT", desc: "OpenAI 旗舰", url: "https://chat.openai.com", domain: "openai.com" },
    { name: "Claude", desc: "长文本标杆", url: "https://claude.ai", domain: "claude.ai" },
    { name: "Gemini", desc: "Google 多模态", url: "https://gemini.google.com", domain: "gemini.google.com" },
    { name: "DeepSeek", desc: "国产开源", url: "https://chat.deepseek.com", domain: "deepseek.com" },
    { name: "Kimi", desc: "超长上下文", url: "https://kimi.moonshot.cn", domain: "moonshot.cn" },
    { name: "通义千问", desc: "阿里出品", url: "https://tongyi.aliyun.com", domain: "aliyun.com" },
    { name: "豆包", desc: "字节跳动", url: "https://www.doubao.com", domain: "doubao.com" },
    { name: "文心一言", desc: "百度大模型", url: "https://yiyan.baidu.com", domain: "baidu.com" },
    { name: "智谱清言", desc: "智谱 AI", url: "https://chatglm.cn", domain: "chatglm.cn" },
    { name: "讯飞星火", desc: "科大讯飞", url: "https://xinghuo.xfyun.cn", domain: "xfyun.cn" },
    { name: "腾讯元宝", desc: "腾讯 AI", url: "https://yuanbao.tencent.com", domain: "tencent.com" },
  ]},
  { id: "image", icon: "🎨", name: "图像", tools: [
    { name: "Midjourney", desc: "图像王者", url: "https://midjourney.com", domain: "midjourney.com" },
    { name: "DALL·E 3", desc: "OpenAI 生图", url: "https://openai.com/dall-e-3", domain: "openai.com" },
    { name: "Stable Diffusion", desc: "开源免费", url: "https://stability.ai", domain: "stability.ai" },
    { name: "Leonardo.AI", desc: "游戏/设计", url: "https://leonardo.ai", domain: "leonardo.ai" },
    { name: "文心一格", desc: "百度 AI", url: "https://yige.baidu.com", domain: "baidu.com" },
    { name: "通义万相", desc: "阿里绘画", url: "https://tongyi.aliyun.com/wanxiang", domain: "aliyun.com" },
    { name: "LiblibAI", desc: "SD 平台", url: "https://liblib.art", domain: "liblib.art" },
  ]},
  { id: "video", icon: "🎬", name: "视频", tools: [
    { name: "Sora", desc: "OpenAI 视频", url: "https://openai.com/sora", domain: "openai.com" },
    { name: "Runway", desc: "专业编辑", url: "https://runwayml.com", domain: "runwayml.com" },
    { name: "Pika", desc: "Pika 视频", url: "https://pika.art", domain: "pika.art" },
    { name: "可灵 AI", desc: "快手视频", url: "https://kling.kuaishou.com", domain: "kuaishou.com" },
    { name: "即梦 AI", desc: "字节视频", url: "https://jimeng.jianying.com", domain: "jianying.com" },
    { name: "海螺 AI", desc: "MiniMax", url: "https://hailuoai.com/video", domain: "hailuoai.com" },
  ]},
  { id: "coding", icon: "💻", name: "编程", tools: [
    { name: "Cursor", desc: "AI 编程 IDE", url: "https://www.cursor.com", domain: "cursor.com" },
    { name: "GitHub Copilot", desc: "代码修复", url: "https://github.com/features/copilot", domain: "github.com" },
    { name: "Windsurf", desc: "Codeium IDE", url: "https://codeium.com/windsurf", domain: "codeium.com" },
    { name: "Bolt.new", desc: "全栈开发", url: "https://bolt.new", domain: "bolt.new" },
    { name: "v0", desc: "Vercel UI 生成", url: "https://v0.dev", domain: "v0.dev" },
    { name: "通义灵码", desc: "阿里编程", url: "https://tongyi.aliyun.com/lingma", domain: "aliyun.com" },
    { name: "MarsCode", desc: "字节 IDE", url: "https://www.marscode.cn", domain: "marscode.cn" },
    { name: "Cline", desc: "VS Code 扩展", url: "https://cline.bot", domain: "cline.bot" },
    { name: "Tabnine", desc: "自动修复", url: "https://www.tabnine.com", domain: "tabnine.com" },
  ]},
  { id: "writing", icon: "✍️", name: "写作", tools: [
    { name: "Notion AI", desc: "智能写作", url: "https://www.notion.so/product/ai", domain: "notion.so" },
    { name: "Jasper", desc: "内容生成", url: "https://www.jasper.ai", domain: "jasper.ai" },
    { name: "Writesonic", desc: "快速写作", url: "https://writesonic.com", domain: "writesonic.com" },
    { name: "Grammarly", desc: "语法修改", url: "https://www.grammarly.com", domain: "grammarly.com" },
    { name: "秘塔写作猫", desc: "AI 写作猫", url: "https://xiezuocat.com", domain: "xiezuocat.com" },
  ]},
  { id: "audio", icon: "🎵", name: "音频", tools: [
    { name: "Suno", desc: "AI 音乐生成", url: "https://suno.com", domain: "suno.com" },
    { name: "Udio", desc: "AI 唱歌", url: "https://www.udio.com", domain: "udio.com" },
    { name: "ElevenLabs", desc: "合成语音", url: "https://elevenlabs.io", domain: "elevenlabs.io" },
    { name: "Murf", desc: "声音合成", url: "https://murf.ai", domain: "murf.ai" },
  ]},
  { id: "productivity", icon: "⚡", name: "效率", tools: [
    { name: "Notion", desc: "一体化工作", url: "https://www.notion.so", domain: "notion.so" },
    { name: "Raycast", desc: "快捷启动", url: "https://www.raycast.com", domain: "raycast.com" },
    { name: "Zapier", desc: "自动化流程", url: "https://zapier.com", domain: "zapier.com" },
    { name: "Gamma", desc: "AI 演示文稿", url: "https://gamma.app", domain: "gamma.app" },
  ]},
  { id: "design", icon: "🖌️", name: "设计", tools: [
    { name: "Figma", desc: "界面设计", url: "https://www.figma.com", domain: "figma.com" },
    { name: "Canva", desc: "平面设计", url: "https://www.canva.com", domain: "canva.com" },
    { name: "Remove.bg", desc: "去背景", url: "https://www.remove.bg", domain: "remove.bg" },
    { name: "Ideogram", desc: "文字海报", url: "https://ideogram.ai", domain: "ideogram.ai" },
  ]},
  { id: "search", icon: "🔍", name: "搜索", tools: [
    { name: "Perplexity", desc: "AI 搜索引擎", url: "https://www.perplexity.ai", domain: "perplexity.ai" },
    { name: "Phind", desc: "开发者搜索", url: "https://www.phind.com", domain: "phind.com" },
    { name: "Devv", desc: "中文 AI 搜索", url: "https://devv.ai", domain: "devv.ai" },
  ]},
  { id: "agent", icon: "🤖", name: "Agent", tools: [
    { name: "AutoGPT", desc: "自主代理", url: "https://agpt.co", domain: "agpt.co" },
    { name: "Devin", desc: "AI 软件工程师", url: "https://devin.ai", domain: "devin.ai" },
    { name: "Manus", desc: "通用 AI 助手", url: "https://manus.im", domain: "manus.im" },
    { name: "Coze", desc: "字节智能体", url: "https://www.coze.cn", domain: "coze.cn" },
  ]},
  { id: "3d", icon: "🧊", name: "3D", tools: [
    { name: "Meshy", desc: "AI 3D 生成", url: "https://www.meshy.ai", domain: "meshy.ai" },
    { name: "Luma AI", desc: "3D 采集", url: "https://lumalabs.ai", domain: "lumalabs.ai" },
    { name: "Tripo", desc: "快速 3D", url: "https://www.tripo3d.ai", domain: "tripo3d.ai" },
  ]},
];

const description = "好用的 AI 工具 · 150+ 精选 · 12 大分类";

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("hot");
  const [showTop, setShowTop] = useState(false);
  const [failedIcons, setFailedIcons] = useState(new Set());
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const isClickScrolling = useRef(false);

  const handleIconFailed = (domain: string) => {
    setFailedIcons((prev) => new Set(prev).add(domain));
  };

  const allTools = useMemo(() => {
    return allCategories.flatMap((cat) =>
      cat.tools.map((t) => ({ ...t, category: cat.name }))
    );
  }, []);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allTools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [query, allTools]);

  const scrollToCategory = (catId: string) => {
    const section = sectionRefs.current[catId];
    if (section) {
      isClickScrolling.current = true;
      setActiveCat(catId);
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 800);
    }
  };

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const box = contentRef.current;
    if (!box) return;
    const handleScroll = () => {
      setShowTop(box.scrollTop > 300);
      if (isClickScrolling.current) return;
      const boxTop = box.getBoundingClientRect().top;
      let closest = null;
      let closestDist = Infinity;
      for (const cat of allCategories) {
        const el = sectionRefs.current[cat.id];
        if (!el) continue;
        const dist = Math.abs(el.getBoundingClientRect().top - boxTop);
        if (dist < closestDist) {
          closestDist = dist;
          closest = cat.id;
        }
      }
      if (closest) setActiveCat(closest);
    };
    box.addEventListener("scroll", handleScroll);
    return () => box.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="hero">
        <div className="container">
          <div className="ferrofluid-container">
            <div className="ferrofluid-bg" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center tracking-tight mb-2">
            <ShinyText text="AI Pick" />
          </h1>
          <p className="text-center text-muted text-sm md:text-base max-w-xl mx-auto mb-1">
            {description}
          </p>
        </div>
      </div>
      <div className="search-bar">
        <div className="container">
          <div className="relative max-w-xl mx-auto">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索 AI 工具..."
              className="search-input w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm transition-all duration-200"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            )}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-80 overflow-y-auto">
                {searchResults.slice(0, 10).map((t, i) => (
                  <a key={i} href={t.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b last:border-0 transition-colors"
                    onClick={() => setQuery("")}>
                    <IconFallback name={t.name} domain={t.domain} failed={failedIcons.has(t.domain)} onFail={handleIconFailed} />
                    <span className="text-sm font-medium truncate flex-1">{t.name}</span>
                    <span className="tag">{t.category}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="main-layout">
        <div className="flexbar">
        <div className="category-tabs-wrapper" ref={tabsRef}>
          {allCategories.map((cat) => (
            <button
              key={cat.id}
              data-active={activeCat === cat.id}
              className={"category-tab" + (activeCat === cat.id ? " is-active" : "")}
              onClick={() => scrollToCategory(cat.id)}
            >
              <span className="tab-icon">{cat.icon}</span>
              <span className="tab-label">{cat.name}</span>
            </button>
          ))}
        </div>
        <div ref={contentRef} className="scroll-box">
          <div className="p-5 space-y-6">
            {allCategories.map((cat) => (
              <section key={cat.id} data-cat-id={cat.id} ref={(el) => { sectionRefs.current[cat.id] = el; }}>
                <div className="section-header">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{cat.icon}</span>
                    <h2 className="text-sm font-bold">{cat.name}</h2>
                    <span className="count-badge">{cat.tools.length}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
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
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
        <NewsPanel />
      </div>

      {showTop && (
        <button onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl flex items-center justify-center transition-all hover:scale-110 animate-fadeIn"
          aria-label="回到顶部">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </button>
      )}
    </div>
  );
}