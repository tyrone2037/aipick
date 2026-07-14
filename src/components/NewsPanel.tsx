"use client";

import { useState, useEffect } from "react";

interface NewsItem {
  id: number;
  title: string;
  tag?: string;
  hot?: boolean;
  isNew?: boolean;
}

const newsData: NewsItem[] = [
  { id: 1, title: "OpenAI 发布 GPT-5，多模态能力大幅提升", tag: "热", hot: true },
  { id: 2, title: "Claude 4 正式上线，支持百万级上下文", tag: "新", isNew: true },
  { id: 3, title: "Midjourney V7 渲染质感逼近照片级" },
  { id: 4, title: "Cursor 融资 10 亿美元，估值突破百亿" },
  { id: 5, title: "DeepSeek 发布开源大模型 DeepSeek-R1" },
  { id: 6, title: "Sora 正式开放注册，算力需求惊人" },
  { id: 7, title: "Google Gemini 2.0 挑战 ChatGPT 霸主地位" },
  { id: 8, title: "国内 AI 大模型落地加速，多行业应用爆发" },
];

export default function NewsPanel() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="news-panel">
      <div className="news-header">
        <div className="news-title-row">
          <span className="news-fire">🔥</span>
          <h3 className="news-title">AI 资讯</h3>
        </div>
        <span className="news-time">{currentTime}</span>
      </div>
      <div className="news-list">
        {newsData.map((item, index) => {
          const itemClass = "news-item " + (index < 3 ? "rank-" + (index + 1) : "rank-normal");
          const rankClass = "news-rank " + (index < 3 ? "top" : "");
          const tagClass = "news-tag " + (item.hot ? "tag-hot" : "tag-new");
          return (
            <div key={item.id} className={itemClass}>
              <span className={rankClass}>{index + 1}</span>
              <div className="news-content">
                <span className="news-text">{item.title}</span>
                {item.tag && (
                  <span className={tagClass}>{item.tag}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="news-footer">
        <span className="news-refresh">↻ 实时更新</span>
      </div>
    </aside>
  );
}
