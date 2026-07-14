#!/usr/bin/env node
/**
 * Notion → 静态 JSON 同步脚本
 * 
 * 使用方式：
 *   1. 在 .env.local 中设置 NOTION_TOKEN 和数据库 ID
 *   2. 运行: node src/lib/notion-sync.mjs
 *   3. 数据将保存到 public/data/*.json
 *   4. 重新 pnpm build 即可上线
 * 
 * GitHub Actions 会在每次 main 分支有 push 时自动运行此脚本
 */

import { Client } from "@notionhq/client";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const DATA_DIR = join(ROOT, "public", "data");

// 从环境变量读取配置
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const VENDOR_DB = process.env.NOTION_VENDORS_DATABASE_ID;
const MODEL_DB = process.env.NOTION_MODELS_DATABASE_ID;
const NEWS_DB = process.env.NOTION_NEWS_DATABASE_ID;

if (!NOTION_TOKEN) {
  console.error("ERROR: NOTION_TOKEN 未设置");
  console.error("请在 .env.local 中设置 NOTION_TOKEN");
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

function Text(rich) {
  if (!rich) return "";
  if (Array.isArray(rich)) return rich.map((r) => r.plain_text).join("");
  return rich.plain_text || "";
}

async function fetchAll(databaseId) {
  if (!databaseId) {
    console.warn(`  跳过: 数据库 ID 未配置`);
    return [];
  }
  const results = [];
  let cursor = undefined;
  do {
    const resp = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      page_size: 100,
    });
    results.push(...resp.results);
    cursor = resp.has_more ? resp.next_cursor : undefined;
  } while (cursor);
  return results;
}

function mapVendor(page) {
  const p = page.properties;
  return {
    id: page.id,
    name: Text(p.Name?.title) || "",
    slug: p.Slug?.rich_text?.[0]?.plain_text || "",
    logo: p.Logo?.url || p.Logo?.rich_text?.[0]?.plain_text || "",
    tagline: Text(p.Tagline?.rich_text),
    website: p.Website?.url || "",
    affiliate: p.Affiliate?.url || "",
    region: p.Region?.select?.name || "未知",
    compliance: p.Compliance?.multi_select?.map((x) => x.name) || [],
    models: p.Models?.relation?.map((r) => r.id) || [],
    inputPrice: Text(p.InputPrice?.rich_text),
    outputPrice: Text(p.OutputPrice?.rich_text),
    contextLength: Text(p.ContextLength?.rich_text),
    pros: Text(p.Pros?.rich_text),
    cons: Text(p.Cons?.rich_text),
    rating: p.Rating?.number || 0,
    features: p.Features?.multi_select?.map((x) => x.name) || [],
    freeTrial: p.FreeTrial?.checkbox || false,
  };
}

function mapModel(page) {
  const p = page.properties;
  return {
    id: page.id,
    name: Text(p.Name?.title) || "",
    provider: p.Provider?.relation?.[0]?.id || "",
    type: p.Type?.select?.name || "文本",
    inputPrice: Text(p.InputPrice?.rich_text),
    outputPrice: Text(p.OutputPrice?.rich_text),
    contextLength: Text(p.ContextLength?.rich_text),
    speed: p.Speed?.select?.name || "中",
    languages: p.Languages?.multi_select?.map((x) => x.name) || [],
    openSource: p.OpenSource?.checkbox || false,
    multimodal: p.Multimodal?.checkbox || false,
  };
}

function mapNews(page) {
  const p = page.properties;
  return {
    id: page.id,
    title: Text(p.Name?.title) || "",
    date: p.Date?.date?.start || "",
    tags: p.Tags?.multi_select?.map((x) => x.name) || [],
    source: Text(p.Source?.rich_text),
    sourceUrl: p.SourceUrl?.url || "",
    summary: Text(p.Summary?.rich_text),
    body: Text(p.Body?.rich_text),
  };
}

async function main() {
  console.log("=== AIPick Notion Sync ===");
  mkdirSync(DATA_DIR, { recursive: true });

  console.log("\n[1/3] 同步厂商数据...");
  const vendorPages = await fetchAll(VENDOR_DB);
  const vendors = vendorPages.map(mapVendor);
  writeFileSync(join(DATA_DIR, "vendors.json"), JSON.stringify(vendors, null, 2));
  console.log(`  ✓ 同步了 ${vendors.length} 个厂商`);

  console.log("\n[2/3] 同步模型数据...");
  const modelPages = await fetchAll(MODEL_DB);
  const models = modelPages.map(mapModel);
  writeFileSync(join(DATA_DIR, "models.json"), JSON.stringify(models, null, 2));
  console.log(`  ✓ 同步了 ${models.length} 个模型`);

  console.log("\n[3/3] 同步资讯数据...");
  const newsPages = await fetchAll(NEWS_DB);
  const news = newsPages.map(mapNews);
  writeFileSync(join(DATA_DIR, "news.json"), JSON.stringify(news, null, 2));
  console.log(`  ✓ 同步了 ${news.length} 条资讯`);

  console.log("\n=== 同步完成 ===");
  console.log("运行 pnpm build 构建并部署");
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});