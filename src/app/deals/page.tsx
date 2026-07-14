const deals = [
  { name: "OpenAI", desc: "新用户赠送 $5 免费额度", badge: "新用户", url: "https://platform.openai.com/" },
  { name: "DeepSeek", desc: "新用户首充 ¥1 得 ¥10", badge: "限时", url: "https://platform.deepseek.com/" },
  { name: "Anthropic", desc: "Claude Pro 免费试用 7 天", badge: "试用", url: "https://claude.ai/" },
  { name: "智谱 AI", desc: "GLM-4-Flash 永久免费", badge: "免费", url: "https://open.bigmodel.cn/" },
  { name: "通义千问", desc: "每月 100 万免费 tokens", badge: "免费", url: "https://tongyi.aliyun.com/" },
  { name: "MiniMax", desc: "免费额度 ¥300/月", badge: "免费", url: "https://www.minimax.chat/" },
  { name: "火山引擎", desc: "新用户赠送 ¥200 代金券", badge: "新用户", url: "https://console.volcengine.com/ark/" },
  { name: "月之暗面", desc: "注册即送 15 元", badge: "注册", url: "https://platform.moonshot.cn/" },
];

import Link from "next/link";

export default function DealsPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🆓 免费额度 & 优惠</h1>
        <p className="text-gray-600 dark:text-gray-400">薅羊毛必看：各大 AI 厂商的免费福利汇总</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {deals.map((d) => (
          <Link key={d.name} href={d.url} target="_blank" rel="noopener noreferrer" className="tool-card">
            <div className="tool-info flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="tool-name text-base">{d.name}</span>
                <span className="tag">{d.badge}</span>
              </div>
              <div className="tool-desc">{d.desc}</div>
            </div>
            <span className="text-gray-300">↗</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
