import { createSlice } from '@reduxjs/toolkit'
import { MoviesState } from './movieType'
import {
  fetchMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from './movieThunk'

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
}

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch Movies
      .addCase(fetchMovies.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false
        state.movies = action.payload
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Lỗi khi tải phim'
      })

      // Create Movie
      .addCase(createMovie.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.loading = false
        state.movies.push(action.payload)
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Lỗi khi tạo phim'
      })

      // Update Movie
      .addCase(updateMovie.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.loading = false
        const index = state.movies.findIndex(m => m._id === action.payload._id)
        if (index > -1) {
          state.movies[index] = action.payload
        }
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Lỗi khi cập nhật phim'
      })

      // Delete Movie
      .addCase(deleteMovie.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.loading = false
        state.movies = state.movies.filter(m => m._id !== action.payload)
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Lỗi khi xóa phim'
      })
  },
})

export default movieSlice.reducer
