import { createSlice } from '@reduxjs/toolkit'
import { Movie } from './movieType'
import { fetchMovies } from './movieThunk'

interface MovieState {
  movies: Movie[]
  loading: boolean
  error: string | null
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
}

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    // Các reducers sync (nếu cần)
  },
  extraReducers: builder => {
    builder
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
        state.error = action.error.message || 'Có lỗi xảy ra'
      })
  },
})

export default movieSlice.reducer
