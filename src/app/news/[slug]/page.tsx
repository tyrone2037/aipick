export default function NewsDetail({ params }: { params: { slug: string } }) {
  return (
    <div className="container py-10 max-w-3xl">
      <article className="card">
        <p className="text-sm text-gray-500 mb-2">2026-07-07 · Model Release · OpenAI Blog</p>
        <h1 className="text-2xl font-bold mb-4">OpenAI announces GPT-5 mini</h1>
        <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          <p>This is a demo news detail page. After Notion integration, real content will appear here.</p>
        </div>
      </article>
    </div>
  );
}
