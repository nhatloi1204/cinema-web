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
}

function MovieSlider({
  title,
  movies = [],
  readMoreBtn = false,
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
      className='w-full px-4 md:px-10'
      style={{ maxWidth: '1200px', margin: '0 auto' }}
    >
      <div className='flex justify-between items-center px-4 md:px-10 mb-6'>
        <h2 className='text-3xl text-blue-normal uppercase font-bungee'>
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

export default MovieSlider
