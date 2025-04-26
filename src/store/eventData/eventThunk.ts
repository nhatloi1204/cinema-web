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
