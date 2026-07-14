# AIPick — AI 工具导航站 · 项目建设全景文档

> 这份文档汇总了 AIPick 从 0 到 1 的完整建设方案，任何新会话打开它就能快速回忆起整个项目的架构、技术选型和待办事项。

---

## 一、项目定位

**一句话**：面向国内开发者的 AI 工具导航站，收录 500+ AI 工具、按使用场景分类、帮你快速找到适合的 AI。

- 目标用户：开发者 + AI 产品/投资人（混合受众）
- 商业模式：Affiliate 返佣 → 广告位
- 域名计划：初期用 GitHub Pages 子域名（xxx.github.io/aipick），有流量后买独立域名（约 ¥40/年）

---

## 二、零预算技术栈

| 层 | 选型 | 为什么 | 费用 |
|---|---|---|---|
| 前端框架 | Next.js 15 (App Router) + React 19 | SSR/静态导出，SEO 好 | 免费 |
| 样式 | Tailwind CSS 3.4 | 快速开发，无需写 CSS | 免费 |
| UI 组件 | 自研（基于 Tailwind 工具类） | 轻量，无额外依赖 | 免费 |
| CMS | Notion（3 个数据库） | 像 Excel 一样维护内容 | 免费 |
| API | Notion API → 同步静态 JSON | 解耦内容管理 | 免费 |
| 前端托管 | GitHub Pages | 自动 HTTPS + CDN | 免费 |
| CI/CD | GitHub Actions | 自动同步 Notion + 构建部署 | 免费 |
| 搜索 | Pagefind（构建时索引） | 纯前端搜索，无需后端 | 免费 |
| Newsletter | Buttondown（100 订阅内免费） | 邮件订阅回流 | 免费 |
| 包管理器 | pnpm | 快、省磁盘 | 免费 |

---

## 三、Notion 数据库结构（3 个表）

### 表 1：厂商表（vendors）
| 字段 | 类型 | 说明 |
|---|---|---|
| Name | Title | 厂商名称 |
| Slug | Rich Text | URL 友好名称 |
| Logo | URL | logo 图片 |
| Tagline | Rich Text | 一句话简介 |
| Website | Url | 官网 |
| Affiliate | Url | 推广链接 |
| Region | Select | 中国/海外 |
| Models | Relation → 模型表 | 关联模型 |
| Input Price | Rich Text | 输入价格 |
| Output Price | Rich Text | 输出价格 |

### 表 2：模型表（models）
| 字段 | 类型 | 说明 |
|---|---|---|
| Name | Title | 模型名 |
| Provider | Relation → 厂商表 | 归属厂商 |
| Type | Select | 文本/多模态/图像/语音 |
| Context Length | Rich Text | 上下文长度 |

### 表 3：资讯表（news）
| 字段 | 类型 | 说明 |
|---|---|---|
| Name | Title | 资讯标题 |
| Date | Date | 发布日期 |
| Tags | Multi-select | 分类标签 |
| Source Url | Url | 原文链接 |
| Summary | Rich Text | 摘要 |
| Body | Rich Text | 正文 |

---

## 四、GitHub Pages 部署流程

### 一次性配置
```bash
# 1. 创建 GitHub 仓库（名：aipick）
# 2. 推送代码
git init && git add . && git commit -m "init"
git remote add origin https://github.com/YOUR_USERNAME/aipick.git
git push -u origin main

# 3. 仓库 Settings → Pages → Source: GitHub Actions
# 4. 添加 Secrets：
#    NOTION_TOKEN
#    NOTION_VENDORS_DATABASE_ID
#    NOTION_MODELS_DATABASE_ID
#    NOTION_NEWS_DATABASE_ID
```

### 日常推送
```bash
git add . && git commit -m "update" && git push
# Actions 自动同步 Notion → 构建 → 部署
```

---

## 五、本地开发命令

```powershell
# 首次
cd D:\Desktopnew\ai-hub
pnpm install

# 日常开发（热更新）
pnpm dev
# 浏览器打开 http://localhost:3000

# Sync Notion 数据（如果改了 Notion 内容）
node src/lib/notion-sync.mjs

# 构建（静态导出到 out/）
pnpm build
```

---

## 六、项目文件结构

```
ai-hub/
├── src/
│   ├── app/
│   │   ├── page.tsx          ← 首页（Hero + 搜索 + 左侧分类 + 右侧滚动大框）
│   │   ├── layout.tsx         ← 全局布局（导航栏 + 页脚）
│   │   ├── globals.css        ← Tailwind + 自定义样式
│   │   ├── categories/        ← 分类页面
│   │   ├── rankings/          ← 排行榜
│   │   ├── tools/             ← 工具箱
│   │   ├── news/              ← AI 资讯
│   │   ├── submit/            ← 提交收录表单
│   │   ├── deals/             ← 免费额度
│   │   └── about/             ← 关于页
│   └── lib/
│       └── notion-sync.mjs   ← Notion → 静态 JSON 同步脚本
├── public/
│   └── data/                 ← Notion 同步的 vendors.json / models.json / news.json
├── .github/workflows/
│   └── deploy.yml            ← GitHub Actions 自动部署
├── next.config.mjs           ← 静态导出 + basePath 配置
├── tailwind.config.ts        ← Tailwind 主题
├── NOTION_SETUP.md           ← Notion 搭建详细指南
├── QUICKSTART.md             ← 5 分钟启动
└── SAMPLE_DATA.md            ← 数据填写示例
```

---

## 七、已实现功能清单

- [x] Hero 区 + 磨砂玻璃导航栏
- [x] 全站搜索框（输入即搜，下拉结果）
- [x] 18 大分类，每分类 5-11 个工具（共 150+）
- [x] 真实网站 favicon 图标
- [x] 左侧分类标签栏（sticky 固定）
- [x] 右侧固定高度滚动大框（点击左标签 → 右框平滑滚动到对应类目）
- [x] 工具卡片 5 列网格
- [x] 一键回到顶部悬浮按钮
- [x] 暗色模式（自动跟随系统）

---

## 八、待办 / 下一步

### 短期（1-2 周）
- [ ] 接入 Notion CMS（替换静态数据）
- [ ] 部署到 GitHub Pages
- [ ] 注册 3-5 家 Affiliate 计划

### 中期（1-2 月）
- [ ] 新增分类页面（子页详情）
- [ ] 排行榜页（按分类 Top 5）
- [ ] Newsletter 订阅
- [ ] Pagefind 搜索（静态索引）

### 长期
- [ ] 用户 UGC 评测
- [ ] 独立域名
- [ ] 付费增值服务

---

## 九、关键配置提醒

### next.config.mjs 要点
```js
output: "export"   // 静态导出（GitHub Pages 必须）
basePath: "/aipick" // GitHub Actions 自动设置
images: { unoptimized: true } // 静态导出需要
```

### .env.local（本地开发）
```
NOTION_TOKEN=xxx
NOTION_VENDORS_DATABASE_ID=xxx
NOTION_MODELS_DATABASE_ID=xxx
NOTION_NEWS_DATABASE_ID=xxx
```

### GitHub Actions Secrets
同上 4 个变量，在仓库 Settings → Secrets → Actions 添加。

---

## 十、Affiliate 优先申请列表

1. 智谱 AI（BigModel）
2. 月之暗面（Kimi）
3. MiniMax
4. 深度求索（DeepSeek）
5. 阿里云百炼
6. 火山引擎（豆包）

---

*最后更新：2026-07-08*
*维护者：AIPick 项目*