const sampleNews = [
  { date: "2026-07-07", title: "OpenAI 发布 GPT-5 mini，价格降至 GPT-4o 的 1/10", tag: "模型发布", source: "OpenAI Blog" },
  { date: "2026-07-06", title: "Anthropic Claude 4 系列发布，推理能力再次突破", tag: "模型发布", source: "Anthropic" },
  { date: "2026-07-05", title: "DeepSeek-V4 开源，MoE 参数量突破万亿", tag: "开源", source: "GitHub" },
  { date: "2026-07-04", title: "Google Gemini 3 Flash，多模态全面升级", tag: "模型发布", source: "Google" },
  { date: "2026-07-07", title: "AI Agent 元年：从工具到自主决策", tag: "深度分析", source: "机器之心" },
  { date: "2026-07-06", title: "国内AI大模型价格战进入白热化", tag: "融资", source: "36氪" },
  { date: "2026-07-05", title: "Llama 4 开源发布，性能逼近 GPT-5", tag: "开源", source: "Meta" },
  { date: "2026-07-07", title: "中国发布生成式 AI 服务管理办法修订版", tag: "政策", source: "网信办" },
];

export default function NewsPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📰 AI 资讯简报</h1>
        <p className="text-gray-600 dark:text-gray-400">每日聚合 AI 行业大事件，5 分钟看完今日动态</p>
      </div>
      <div className="flex gap-2 mb-6 flex-wrap">
        <button className="btn btn-primary text-sm py-1">全部</button>
        <button className="btn btn-outline text-sm py-1">模型发布</button>
        <button className="btn btn-outline text-sm py-1">融资</button>
        <button className="btn btn-outline text-sm py-1">政策</button>
        <button className="btn btn-outline text-sm py-1">深度分析</button>
        <button className="btn btn-outline text-sm py-1">开源</button>
      </div>
      <div className="space-y-3">
        {sampleNews.map((n, idx) => (
          <article key={idx} className="card flex items-start justify-between gap-4 hover:shadow-md transition-shadow">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1.5 text-xs text-gray-500">
                <span>{n.date}</span>
                <span className="tag">{n.tag}</span>
                <span className="hidden sm:inline">{n.source}</span>
              </div>
              <h2 className="text-base font-semibold leading-snug">{n.title}</h2>
            </div>
            <span className="text-gray-300 flex-shrink-0 mt-1">↗</span>
          </article>
        ))}
      </div>
    </div>
  );
}
