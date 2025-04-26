import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Movie } from './movieType'

export const fetchMovies = createAsyncThunk<Movie[]>(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/public/movies`,
      )
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data)
    }
  },
)

// export const createMovie = createAsyncThunk(
//   'movies/createMovie',
//   async (newMovie: Partial<Movie>, thunkAPI) => {
//     try {
//       const res = await axios.post('/admin/movies', newMovie)
//       return res.data.data
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data.message)
//     }
//   },
// )
