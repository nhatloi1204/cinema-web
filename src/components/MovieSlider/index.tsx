import { useState } from 'react'
import MovieCard from '../MovieCard'
import { Movie } from '../../types/types'
import { Link } from 'react-router-dom'

interface MovieSliderProps {
  title?: string
  movies: Movie[]
  readMoreBtn?: boolean
}

function MovieSlider({ title, movies, readMoreBtn = false }: MovieSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const visibleSlides = 3
  const totalSlides = Math.ceil(movies.length / visibleSlides)

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1)
    } else setCurrentIndex(0)
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else setCurrentIndex(totalSlides - 1)
  }

  return (
    <div className='w-full px-48'>
      <div className='flex justify-between px-10'>
        <h2 className='text-3xl text-blue-normal mb-4 uppercase font-bungee'>
          {title}
        </h2>
        {readMoreBtn && (
          <Link to=''>
            <button className='w-40 text-xl uppercase font-bungee border-2 border-blue-normal rounded-full text-blue-normal py-2 hover:bg-blue-lightHover active:bg-blue-lightActive'>
              Xem thêm
            </button>
          </Link>
        )}
      </div>

      {movies.length === 0 ? (
        <div className='h-32 flex items-center justify-center text-gray-500'>
          ⏳ Hiện tại chưa có phim.
        </div>
      ) : (
        <div className='flex justify-between items-center'>
          {/* Previous Button */}
          <button
            className='text-blue-normal p-2 rounded-full shadow-md hover:bg-gray-200 transition'
            onClick={prevSlide}
          >
            ◀
          </button>

          {/* Movie List */}
          <div className='pt-5 relative w-full overflow-hidden'>
            <div
              className='flex transition-transform duration-500'
              style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
            >
              {movies.map(movie => (
                <div
                  key={movie.id}
                  className='w-1/3 flex-shrink-0 flex justify-center'
                >
                  <MovieCard {...movie} />
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            className='text-blue-normal p-2 rounded-full shadow-md hover:bg-gray-200 transition '
            onClick={nextSlide}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  )
}

export default MovieSlider
