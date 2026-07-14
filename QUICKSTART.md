
# 快速上手指南

## 5 分钟启动

### 1. 安装依赖（在项目目录打开终端）

```bash
pnpm install
```

### 2. 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的 Notion Token 和数据库 ID（详见 NOTION_SETUP.md）。

### 3. 同步 Notion 数据

```bash
node src/lib/notion-sync.mjs
```

### 4. 本地预览

```bash
pnpm dev
```

打开 http://localhost:3000 查看效果。

### 5. 构建部署

```bash
pnpm build
```

构建产物在 `out/` 目录，可直接部署到任何静态托管。

## 推送到 GitHub Pages

```bash
git init
git add .
git commit -m "init: AIPick v0.1"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aipick.git
git push -u origin main
```

然后在 GitHub 仓库 Settings → Pages → Source 选择 **GitHub Actions**。

## 日常更新

1. 在 Notion 中编辑数据
2. `git add . && git commit -m "update" && git push`
3. 等待 1-2 分钟，网站自动更新
