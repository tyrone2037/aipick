# AIPick 项目记忆卡

## 项目
- 名称：AIPick（AI 工具导航站）
- 本地路径：D:\Desktopnew\ai-hub
- 技术栈：Next.js 15 + React 19 + Tailwind CSS 3.4 + Notion CMS + GitHub Pages
- 启动命令：cd D:\Desktopnew\ai-hub && pnpm dev → http://localhost:3000
- 零预算，GitHub Pages 部署

## 已完成功能
- Hero + 磨砂导航栏
- 全站搜索框（实时下拉）
- 18 大分类，共 150+ AI 工具，5 列网格
- 真实 favicon 图标
- 左侧 sticky 分类标签栏
- 右侧固定高度（calc(100vh - 180px)）滚动大框
- 点击左标签 → 右框 smooth scroll 到对应类目
- 一键回到顶部悬浮按钮（fixed bottom-8 right-8，滚动 300px 出现）
- 暗色模式自动跟随系统

## 关键文件
- 首页逻辑：src/app/page.tsx（含分类数据、favurl函数、搜索、滚动逻辑）
- 样式：src/app/globals.css（工具卡片、搜索栏、吸顶动画）
- 布局：src/app/layout.tsx（导航栏 sticky top-0）
- Notion 同步：src/lib/notion-sync.mjs
- 自动部署：.github/workflows/deploy.yml

## 待办
- 接入 Notion 替换静态数据
- 注册 Affiliate 计划
- 部署到 GitHub Pages
- 新增分类子页、排行榜、Newsletter

## 用户偏好
- 编程小白，需要详细步骤
- 零预算
- 喜欢参考 faxianai.com 的设计
- 磨砂玻璃导航栏
- 搜索框吸顶效果（滚动后固定到导航栏下方）
- 工具卡片 5 列布局
- 左侧分类 + 右侧滚动大框的交互模式