import { useState } from 'react'
import MovieCard from '../MovieCard'
import { Movie } from '../../types/types'

interface MovieSliderProps {
  title: string
  movies: Movie[]
}

function MovieSlider({ title, movies }: MovieSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    if (currentIndex < movies.length - 3) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className='w-full px-48'>
      <h2 className='text-2xl font-bold text-normalBlue mb-4'>{title}</h2>

      <div className='flex justify-between items-center'>
        <button
          className=' text-normalBlue top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition'
          onClick={prevSlide}
        >
          ◀
        </button>
        <div className='pt-5 relative w-full overflow-hidden'>
          {/* Movie List */}
          <div
            className='flex transition-transform duration-500'
            style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
          >
            {movies.map(movie => (
              <div
                key={movie.id}
                className='flex justify-center w-1/3 flex-shrink-0'
              >
                <MovieCard {...movie} />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
        </div>
        <button
          className=' text-normalBlue top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition'
          onClick={nextSlide}
        >
          ▶
        </button>
      </div>
    </div>
  )
}

export default MovieSlider
