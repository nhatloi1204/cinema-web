import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Movie } from './movieType'

const API_URL = import.meta.env.VITE_API_URL

export const fetchMovies = createAsyncThunk<Movie[]>(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/public/movies`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Lỗi khi tải phim')
    }
  },
)

export const createMovie = createAsyncThunk<
  Movie,
  FormData | Partial<Movie>,
  { rejectValue: string }
>('movies/createMovie', async (newMovie, { rejectWithValue }) => {
  try {
    const isFormData = newMovie instanceof FormData
    const response = await axios.post(`${API_URL}/admin/movies`, newMovie, {
      headers: isFormData
        ? {
            'Content-Type': 'multipart/form-data',
          }
        : {
            'Content-Type': 'application/json',
          },
    })
    
    return response.data.data || response.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Lỗi khi tạo phim')
  }
})

export const updateMovie = createAsyncThunk<
  Movie,
  { id: string; data: FormData | Partial<Movie> },
  { rejectValue: string }
>('movies/updateMovie', async ({ id, data }, { rejectWithValue }) => {
  try {
    const isFormData = data instanceof FormData
    const response = await axios.put(`${API_URL}/admin/movies/${id}`, data, {
      headers: isFormData
        ? {
            'Content-Type': 'multipart/form-data',
          }
        : {
            'Content-Type': 'application/json',
          },
    })
    return response.data.data || response.data
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Lỗi khi cập nhật phim',
    )
  }
})

export const deleteMovie = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('movies/deleteMovie', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/admin/movies/${id}`)
    return id
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Lỗi khi xóa phim')
  }
})
