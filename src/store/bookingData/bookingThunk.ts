import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Booking } from './bookingType'

const API_URL = import.meta.env.VITE_API_URL

// Helper to fetch showtime with populated movie/room/theater data
const enrichShowtimeData = async (showtime: any) => {
  try {
    if (!showtime?._id) return showtime

    const response = await axios.get(
      `${API_URL}/public/showtimes/${showtime._id}`,
      { withCredentials: true },
    )
    return response.data
  } catch (error) {
    console.warn(`Failed to fetch showtime ${showtime?._id}:`, error)
    return showtime
  }
}

export const getUserBookings = createAsyncThunk<
  Booking[],
  void,
  { rejectValue: string }
>('bookings/getUserBookings', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/user/bookings`, {
      withCredentials: true,
    })

    const bookings = response.data

    // Enrich each booking's showtimeId with populated movie/room/theater data
    const enrichedBookings = await Promise.all(
      bookings.map(async (booking: Booking) => {
        const enrichedShowtime = await enrichShowtimeData(booking.showtimeId)
        return {
          ...booking,
          showtimeId: enrichedShowtime,
        }
      }),
    )

    return enrichedBookings
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Lỗi khi tải vé của bạn',
    )
  }
})

export const getBookingById = createAsyncThunk<
  Booking,
  string,
  { rejectValue: string }
>('bookings/getBookingById', async (bookingId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/user/bookings/${bookingId}`, {
      withCredentials: true,
    })

    const booking = response.data

    // Enrich booking's showtimeId with populated data
    const enrichedShowtime = await enrichShowtimeData(booking.showtimeId)

    return {
      ...booking,
      showtimeId: enrichedShowtime,
    }
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Lỗi khi tải thông tin vé',
    )
  }
})
