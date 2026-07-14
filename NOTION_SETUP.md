
# Notion 数据库搭建指南

AIPick 使用 Notion 作为内容管理后台。你只需要会像编辑 Excel 一样填写 Notion 数据库，网页会自动同步展示。

## 一、准备工作

### 1. 注册 Notion
- 访问 https://www.notion.so
- 注册账号（免费计划完全够用）

### 2. 创建 Integration（API Token）
- 访问 https://www.notion.so/my-integrations
- 点击 "+ New integration"
- 填写名称：`AIPick Site`
- 选择关联的工作区
- 复制 **Internal Integration Token**（这个就是 NOTION_TOKEN）

---

## 二、创建三个数据库

在 Notion 侧边栏点击 "+ New database"，分别创建以下三个：

### 数据库 1：厂商表（Vendors）

字段设计（点击页面右上角 "+ Add a property" 添加）：

| 字段名称 | 字段类型 | 填写说明 |
|---|---|---|
| Name | Title | 厂商名称，如 OpenAI |
| Slug | Rich Text | URL 友好名称，如 openai |
| Logo | Rich Text | 厂商 Logo URL 或 emoji |
| Tagline | Rich Text | 一句话简介，不超过 30 字 |
| Website | Url | 官网地址 |
| Affiliate | Url | 带追踪参数的推广链接 |
| Region | Select | 选项：中国 / 海外 |
| Compliance | Multi-select | 选项：等保三级 / ISO27001 / SOC2 / GDPR |
| Input Price | Rich Text | 输入价格，如 $2.5/1M tokens |
| Output Price | Rich Text | 输出价格，如 $10/1M tokens |
| Context Length | Rich Text | 上下文长度，如 128K |
| Pros | Rich Text | 优点（每行一条） |
| Cons | Rich Text | 缺点（每行一条） |
| Rating | Number | 1-5 评分 |
| Features | Multi-select | 选项：文本 / 多模态 / 图像 / 语音 / 视频 / 函数调用 / Agent / 开源 |
| Free Trial | Checkbox | 是否有免费额度 |
| Models | Relation | 关联到"模型表" |

### 数据库 2：模型表（Models）

| 字段名称 | 字段类型 | 填写说明 |
|---|---|---|
| Name | Title | 模型名称，如 GPT-4o |
| Provider | Relation | 关联到"厂商表" |
| Type | Select | 选项：文本 / 多模态 / 图像 / 语音 / 视频 / 嵌入 |
| Input Price | Rich Text | 输入价格 |
| Output Price | Rich Text | 输出价格 |
| Context Length | Rich Text | 上下文长度 |
| Speed | Select | 选项：快 / 中 / 慢 |
| Languages | Multi-select | 选项：中文 / 英文 / 日文 / 多语言 |
| Open Source | Checkbox | 是否开源 |
| Multimodal | Checkbox | 是否支持多模态 |

### 数据库 3：资讯表（News）

| 字段名称 | 字段类型 | 填写说明 |
|---|---|---|
| Name | Title | 资讯标题 |
| Date | Date | 发布日期 |
| Tags | Multi-select | 选项：模型发布 / 融资 / 政策 / 评测 / 教程 / 开源 / 深度分析 |
| Source | Rich Text | 来源名称，如 OpenAI Blog |
| Source Url | Url | 原文链接 |
| Summary | Rich Text | 200 字以内摘要 |
| Body | Rich Text | 正文（500-1000 字） |

---

## 三、获取数据库 ID

每个数据库的 ID 在分享链接中：

1. 打开数据库页面
2. 点击右上角 "Share" → "Copy link"
3. 链接格式：`https://www.notion.so/xxxxx?v=yyyyy`
4. 其中 `xxxxx` 就是数据库 ID（32 位十六进制字符串）

分别记录三个数据库 ID：
- 厂商表 ID → `NOTION_VENDORS_DATABASE_ID`
- 模型表 ID → `NOTION_MODELS_DATABASE_ID`
- 资讯表 ID → `NOTION_NEWS_DATABASE_ID`

---

## 四、授权 Integration 访问数据库

**关键步骤**：创建数据库后，必须授权 Integration 才能读取数据。

1. 打开每个数据库页面
2. 点击右上角 "..." → "Connections" → "Add connections"
3. 搜索并选择你创建的 `AIPick Site` Integration
4. 对三个数据库都执行此操作

---

## 五、配置 GitHub Secrets

在 GitHub 仓库中设置以下 Secrets：

1. 进入仓库 Settings → Secrets and variables → Actions
2. 点击 "New repository secret"
3. 添加以下 4 个 Secret：

| Secret 名称 | 值 |
|---|---|
| NOTION_TOKEN | 你在步骤一复制的 Integration Token |
| NOTION_VENDORS_DATABASE_ID | 厂商表数据库 ID |
| NOTION_MODELS_DATABASE_ID | 模型表数据库 ID |
| NOTION_NEWS_DATABASE_ID | 资讯表数据库 ID |

---

## 六、日常更新流程

1. 在 Notion 中编辑/新增数据
2. 提交代码到 GitHub main 分支（或等待自动同步）
3. GitHub Actions 自动：
   - 从 Notion 拉取最新数据
   - 构建静态站
   - 部署到 GitHub Pages
4. 约 1-2 分钟后网站自动更新

---

## 七、常见问题

**Q: Notion 免费计划够用吗？**
A: 完全够用。免费计划支持无限页面、10 个访客、API 调用频率 3 次/秒，对中小站足够。

**Q: 数据多久同步一次？**
A: 每次 push 到 main 分支时自动同步。你也可以在 GitHub Actions 页面手动触发。

**Q: 可以本地测试吗？**
A: 可以。在本地创建 `.env.local` 文件，填入上述 4 个环境变量，然后运行：
```bash
node src/lib/notion-sync.mjs
pnpm build
```

**Q: 如果 Notion API 限流怎么办？**
A: 免费计划 3 次/秒，正常更新不会触发限流。如果数据量很大（1000+ 条），同步脚本会自动分页。
