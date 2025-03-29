import MovieSlider from '../../components/MovieSlider'
import { Movie } from '../../types/types'

const moviesNowShowing: Movie[] = [
  {
    id: 1,
    title: 'Nhat Loi',
    image: '/src/assets/images/carousel/banner1.png',
    genre: 'Tâm lý',
    duration: '100 phút',
    releaseDate: '24-03-2025',
  },
  {
    id: 2,
    title: 'Nhat Loi',
    image: '/src/assets/images/carousel/banner2.png',
    genre: 'Hoạt hình',
    duration: '100 phút',
    releaseDate: '24-03-2025',
  },
  {
    id: 3,
    title: 'Nhat Loi',
    image: '/src/assets/images/carousel/banner1.png',
    genre: 'Hành động',
    duration: '100 phút',
    releaseDate: '24-03-2025',
  },
  {
    id: 4,
    title: 'Nhat Loi',
    image: '/src/assets/images/carousel/banner2.png',
    genre: 'Kinh dị',
    duration: '100 phút',
    releaseDate: '24-03-2025',
  },
]

const moviesComingSoon: Movie[] = []
const moviesSpecialShows: Movie[] = []

function Movies() {
  return (
    <>
      <div className='py-20'>
        <MovieSlider
          title='Phim đang chiếu'
          movies={moviesNowShowing}
          readMoreBtn={true}
        />
      </div>

      <div className='py-20'>
        <MovieSlider
          title='Phim sắp chiếu'
          movies={moviesComingSoon}
          readMoreBtn={true}
        />
      </div>

      <div className='py-20'>
        <MovieSlider
          title='Suất chiếu đặc biệt'
          movies={moviesSpecialShows}
          readMoreBtn={true}
        />
      </div>
    </>
  )
}

export default Movies
