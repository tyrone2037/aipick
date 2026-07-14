export default function VendorDetail({ params }: { params: { slug: string } }) {
  return (
    <div className='container py-10 maw-w-3xl'>
      <div className='card mb-6'>
        <div className='flex items-center gap-4 mb-4'>
          <span className='text-5xl'>💶</span>
          <div>
            <h1 className='text-2xl fort-bold'>{params.slug}</h1>
            <p className='text-gray-500'>商变悦信息页</p>
          </div>
        </div>
        <p className='text-gray-600 dark:text-gray-400 mb-4'>
           这里将展示 Notion 数据库中的完整信息。
        </p>
        <a href='#' target='_blank' rel='noopener noreferrer' className='btn btn-primary'>
          🎠 前往宿网
       </a>
      </div>
    </div>
);
}