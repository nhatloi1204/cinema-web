import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Banner } from './bannerType'

export const fetchBanners = createAsyncThunk<Banner[]>(
  'banner/fetchBanners',
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/public/banners`,
    )
    return response.data
  },
)

export const createBanner = createAsyncThunk<
  Banner,
  FormData,
  { rejectValue: string }
>('banner/createBanner', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/banners`,
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

export const updateBanner = createAsyncThunk<
  Banner,
  { id: string; data: FormData },
  { rejectValue: string }
>('banner/updateBanner', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/admin/banners/${id}`,
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

export const deleteBanner = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('banner/deleteBanner', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/admin/banners/${id}`)
    return id
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Delete failed')
  }
})
