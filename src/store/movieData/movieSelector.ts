import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const selectMovies = (state: RootState) => state.movie.movies
export const selectMovieLoading = (state: RootState) => state.movie.loading
export const selectMovieError = (state: RootState) => state.movie.error

export const selectMoviesNowShowing = createSelector([selectMovies], movies =>
  movies.filter(movie => movie.status === 'now_showing'),
)

export const selectMoviesComingSoon = createSelector([selectMovies], movies =>
  movies.filter(movie => movie.status === 'coming_soon'),
)

export const selectMoviesSpecial = createSelector([selectMovies], movies =>
  movies.filter(movie => movie.status === 'special'),
)
