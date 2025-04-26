import { RootState } from '../store'

export const selectMovies = (state: RootState) => state.movie.movies
export const selectMovieLoading = (state: RootState) => state.movie.loading
export const selectMovieError = (state: RootState) => state.movie.error
