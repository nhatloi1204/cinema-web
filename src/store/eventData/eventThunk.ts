import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Event } from './eventType'

export const fetchEvents = createAsyncThunk<Event[]>(
  'event/fetchEvents',
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/public/events`,
    )
    return response.data
  },
)

export const createEvent = createAsyncThunk<
  Event,
  FormData,
  { rejectValue: string }
>('event/createEvent', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/events`,
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

export const updateEvent = createAsyncThunk<
  Event,
  { id: string; data: FormData },
  { rejectValue: string }
>('event/updateEvent', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/admin/events/${id}`,
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

export const deleteEvent = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('event/deleteEvent', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/admin/events/${id}`)
    return id
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Delete failed')
  }
})
