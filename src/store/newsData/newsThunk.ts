import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { News } from './newsType'

export const fetchNews = createAsyncThunk<News[]>(
  'news/fetchNews',
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/public/news`,
    )
    return response.data
  },
)
