interface newsProps {
  image: string
  title: string
}

function NewsCard({ image, title }: newsProps) {
  return (
    <div className='flex flex-col h-[420px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-200/50'>
      {/* Image Container */}
      <div className='relative w-full h-64 overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 flex-shrink-0'>
        <img
          src={image}
          alt={title}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
        {/* Overlay on hover */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </div>

      {/* Content */}
      <div className='flex flex-col flex-1 p-5 bg-gradient-to-b from-white to-gray-50'>
        <h3 className='text-lg font-bold text-gray-900 line-clamp-3 leading-tight group-hover:text-blue-600 transition-colors duration-200'>
          {title}
        </h3>
        <div className='mt-auto'>
          <button className='text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors duration-200 flex items-center gap-1 mt-3'>
            Xem chi tiết
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
