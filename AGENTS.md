# AIPick 项目 - 开发注意事项

## 项目信息
- **框架**: Next.js 15.1.6 + React 19 + Tailwind CSS 3.4
- **包管理器**: pnpm
- **开发服务器**: http://localhost:3000
- **位置**: D:\Desktopnew\ai-hub

## 已集成组件
| 组件 | 路径 | 依赖 |
|------|------|------|
| Lightfall | src/components/Lightfall.tsx | ogl@1.0.11 |
| ShinyText | src/components/ShinyText.tsx | 无 |
| PillNav | src/components/PillNav.tsx | gsap-shim (本地) |
| gsap-shim | src/vendor/gsap-shim.js | 无 |

## ⚠️ 关键规则（违反必出错）

### 1. BOM 问题（最高优先级）
**所有通过 PowerShell/Node 创建的文件都可能带有 UTF-8 BOM（字节顺序标记 \uFEFF）。**

BOM 会导致：
- postcss.config.mjs 有 BOM → Tailwind CSS 完全不生效 → 页面只剩纯 HTML（图片+文本链接）
- layout.tsx 有 BOM → import "./globals.css" 失败 → 所有自定义 CSS 丢失
- .js 文件有 BOM → Next.js 编译报错 Unexpected token

**修复方法**：
`javascript
const fs = require('fs');
const content = fs.readFileSync(filePath, 'utf8');
fs.writeFileSync(filePath, content.replace(/^\uFEFF/, ''), 'utf8');
`

**检查方法**：
`javascript
const buf = fs.readFileSync(filePath);
const hasBOM = buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
`

**每次创建新文件后必须检查并清除 BOM！**

### 2. gsap-shim.js 必须是纯 JavaScript
- **禁止** TypeScript 语法（: any, : number, 类型注解等）
- 使用 CommonJS 风格或纯 JS 的 export const
- 文件头注释：// Minimal gsap shim — pure JS, no TypeScript

### 3. CSS 文件不能包含 Markdown 代码块
- 从 React Bits 等网站复制的 CSS 可能包含  `  代码围栏
- 复制后必须检查文件首尾是否有  `  并删除

### 4. 修改后必须验证
- 修改任何文件后，运行 
px next build 或检查开发服务器输出
- 如果页面突然"只剩图片和文本链接"，**首先检查 BOM**

## 常见问题排查

| 症状 | 原因 | 修复 |
|------|------|------|
| 页面只有图片和文本链接，无样式 | BOM 导致 CSS 加载失败 | 检查 layout.tsx、postcss.config.mjs 的 BOM |
| Unexpected token ':' in .js | gsap-shim.js 含 TS 语法 | 移除所有类型注解 |
| Unknown word in .css | CSS 文件有  `  代码围栏 | 删除首尾  `  |
| Module not found: ogl | 依赖未安装 | pnpm add ogl@1.0.11 |
| PillNav 点击闪烁 | 滚动事件冲突 | 已用 isProgrammaticScroll ref 修复 |

## 用户偏好
- 尽量中文回答
- 不要重复犯同样的错误
- 修改要精确，不要过度改动

## ⚠️ 文件编码问题（极其重要）

### 问题
在中文 Windows 系统上，通过 PowerShell 创建/修改的文件可能是 GBK 编码而非 UTF-8。这会导致：
- `next build` 报错：`stream did not contain valid UTF-8`
- 中文字符变成乱码 `������`
- CSS 丢失 → 页面只剩图片和文本链接

### 修复方法
使用 Node.js TextDecoder 转换：
```javascript
const fs = require('fs');
const buf = fs.readFileSync(filePath);
const decoder = new TextDecoder('gbk', { fatal: false });
const text = decoder.decode(buf);
fs.writeFileSync(filePath, text, 'utf8');
```

### 检测方法
```javascript
const buf = fs.readFileSync(filePath);
const text = buf.toString('utf8');
const isCorrupted = text.includes('�'); // 有 U+FFFD 替换字符
```

### 根本原因
`Set-Content` 在 PowerShell 中可能用 GBK 编码写入。**始终用 Node.js 的 `fs.writeFileSync(path, str, 'utf8')` 来写入文件。**

## 已集成组件
| 组件 | 路径 | 依赖 |
|------|------|------|
| Lightfall | src/components/Lightfall.tsx | ogl@1.0.11 |
| ShinyText | src/components/ShinyText.tsx | 无 |
| PillNav | src/components/PillNav.tsx | gsap-shim (本地) |
| CardNav | src/components/CardNav.tsx | gsap-shim (本地) |
| gsap-shim | src/vendor/gsap-shim.js | 无 |

## gsap-shim 升级记录
为支持 CardNav 的 timeline play/reverse/stagger 功能，gsap-shim.js 已升级：
- TL 类支持 `play(position)`、`reverse()`、`eventCallback()`、`kill()`
- TL.to() 支持 `stagger` 参数
- TL.to() 支持 position 偏移（如 `"-=0.1"`）
- 所有文件必须用 `[System.IO.File]::WriteAllText(path, content, $utf8NoBom)` 写入