import MovieSlider from '../../components/MovieSlider'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchMovies } from '../../store/movieData/movieThunk'
import {
  selectMovies,
  selectMovieLoading,
  selectMovieError,
} from '../../store/movieData/movieSelector'

function Movies() {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(selectMovies)
  const loading = useAppSelector(selectMovieLoading)
  const error = useAppSelector(selectMovieError)

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  const validMovies = Array.isArray(movies) ? movies : []

  const moviesNowShowing = validMovies.filter(
    movie => movie.status === 'now_showing',
  )
  const moviesComingSoon = validMovies.filter(
    movie => movie.status === 'coming_soon',
  )
  const moviesSpecialShows = validMovies.filter(
    movie => movie.status === 'special',
  )

  return (
    <>
      <div className='pt-20'>
        <MovieSlider
          title='Phim đang chiếu'
          movies={moviesNowShowing}
          readMoreBtn={true}
        />
      </div>

      <div className='pt-20'>
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
