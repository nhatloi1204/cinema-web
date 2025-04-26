import { Link } from 'react-router-dom'
import { Movie } from '../../store/movieData/movieType'
import { formatDate } from '../../utils/formatDate'

interface MovieCardProps {
  movie: Movie
  onBookNow?: () => void
}

function MovieCard({ movie, onBookNow }: MovieCardProps) {
  return (
    <div className='flex flex-col w-64 rounded-2xl bg-white shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 min-h-full'>
      <div className='relative w-full h-80'>
        <img
          src={movie.poster}
          alt={movie.title}
          className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
        />
      </div>

      <div className='p-4 flex flex-col justify-between h-full'>
        <div className='mb-2'>
          <Link to={`/movies/${movie._id}`}>
            <h2 className='text-xl font-bold text-blue-600 line-clamp-2 hover:underline'>
              {movie.title}
            </h2>
          </Link>

          <p className='text-gray-500 text-sm mb-0.5'>🎬 {movie.genre}</p>
          <p className='text-gray-500 text-sm mb-0.5'>
            ⏱ {movie.duration} phút
          </p>
          <p className='text-gray-500 text-sm'>
            📅 Khởi chiếu: {formatDate(movie.releaseDate)}
          </p>
        </div>

        <button
          className='w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-2 rounded-full hover:from-blue-600 hover:to-indigo-600 transition-colors mt-2'
          onClick={onBookNow}
        >
          Đặt vé
        </button>
      </div>
    </div>
  )
}

export default MovieCard
