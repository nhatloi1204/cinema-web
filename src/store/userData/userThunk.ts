import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { User } from './userType'

const API_URL = import.meta.env.VITE_API_URL

// GET PROFILE
// Authorization token automatically added by useAuth0Interceptor
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

// UPDATE PROFILE
// Authorization token automatically added by useAuth0Interceptor
export const updateProfile = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>('user/updateProfile', async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.put(`${API_URL}/user/profile`, userData)
    return res.data.user
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to update profile',
    )
  }
})
