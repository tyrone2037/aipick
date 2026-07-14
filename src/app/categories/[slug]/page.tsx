import Link from "next/link";

const sampleByCategory = {
  chat: [
    { name: "ChatGPT", icon: "🟢", desc: "OpenAI 旗舰对话模型", url: "https://chat.openai.com", pricing: "免费/付费" },
    { name: "Claude", icon: "🟣", desc: "长文本与安全性标杆", url: "https://claude.ai", pricing: "免费/付费" },
    { name: "Gemini", icon: "🔵", desc: "Google 旗舰多模态模型", url: "https://gemini.google.com", pricing: "免费/付费" },
    { name: "DeepSeek", icon: "🔷", desc: "国产开源性价比之王", url: "https://chat.deepseek.com", pricing: "免费/低付费" },
    { name: "Kimi", icon: "🌙", desc: "月之暗面，超长上下文", url: "https://kimi.moonshot.cn", pricing: "免费/付费" },
    { name: "通义千问", icon: "🟠", desc: "阿里出品，多模态", url: "https://tongyi.aliyun.com", pricing: "免费" },
  ],
};

export default function CategoryDetail({ params }: { params: { slug: string } }) {
  const tools = sampleByCategory[params.slug] || [];
  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link href="/categories" className="text-sm text-indigo-600 hover:underline">← 返回全部分类</Link>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1 capitalize">{params.slug}</h1>
        <p className="text-gray-600 dark:text-gray-400">{tools.length} 个收录工具</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tools.map((t) => (
          <Link key={t.name} href={t.url} target="_blank" rel="noopener noreferrer" className="tool-card">
            <span className="tool-icon">{t.icon}</span>
            <div className="tool-info">
              <div className="tool-name">{t.name}</div>
              <div className="tool-desc">{t.desc}</div>
              <div className="tool-badges"><span className="tag">{t.pricing}</span></div>
            </div>
            <span className="text-gray-300">↗</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
