import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchMovies } from '../../store/movieData/movieThunk'
import { selectMovies } from '../../store/movieData/movieSelector'
import { Movie } from '../../store/movieData/movieType'
import { formatDate } from '../../utils/formatDate'

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const movies = useAppSelector(selectMovies)

  useEffect(() => {
    if (!movies.length) {
      dispatch(fetchMovies())
    }
  }, [dispatch, movies.length])

  const movie = movies.find((m: Movie) => m._id === id)

  if (!movie) {
    return (
      <div className='text-center py-32 text-3xl text-gray-500'>
        Không tìm thấy phim
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white py-10  px-48'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl text-red-dark font-bold border-b-2 border-red-dark pb-2 mb-8'>
          Nội Dung Phim
        </h1>

        <div className='flex flex-col md:flex-row gap-8 bg-white p-6 '>
          <div className='md:w-1/3 flex justify-center'>
            <img
              src={movie.poster}
              alt={movie.title}
              className='rounded-lg object-cover w-full max-w-xs'
            />
          </div>

          <div className='md:w-2/3 flex flex-col justify-between'>
            <h2 className='text-3xl font-bold text-red-dark mb-4 uppercase'>
              {movie.title}
            </h2>

            <div className='text-black space-y-2 text-base'>
              {/* <p><strong>Đạo diễn:</strong> {movie.director}</p>
              <p><strong>Diễn viên:</strong> {movie.actors?.join('; ')}</p> */}
              <p>
                <strong className='text-red-dark'>Thể loại:</strong>{' '}
                {movie.genre}
              </p>
              <p>
                <strong className='text-red-dark'>Khởi chiếu:</strong>{' '}
                {formatDate(movie.releaseDate)}
              </p>
              <p>
                <strong className='text-red-dark'>Thời lượng:</strong>{' '}
                {movie.duration} phút
              </p>
              {/* <p><strong>Ngôn ngữ:</strong> {movie.language}</p>
              <p><strong>Rated:</strong> {movie.ratingText}</p> */}
            </div>

            {/* Nội dung phim */}
            <div className='mt-10 text-black text-lg leading-relaxed'>
              {movie.description}
            </div>

            {/* Buttons */}
            <div className='flex flex-wrap items-center gap-4 mt-6'>
              <button className='bg-red-dark text-white px-6 py-3 rounded-full font-bold hover:bg-red-darkHover transition'>
                MUA VÉ
              </button>
              <button className='bg-transparent border-2 border-red-dark text-red-dark px-6 py-3 rounded-full font-bold hover:bg-red-light transition'>
                Chi tiết | Trailer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
