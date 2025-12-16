import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Showtime } from './showtimeType'

const API_URL = import.meta.env.VITE_API_URL

axios.defaults.withCredentials = true

// Fetch all showtimes
export const fetchShowtimes = createAsyncThunk(
  'showtime/fetchShowtimes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/public/showtimes`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch showtimes',
      )
    }
  },
)

// Fetch showtime by ID
export const fetchShowtimeById = createAsyncThunk(
  'showtime/fetchShowtimeById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/public/showtimes/${id}`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch showtime',
      )
    }
  },
)

// Fetch showtimes by movie ID
export const fetchShowtimesByMovie = createAsyncThunk(
  'showtime/fetchShowtimesByMovie',
  async (movieId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/public/showtimes/movie/${movieId}`,
      )
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch showtimes',
      )
    }
  },
)

// Create showtime
export const createShowtime = createAsyncThunk(
  'showtime/createShowtime',
  async (
    data: {
      movieId: string
      roomId: string
      theaterId: string
      startTime: string
      endTime: string
      price: number
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(`${API_URL}/admin/showtimes`, data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create showtime',
      )
    }
  },
)

// Update showtime
export const updateShowtime = createAsyncThunk(
  'showtime/updateShowtime',
  async (
    {
      id,
      data,
    }: {
      id: string
      data: {
        movieId: string
        roomId: string
        theaterId: string
        startTime: string
        endTime: string
        price: number
      }
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.put(`${API_URL}/admin/showtimes/${id}`, data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update showtime',
      )
    }
  },
)

// Delete showtime
export const deleteShowtime = createAsyncThunk(
  'showtime/deleteShowtime',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/admin/showtimes/${id}`)
      return id
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete showtime',
      )
    }
  },
)
