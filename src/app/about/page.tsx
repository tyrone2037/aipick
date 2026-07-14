export default function AboutPage() {
  return (
    <div className="container py-10 max-w-3xl space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold mb-3">关于 AIPick</h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          AIPick 是一个面向开发者和 AI 爱好者的 AI 工具导航站。我们的目标是帮你从浩瀚的 AI 产品中找到最适合的那一个。
        </p>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-3">运营与变现</h2>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <li>• 部分跳转链接为 Affiliate 合作链接，对用户无任何额外费用</li>
          <li>• 核心信息 100% 免费，永远不收费</li>
          <li>• 增值收入反哺站点运营和持续更新</li>
        </ul>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-3">联系我们</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">合作 / 收录 / 建议：通过 GitHub Issue 提交</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">GitHub：github.com/YOUR_USERNAME/aipick</p>
      </div>
    </div>
  );
}
