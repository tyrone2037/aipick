# AIPick - AI 聚合网站

面向开发者和 AI 从业者的 API 选型与资讯平台。

## 一、快速开始

### 前提条件

- Node.js >= 20 （推荐 v22+）
- pnpm

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

```bash
cp .env.example .env.local
```

然后在 `.env.local` 中填入你在 Notion 获取的 token 和数据库 ID。

### 3. 本地开发

```bash
pnpm dev
```

打开 http://localhost:3000 查看效果。

### 4. 构建静态站

```bash
pnpm build
```

构建产物在 `out/` 目录下，可直接部署到任何静态托管。

## 二、Notion 数据同步

```bash
pnpm sync:notion
```

从 Notion 拉取最新数据，保存到 `public/data/*.json`，然后重新 `pnpm build` 部署。

## 三、部署到 GitHub Pages

1. 创建一个名为 `aipick` 的 GitHub 仓库
2. 推送代码

```bash
git init
git add .
git commit -m "init"
git remote add origin https://github.com/YOUR_USERNAME/aipick.git
git push -u origin main
```

3. 在仓库 Settings → Pages → Build and Deployment → Source 选择 **GitHub Actions**
4. 项目自带的 `.github/workflows/deploy.yml` 会自动构建并部署

你的站点将在 `https://YOUR_USERNAME.github.io/aipick/` 上线。

## 四、项目结构

```
ai-hub/
├── src/
│   ├── app/              # Next.js 页面
│   │   ├── layout.tsx     # 全局布局
│   │   ├── page.tsx       # 首页
│   │   ├── globals.css    # 全局样式
│   │   ├── apis/          # API 商页
│   │   ├── models/        # 模型对照表
│   │   └── news/          # AI 资讯
│   ├── components/       # 通用组件
│   └── lib/              # 工具函数 + Notion 同步
├── public/               # 静态资源
│   └── data/             # Notion 同步过来的 JSON
└── .github/workflows/    # GitHub Actions 自动部署
```

## 五、Notion 数据库模板

首次使用前，需要在 Notion 创建三个数据库：

1. **厂商表（vendors）**：存储 API 商信息
2. **模型表（models）**：存储 AI 模型参数
3. **资讯表（news）**：存储 AI 资讯文章

详细字段说明见 `NOTION_SETUP.md`。

## 六、技术栈

- Next.js 15 (React 19)
- Tailwind CSS
- Notion API (CMS)
- GitHub Pages (托管)
- GitHub Actions (CI/CD)

## 七、许可证

MIT
