export default function ToolsPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🚀 工具箱</h1>
        <p className="text-gray-600 dark:text-gray-400">提升效率的小工具，全部免费</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* API 状态监测 */}
        <div className="card">
          <h3 className="text-lg font-bold mb-2">🏷️ API 状态监测</h3>
          <p className="text-sm text-gray-500 mb-4">实时延迟与可用性监控</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>ChatGPT</span><span className="text-green-600">● 142ms</span></div>
            <div className="flex justify-between"><span>Claude</span><span className="text-green-600">● 189ms</span></div>
            <div className="flex justify-between"><span>DeepSeek</span><span className="text-green-600">● 95ms</span></div>
            <div className="flex justify-between"><span>Kimi</span><span className="text-yellow-600">● 缓慢</span></div>
            <div className="flex justify-between"><span>Gemini</span><span className="text-green-600">● 210ms</span></div>
          </div>
        </div>

        {/* 场景选型器 */}
        <div className="card">
          <h3 className="text-lg font-bold mb-2">🎯 场景选型器</h3>
          <p className="text-sm text-gray-500 mb-4">回答需求，AI 替你选工具</p>
          <div className="space-y-2">
            <select className="w-full border rounded p-2 text-sm"><option>我要用 AI 做什么？</option><option>写代码</option><option>做图片</option><option>写文案</option><option>翻译</option></select>
            <select className="w-full border rounded p-2 text-sm"><option>预算范围？</option><option>免费就好</option><option>每月 ¥100 内</option><option>价格无感</option></select>
            <button className="btn btn-primary w-full py-1.5">🤖 给我推荐</button>
          </div>
        </div>

        {/* 模型参数对照 */}
        <div className="card">
          <h3 className="text-lg font-bold mb-2">📊 模型参数对照</h3>
          <p className="text-sm text-gray-500 mb-4">主流大模型参数全表</p>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between"><span>GPT-4o</span><span className="font-mono">128K ctx</span></div>
            <div className="flex justify-between"><span>Claude 3.5</span><span className="font-mono">200K ctx</span></div>
            <div className="flex justify-between"><span>Gemini 2.5</span><span className="font-mono">1M ctx</span></div>
            <div className="flex justify-between"><span>Kimi</span><span className="font-mono">200K ctx</span></div>
            <div className="flex justify-between"><span>DeepSeek-V3</span><span className="font-mono">128K ctx</span></div>
          </div>
        </div>

        {/* 精选 Prompt */}
        <div className="card">
          <h3 className="text-lg font-bold mb-2">📚 精选 Prompt</h3>
          <p className="text-sm text-gray-500 mb-4">复制即用，提升效果翻倍</p>
          <ul className="space-y-1.5 text-sm">
            <li className="truncate">💡 「你是资深 Python 专家，请解释...」</li>
            <li className="truncate">💡 「请以专业译员身份翻译以下...」</li>
            <li className="truncate">💡 「请用 STAR 法则重写我的经历...」</li>
            <li className="truncate">💡 「分析下面代码的问题并提供修复...」</li>
          </ul>
        </div>

        {/* 免费额度 */}
        <div className="card">
          <h3 className="text-lg font-bold mb-2">🆓 低价/免费额度</h3>
          <p className="text-sm text-gray-500 mb-4">薅羊毛必收</p>
          <ul className="space-y-1.5 text-sm">
            <li>🎁 OpenAI 新用户 $5 免费</li>
            <li>🎁 DeepSeek 注册 ¥10 送</li>
            <li>🎁 智谱 GLM-4-Flash 免费</li>
            <li>🎁 通义 100 万 tokens/月免费</li>
            <li>🎁 MiniMax ¥300/月免费</li>
          </ul>
        </div>

        {/* 提交收录 */}
        <div className="card bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800">
          <h3 className="text-lg font-bold mb-2">📫 提交你的 AI 工具</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">你的 AI 产品值得被更多人看到</p>
          <a href="/submit" className="btn btn-primary w-full py-1.5 text-center">立即提交 →</a>
        </div>
      </div>
    </div>
  );
}