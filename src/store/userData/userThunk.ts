import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { User } from './userType'

const API_URL = import.meta.env.VITE_API_URL

// USER LOGIN
export const loginUser = createAsyncThunk('user/login', async () => {
  window.location.href = `${API_URL}/auth/login`
})

// USER LOGOUT
export const logoutUser = createAsyncThunk('user/logout', async () => {
  window.location.href = `${API_URL}/auth/logout`
})

// GET PROFILE
export const fetchProfile = createAsyncThunk<User>(
  'user/fetchProfile',
  async () => {
    const res = await axios.get(`${API_URL}/auth/profile`, {
      withCredentials: true,
    })
    return res.data.user
  },
)
