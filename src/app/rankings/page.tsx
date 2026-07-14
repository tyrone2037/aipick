import Link from "next/link";

const rankings = [
  {
    category: "对话 AI Top 5",
    slug: "chat",
    items: [
      { rank: 1, name: "ChatGPT", icon: "🟢", desc: "最强对话模型，生态最完善", change: "—" },
      { rank: 2, name: "Claude 3.5 Sonnet", icon: "🟣", desc: "长文本处理王者", change: "↑1" },
      { rank: 3, name: "Gemini 2.5 Pro", icon: "🔵", desc: "Google 旗舰，多模态突出", change: "↓1" },
      { rank: 4, name: "DeepSeek-V3", icon: "🔷", desc: "国产开源性价比之王", change: "NEW" },
      { rank: 5, name: "Grok 3", icon: "⚫", desc: "马斯克旗下，实时性强", change: "↑2" },
    ],
  },
  {
    category: "图像生成 Top 5",
    slug: "image",
    items: [
      { rank: 1, name: "Midjourney", icon: "🔵", desc: "图像质量王者", change: "—" },
      { rank: 2, name: "DALL·E 3", icon: "🟢", desc: "OpenAI 出品，ChatGPT 集成", change: "—" },
      { rank: 3, name: "Stable Diffusion XL", icon: "🟡", desc: "开源免费", change: "↑1" },
      { rank: 4, name: "Flux", icon: "⚡", desc: "Black Forest 开源模型", change: "NEW" },
      { rank: 5, name: "Leonardo.AI", icon: "🎨", desc: "游戏/设计场景优秀", change: "↓2" },
    ],
  },
];

export default function RankingsPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🏆 AI 工具排行榜</h1>
        <p className="text-gray-600 dark:text-gray-400">按分类查看 Top 5，每 10 分钟更新一次</p>
      </div>
      {rankings.map((r) => (
        <section key={r.category} className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title mb-0">{r.category}</h2>
            <Link href={`/categories/${r.slug}`} className="text-sm text-indigo-600 hover:underline">查看全部 →</Link>
          </div>
          <div className="space-y-2">
            {r.items.map((t) => (
              <div key={t.rank} className="tool-card">
                <span className={`rank-badge rank-${t.rank <= 3 ? t.rank : "default"}`}>{t.rank}</span>
                <span className="tool-icon">{t.icon}</span>
                <div className="tool-info flex-1">
                  <div className="tool-name">{t.name}</div>
                  <div className="tool-desc">{t.desc}</div>
                </div>
                <span className={`text-xs font-bold ${t.change === "NEW" ? "text-red-500" : t.change.startsWith("↑") ? "text-green-500" : t.change.startsWith("↓") ? "text-gray-400" : "text-gray-400"}`}>
                  {t.change}
                </span>
                <span className="text-gray-300">↗</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
