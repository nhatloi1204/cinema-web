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

export const createNews = createAsyncThunk<
  News,
  FormData,
  { rejectValue: string }
>('news/createNews', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/news`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return response.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Create failed')
  }
})

export const updateNews = createAsyncThunk<
  News,
  { id: string; data: FormData },
  { rejectValue: string }
>('news/updateNews', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/admin/news/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return response.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Update failed')
  }
})

export const deleteNews = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('news/deleteNews', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/admin/news/${id}`)
    return id
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Delete failed')
  }
})
