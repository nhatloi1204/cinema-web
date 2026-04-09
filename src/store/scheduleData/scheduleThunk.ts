import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ScheduleGeneratorConfig, GeneratedShowtime } from './scheduleType'

export const generatePreview = createAsyncThunk<
  { status: string; totalShowtimes: number; preview: GeneratedShowtime[] },
  ScheduleGeneratorConfig,
  { rejectValue: string }
>('schedule/generatePreview', async (config, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/showtimes/generate-preview`,
      config,
    )
    return response.data
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Tạo preview thất bại',
    )
  }
})

export const saveGenerated = createAsyncThunk<
  { status: string; totalSaved: number; showtimes: any[] },
  GeneratedShowtime[],
  { rejectValue: string }
>('schedule/saveGenerated', async (showtimes, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/showtimes/save-generated`,
      { showtimes },
    )
    return response.data
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Lưu suất chiếu thất bại',
    )
  }
})
