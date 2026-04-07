import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

// Config axios để tự động gửi cookies
axios.defaults.withCredentials = true

// Get all rooms
export const fetchRooms = createAsyncThunk(
  'room/fetchRooms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/admin/rooms`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch rooms',
      )
    }
  },
)

// Get room by ID
export const fetchRoomById = createAsyncThunk(
  'room/fetchRoomById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/admin/rooms/${id}`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch room',
      )
    }
  },
)

// Create room
export const createRoom = createAsyncThunk(
  'room/createRoom',
  async (
    data: { name: string; theaterId: string; rows: number; cols: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(`${API_URL}/admin/rooms`, data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create room',
      )
    }
  },
)

// Update room
export const updateRoom = createAsyncThunk(
  'room/updateRoom',
  async (
    {
      id,
      data,
    }: {
      id: string
      data: {
        name: string
        rows: number
        cols: number
        seatLayout: any
      }
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.put(`${API_URL}/admin/rooms/${id}`, data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update room',
      )
    }
  },
)

// Delete room
export const deleteRoom = createAsyncThunk(
  'room/deleteRoom',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/admin/rooms/${id}`)
      return id
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete room',
      )
    }
  },
)
