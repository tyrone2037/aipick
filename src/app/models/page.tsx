import Link from "next/link";

const sampleModels = [
  { name: "GPT-4o", provider: "OpenAI", input: "$2.5/1M", output: "$10/1M", ctx: "128K", tags: ["文本","多模态","函数调用"] },
  { name: "Claude 3.5 Sonnet", provider: "Anthropic", input: "$3/1M", output: "$15/1M", ctx: "200K", tags: ["文本","长上下文","安全"] },
  { name: "DeepSeek-V3", provider: "DeepSeek", input: "¥1/1M", output: "¥2/1M", ctx: "128K", tags: ["文本","推理","开源"] },
  { name: "GLM-4-Plus", provider: "Zhipu", input: "¥1/1M", output: "¥1/1M", ctx: "128K", tags: ["文本","多模态","开源"] },
  { name: "moonshot-v1-128k", provider: "Moonshot", input: "¥12/1M", output: "¥12/1M", ctx: "128K", tags: ["文本","超长上下文"] },
  { name: "豆包-pro-128k", provider: "Volcengine", input: "¥0.8/1M", output: "¥2/1M", ctx: "128K", tags: ["文本","多模态","语音"] },
];

export default function ModelsPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📊 模型参数对照表</h1>
        <p className="text-gray-600 dark:text-gray-400">120+ AI 大模型，按价格、上下文、功能筛选排序</p>
      </div>
      <div className="overflow-x-auto card p-0">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200">
            <tr className="text-left">
              <th className="px-4 py-3">模型</th>
              <th className="px-4 py-3">厂商</th>
              <th className="px-4 py-3">输入价格</th>
              <th className="px-4 py-3">输出价格</th>
              <th className="px-4 py-3">上下文</th>
              <th className="px-4 py-3">标签</th>
              <th className="px-4 py-3">跳转</th>
            </tr>
          </thead>
          <tbody>
            {sampleModels.map((m) => (
              <tr key={m.name} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{m.name}</td>
                <td className="px-4 py-3">{m.provider}</td>
                <td className="px-4 py-3">{m.input}</td>
                <td className="px-4 py-3">{m.output}</td>
                <td className="px-4 py-3">{m.ctx}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {m.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Link href="/compare" className="text-blue-600 hover:underline text-xs">对比</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
