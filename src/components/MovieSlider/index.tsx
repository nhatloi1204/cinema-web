import React from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import MovieCard from '../MovieCard'
import { Movie } from '../../store/movieData/movieType'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'
import BookingModal from '../BookingModal'
import { useState } from 'react'

interface MovieSliderProps {
  title?: string
  movies: Movie[]
  readMoreBtn?: boolean
  loading?: boolean
}

function MovieSlider({
  title,
  movies = [],
  readMoreBtn = false,
  loading = false,
}: MovieSliderProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const handleBookNow = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  const closeModal = () => setSelectedMovie(null)

  return (
    <div
      className='w-full px-4 md:px-8 py-6'
      style={{ maxWidth: '1200px', margin: '0 auto' }}
    >
      {title && (
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl md:text-4xl text-blue-normal uppercase font-bungee tracking-wider'>
            {title}
          </h2>
          {readMoreBtn && (
            <Link to=''>
              <button className='px-6 py-2.5 text-sm md:text-base uppercase font-bungee border-2 border-blue-normal rounded-full text-blue-normal hover:bg-blue-normal hover:text-white transition-all duration-200'>
                Xem thêm
              </button>
            </Link>
          )}
        </div>
      )}

      {loading ? (
        <div className='h-48 flex items-center justify-center text-gray-400 text-lg'>
          Đang tải dữ liệu...
        </div>
      ) : movies.length === 0 ? (
        <div className='h-48 flex items-center justify-center text-gray-400 text-lg'>
          Hiện tại chưa có phim nào
        </div>
      ) : (
        <Slider {...settings}>
          {movies.map(movie => (
            <div key={movie._id} className='px-3'>
              <MovieCard movie={movie} onBookNow={() => handleBookNow(movie)} />
            </div>
          ))}
        </Slider>
      )}

      {selectedMovie && (
        <BookingModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  )
}

export default React.memo(MovieSlider)
