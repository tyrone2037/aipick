import Link from "next/link";

const categories = [
  { icon: "🔥", name: "大热门 AI", slug: "popular", count: 128, color: "#ef4444" },
  { icon: "💬", name: "对话 AI", slug: "chat", count: 56, color: "#3b82f6" },
  { icon: "🎨", name: "图像 AI", slug: "image", count: 89, color: "#8b5cf6" },
  { icon: "🎬", name: "视频 AI", slug: "video", count: 42, color: "#ec4899" },
  { icon: "💼", name: "办公 AI", slug: "office", count: 67, color: "#10b981" },
  { icon: "🎵", name: "音频 AI", slug: "audio", count: 28, color: "#f59e0b" },
  { icon: "💻", name: "编程 AI", slug: "coding", count: 45, color: "#06b6d4" },
  { icon: "📝", name: "写作 AI", slug: "writing", count: 38, color: "#6366f1" },
  { icon: "🎓", name: "学术 AI", slug: "academic", count: 21, color: "#14b8a6" },
  { icon: "🏢", name: "大厂 AI", slug: "bigtech", count: 18, color: "#374151" },
  { icon: "🔍", name: "搜索 AI", slug: "search", count: 15, color: "#0ea5e9" },
  { icon: "🎨", name: "设计 AI", slug: "design", count: 32, color: "#d946ef" },
  { icon: "💡", name: "提示词", slug: "prompts", count: 50, color: "#f97316" },
  { icon: "📊", name: "Agent", slug: "agent", count: 26, color: "#64748b" },
  { icon: "🤖", name: "求职 AI", slug: "job", count: 12, color: "#a855f7" },
  { icon: "🧩", name: "浏览器 AI", slug: "browser", count: 9, color: "#0d9488" },
  { icon: "🌐", name: "翻译 AI", slug: "translate", count: 14, color: "#22c55e" },
  { icon: "📚", name: "学习 AI", slug: "learn", count: 19, color: "#2563eb" },
];

export default function CategoriesPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📂 全部分类</h1>
        <p className="text-gray-600 dark:text-gray-400">按使用场景找到你需要的 AI 工具，共计 {categories.reduce((s,c)=>s+c.count,0).toLocaleString()}+ 个收录</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((c) => (
          <Link key={c.slug} href={`/categories/${c.slug}`} className="cat-card group">
            <span className="cat-icon">{c.icon}</span>
            <div className="flex-1">
              <div className="cat-name group-hover:text-indigo-600">{c.name}</div>
              <div className="cat-count">{c.count} 个工具</div>
            </div>
            <span className="text-gray-300 group-hover:text-indigo-600">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
