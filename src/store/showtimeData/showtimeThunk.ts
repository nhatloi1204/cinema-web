import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Showtime } from './showtimeType'

export const fetchShowtimesByMovie = createAsyncThunk(
  'showtimes/fetchByMovie',
  async (movieId: string) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/public/showtimes/movie/${movieId}`,
    )
    return res.data
  },
)
