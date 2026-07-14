import Link from "next/link";

// ===== 静态演示数据（后续通过 notion-sync.mjs 替换为真实数据）=====
const vendors = [
  {
    slug: "openai",
    name: "OpenAI",
    logo: "🟢",
    tagline: "GPT 系列开创者，行业标准",
    models: ["GPT-4o", "GPT-4o-mini", "o1", "o3"],
    inputPrice: "$2.5 / 1M tokens",
    outputPrice: "$10 / 1M tokens",
    contextLength: "128K",
    region: "海外",
    tags: ["文本", "多模态", "Function Call", "Agent"],
    rating: 4.8,
    affiliate: "https://platform.openai.com/",
  },
  {
    slug: "anthropic",
    name: "Anthropic",
    logo: "🟣",
    tagline: "Claude 系列，长文本标杆",
    models: ["Claude 3.5 Sonnet", "Claude 3 Opus", "Claude 3.5 Haiku"],
    inputPrice: "$3 / 1M tokens",
    outputPrice: "$15 / 1M tokens",
    contextLength: "200K",
    region: "海外",
    tags: ["文本", "长文本", "安全", "多模态"],
    rating: 4.7,
    affiliate: "https://console.anthropic.com/",
  },
  {
    slug: "deepseek",
    name: "深度求索",
    logo: "🔵",
    tagline: "国产性价比标杆，MoE 架构",
    models: ["DeepSeek-V3", "DeepSeek-R1", "DeepSeek-VL2"],
    inputPrice: "¥1 / 1M tokens",
    outputPrice: "¥2 / 1M tokens",
    contextLength: "128K",
    region: "中国",
    tags: ["文本", "推理", "多模态", "开源"],
    rating: 4.6,
    affiliate: "https://platform.deepseek.com/",
  },
  {
    slug: "zhipu",
    name: "智谱 AI",
    logo: "🟠",
    tagline: "清华系，GLM 系列模型",
    models: ["GLM-4-Plus", "GLM-4-Flash", "GLM-4V"],
    inputPrice: "¥1 / 1M tokens",
    outputPrice: "¥1 / 1M tokens",
    contextLength: "128K",
    region: "中国",
    tags: ["文本", "多模态", "开源", "免费额度"],
    rating: 4.4,
    affiliate: "https://open.bigmodel.cn/",
  },
  {
    slug: "moonshot",
    name: "月之暗面",
    logo: "🌙",
    tagline: "Kimi，超长上下文代表",
    models: ["moonshot-v1-8k", "moonshot-v1-32k", "moonshot-v1-128k"],
    inputPrice: "¥12 / 1M tokens",
    outputPrice: "¥12 / 1M tokens",
    contextLength: "128K",
    region: "中国",
    tags: ["文本", "超长上下文", "文件处理"],
    rating: 4.5,
    affiliate: "https://platform.moonshot.cn/",
  },
  {
    slug: "doubao",
    name: "火山引擎·豆包",
    logo: "🟤",
    tagline: "字节跳动，多模态能力强",
    models: ["豆包-pro-128k", "豆包-vision", "豆包-lite"],
    inputPrice: "¥0.8 / 1M tokens",
    outputPrice: "¥2 / 1M tokens",
    contextLength: "128K",
    region: "中国",
    tags: ["文本", "多模态", "图像", "语音"],
    rating: 4.3,
    affiliate: "https://console.volcengine.com/ark/",
  },
];

export default function ApisPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🏪 API 厂商商场</h1>
        <p className="text-gray-600 dark:text-gray-400">
          50+ 主流 AI API 商横向档案，点击卡片查看详情或直达官网
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="text-sm font-medium">筛选：</span>
        <button className="btn btn-outline text-sm px-3 py-1.5 active">全部</button>
        <button className="btn btn-outline text-sm px-3 py-1.5">国产</button>
        <button className="btn btn-outline text-sm px-3 py-1.5">海外</button>
        <button className="btn btn-outline text-sm px-3 py-1.5">免费</button>
        <button className="btn btn-outline text-sm px-3 py-1.5">开源</button>
      </div>

      {/* Vendor Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((v) => (
          <Link key={v.slug} href={`/apis/${v.slug}`} className="card group">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">{v.logo}</span>
              <div className="flex-1">
                <h3 className="font-bold text-lg group-hover:text-blue-600 flex items-center gap-2">
                  {v.name}
                  <span className="tag">{v.region}</span>
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">{v.tagline}</p>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div><strong>输入：</strong>{v.inputPrice}</div>
              <div><strong>输出：</strong>{v.outputPrice}</div>
              <div><strong>上下文：</strong>{v.contextLength}</div>
            </div>

            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">支持模型：</p>
              <div className="flex flex-wrap gap-1">
                {v.models.map((m) => (
                  <span key={m} className="tag">{m}</span>
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-500 mb-2">
              {"★".repeat(Math.floor(v.rating))} {v.rating}
            </div>

            <div className="flex flex-wrap gap-1">
              {v.tags.map((t) => (
                <span key={t} className="tag bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{t}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
