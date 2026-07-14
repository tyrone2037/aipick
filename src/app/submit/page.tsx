export default function SubmitPage() {
  return (
    <div className="container py-10 max-w-2xl">
      <div className="card">
        <h1 className="text-2xl font-bold mb-4">📫 提交你的 AI 工具</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">你的 AI 产品值得被更多人看到！填写以下信息，我们将在 24 小时内审核收录。</p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">项目名称 *</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400" placeholder="如 Cursor、Kimi、Midjourney" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">官网地址 *</label>
            <input type="url" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400" placeholder="https://" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">所属分类 *</label>
            <select className="w-full border rounded-lg px-3 py-2 text-sm"><option>对话 AI</option><option>图像 AI</option><option>视频 AI</option><option>编程 AI</option><option>写作 AI</option><option>办公 AI</option><option>其他</option></select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">一句话介绍 *</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400" placeholder="不超过 30 字" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">定价模式</label>
            <select className="w-full border rounded-lg px-3 py-2 text-sm"><option>免费</option><option>免费+付费</option><option>纯付费</option></select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">联系邮箱</label>
            <input type="email" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400" placeholder="用于接收审核结果" />
          </div>
          <button type="button" className="btn btn-primary py-2.5 w-full">提交审核</button>
        </form>
        <p className="text-xs text-gray-500 mt-4">提示：提交后通过审核即可收录。如有 Affiliate 合作，也欢迎联系我们。</p>
      </div>
    </div>
  );
}
