import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

// Get all theaters
export const fetchTheaters = createAsyncThunk(
  'theater/fetchTheaters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/public/theaters`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch theaters',
      )
    }
  },
)

// Get theater by ID
export const fetchTheaterById = createAsyncThunk(
  'theater/fetchTheaterById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/public/theaters/${id}`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch theater',
      )
    }
  },
)

// Create theater
export const createTheater = createAsyncThunk(
  'theater/createTheater',
  async (data: { name: string; location: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/admin/theaters`, data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create theater',
      )
    }
  },
)

// Update theater
export const updateTheater = createAsyncThunk(
  'theater/updateTheater',
  async (
    { id, data }: { id: string; data: { name: string; location: string } },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.put(`${API_URL}/admin/theaters/${id}`, data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update theater',
      )
    }
  },
)

// Delete theater
export const deleteTheater = createAsyncThunk(
  'theater/deleteTheater',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/admin/theaters/${id}`)
      return id
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete theater',
      )
    }
  },
)
