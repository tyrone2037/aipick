import type { Metadata } from "next";
import Link from "next/link";
import Ferrofluid from "@/components/Ferrofluid";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIPick - AI 工具导航 · 发现最好用的 AI",
  description: "收录 150+ AI 工具，按使用场景分类，帮你快速找到适合的 AI 产品。",
  keywords: ["AI工具", "AI导航", "AI排行", "ChatGPT", "Claude"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="ferrofluid-bg">
          <Ferrofluid
            colors={["#4F46E5", "#06B6D4", "#E0F2FE"]}
            speed={0.4}
            scale={1.6}
            turbulence={0.8}
            fluidity={0.15}
            rimWidth={0.25}
            sharpness={2.5}
            shimmer={1.2}
            glow={1.8}
            flowDirection="down"
            opacity={0.85}
            mouseInteraction={true}
            mouseStrength={1}
            mouseRadius={0.35}
          />
        </div>
        <main>{children}</main>
        <footer className="footer">
          <div className="container">
            <p className="mb-2">© 2026 AIPick · AI 工具导航</p>
            <p className="text-xs">
              本站含 Affiliate 链接 ·
              <Link href="/about" className="text-indigo-500 hover:underline ml-1">关于</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}