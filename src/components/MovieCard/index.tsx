import { Link } from 'react-router-dom'
import { Movie } from '../../store/movieData/movieType'
import { formatDate } from '../../utils/formatDate'
import { IoStar } from 'react-icons/io5'

interface MovieCardProps {
  movie: Movie
  onBookNow?: () => void
}

function MovieCard({ movie, onBookNow }: MovieCardProps) {
  return (
    <div className='flex flex-col h-[680px] rounded-2xl bg-gradient-to-b from-white to-gray-50 shadow-lg hover:shadow-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-3 border border-gray-200/50 group'>
      {/* Poster Image */}
      <div className='relative w-full h-80 overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 flex-shrink-0'>
        <img
          src={movie.poster}
          alt={movie.title}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
        {/* Dark overlay on hover */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

        {/* Rating badge */}
        {/* <div className='absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md'>
          <IoStar size={16} className='text-yellow-500 fill-yellow-500' />
          <span className='text-sm font-bold text-gray-800'>
            {movie.rating}
          </span>
        </div> */}
      </div>

      {/* Content */}
      <div className='p-6 flex flex-col flex-1 gap-5'>
        {/* Title */}
        <Link to={`/movies/${movie._id}`}>
          <h2 className='text-xl font-bungee text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors duration-200 tracking-wide'>
            {movie.title}
          </h2>
        </Link>

        {/* Meta Info */}
        <div className='space-y-1.5 text-xs text-gray-600 font-medium'>
          <div className='flex items-center gap-2'>
            <span className='inline-block px-2.5 py-1 bg-blue-100/80 text-blue-700 rounded-full uppercase tracking-wider font-semibold'>
              {movie.genre}
            </span>
          </div>
          <p className='flex items-center gap-1.5 text-gray-700'>
            ⏱ <span>{movie.duration} phút</span>
          </p>
          <p className='text-gray-600'>📅 {formatDate(movie.releaseDate)}</p>
        </div>

        {/* Description */}
        <div className='flex-1 overflow-hidden'>
          <p className='text-sm text-gray-700 line-clamp-2 leading-relaxed'>
            {movie.description}
          </p>
        </div>

        {/* Button */}
        <button
          className='w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
          onClick={onBookNow}
        >
          Đặt vé ngay
        </button>
      </div>
    </div>
  )
}

export default MovieCard
