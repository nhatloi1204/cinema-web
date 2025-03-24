import { Movie } from '../../types/types'

function MovieCard({ image, title, genre, duration, releaseDate }: Movie) {
  return (
    <div className='w-64 rounded shadow-lg'>
      <img
        src={image}
        alt={title}
        className='w-full h-80 object-cover rounded'
      />
      <h2 className='text-lg font-bold mt-2 px-4'>{title}</h2>
      <p className='text-gray-600 px-4'>Thể loại: {genre}</p>
      <p className='text-gray-600 px-4'>Thời lượng: {duration}</p>
      <p className='text-gray-600 px-4'>Khởi chiếu: {releaseDate}</p>
      <button className='mt-2 w-full bg-blue-500 text-white font-bold px-4 py-2 rounded-full hover:bg-blue-600 transition px-4'>
        Đặt vé
      </button>
    </div>
  )
}

export default MovieCard
