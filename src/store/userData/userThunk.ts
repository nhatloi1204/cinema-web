import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { User } from './userType'

const API_URL = import.meta.env.VITE_API_URL

// Config axios để gửi cookies
axios.defaults.withCredentials = true

// USER LOGIN
export const loginUser = createAsyncThunk('user/login', async () => {
  window.location.href = `${API_URL}/auth/login`
})

// USER LOGOUT
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Call logout endpoint để clear session
      const res = await axios.get(`${API_URL}/auth/logout`)
      return res.data
    } catch (error: any) {
      console.error('Logout error:', error)
      // Dù có lỗi, vẫn resolve để thunk complete
      return rejectWithValue('Failed to logout')
    }
  },
)

// GET PROFILE
export const fetchProfile = createAsyncThunk<User>(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/auth/profile`)
      return res.data.user
    } catch (error: any) {
      return rejectWithValue('Failed to fetch profile')
    }
  },
)
