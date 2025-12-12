import { Link } from 'react-router-dom'
import { Movie } from '../../store/movieData/movieType'
import { formatDate } from '../../utils/formatDate'

interface MovieCardProps {
  movie: Movie
  onBookNow?: () => void
}

function MovieCard({ movie, onBookNow }: MovieCardProps) {
  return (
    <div className='flex flex-col w-64 h-[600px] rounded-xl bg-white shadow-md hover:shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 border border-gray-100'>
      {/* Poster Image */}
      <div className='relative w-full h-64 overflow-hidden bg-gray-200 group flex-shrink-0'>
        <img
          src={movie.poster}
          alt={movie.title}
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
        />
        {/* Overlay trên hover */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </div>

      {/* Content */}
      <div className='p-5 flex flex-col h-full gap-4'>
        {/* Title + Meta */}
        <div className='flex-shrink-0'>
          <Link to={`/movies/${movie._id}`}>
            <h2 className='text-lg font-bungee text-blue-normal line-clamp-2 hover:text-cyan-500 transition-colors min-h-14'>
              {movie.title}
            </h2>
          </Link>

          <div className='mt-2 space-y-0.5 text-xs text-gray-600'>
            <p className='font-medium uppercase tracking-wide'>{movie.genre}</p>
            <p className='text-gray-500'>⏱ {movie.duration} phút</p>
            <p className='text-gray-500'>{formatDate(movie.releaseDate)}</p>
          </div>
        </div>

        {/* Description */}
        <div className='flex-1 overflow-hidden'>
          <p className='text-sm text-gray-700 line-clamp-3 leading-relaxed'>
            {movie.description}
          </p>
        </div>

        {/* Button */}
        <div className='flex-shrink-0'>
          <button
            className='w-full bg-blue-normal text-white font-bold py-2.5 rounded-lg hover:bg-cyan-500 active:bg-cyan-600 transition-colors duration-200 shadow-sm hover:shadow-md'
            onClick={onBookNow}
          >
            Đặt vé ngay
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
