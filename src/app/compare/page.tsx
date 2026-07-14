import Link from "next/link";

const compareModels = [
  { name: "GPT-4o", provider: "OpenAI", input: "$2.5/1M", output: "$10/1M", ctx: "128K", speed: 4, multimodal: true, agent: true, openSource: false },
  { name: "Claude 3.5 Sonnet", provider: "Anthropic", input: "$3/1M", output: "$15/1M", ctx: "200K", speed: 4, multimodal: true, agent: true, openSource: false },
  { name: "DeepSeek-V3", provider: "DeepSeek", input: "¥1/1M", output: "¥2/1M", ctx: "128K", speed: 3, multimodal: true, agent: true, openSource: true },
  { name: "GLM-4-Plus", provider: "Zhipu", input: "¥1/1M", output: "¥1/1M", ctx: "128K", speed: 3, multimodal: true, agent: true, openSource: true },
  { name: "Qwen-Max", provider: "Alibaba", input: "¥20/1M", output: "¥60/1M", ctx: "32K", speed: 3, multimodal: true, agent: true, openSource: false },
  { name: "Llama 3.1 70B", provider: "Meta", input: "免费", output: "免费", ctx: "128K", speed: 4, multimodal: false, agent: true, openSource: true },
];

export default function ComparePage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🆚 模型 PK 对比</h1>
        <p className="text-gray-600 dark:text-gray-400">勾选 2-4 个模型，在同一个维度横向 PK</p>
      </div>

      <div className="card mb-6">
        <h3 className="font-bold mb-3">筛选条件</h3>
        <div className="flex flex-wrap gap-3">
          <select className="border rounded px-3 py-1.5 text-sm"><option>不限速度</option><option>3星以上</option></select>
          <select className="border rounded px-3 py-1.5 text-sm"><option>多模态</option><option>必须支持</option></select>
          <select className="border rounded px-3 py-1.5 text-sm"><option>价格默认</option><option>最低价优先</option></select>
          <select className="border rounded px-3 py-1.5 text-sm"><option>是否开源</option><option>仅看开源</option></select>
        </div>
      </div>

      <div className="overflow-x-auto card p-0">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900 border-b">
            <tr className="text-left">
              <th className="px-4 py-3"><input type="checkbox" className="accent-blue-600" /> 模型</th>
              <th className="px-4 py-3">厂商</th>
              <th className="px-4 py-3">输入价格</th>
              <th className="px-4 py-3">输出价格</th>
              <th className="px-4 py-3">上下文</th>
              <th className="px-4 py-3">速度</th>
              <th className="px-4 py-3">多模态</th>
              <th className="px-4 py-3">Agent</th>
              <th className="px-4 py-3">开源</th>
            </tr>
          </thead>
          <tbody>
            {compareModels.map((m) => (
              <tr key={m.name} className="border-b dark:border-gray-800 hover:bg-gray-50">
                <td className="px-4 py-3"><input type="checkbox" className="accent-blue-600 mr-2" /><span className="font-medium">{m.name}</span></td>
                <td className="px-4 py-3">{m.provider}</td>
                <td className="px-4 py-3 font-mono">{m.input}</td>
                <td className="px-4 py-3 font-mono">{m.output}</td>
                <td className="px-4 py-3">{m.ctx}</td>
                <td className="px-4 py-3">{"⭐".repeat(m.speed)}</td>
                <td className="px-4 py-3">{m.multimodal ? "✅" : "❌"}</td>
                <td className="px-4 py-3">{m.agent ? "✅" : "❌"}</td>
                <td className="px-4 py-3">{m.openSource ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
