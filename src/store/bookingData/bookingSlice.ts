import { createSlice } from '@reduxjs/toolkit'
import { BookingsState } from './bookingType'
import { getUserBookings, getBookingById } from './bookingThunk'

const initialState: BookingsState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearBookingError: state => {
      state.error = null
    },
    clearCurrentBooking: state => {
      state.currentBooking = null
    },
  },
  extraReducers: builder => {
    builder
      // Get User Bookings
      .addCase(getUserBookings.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.loading = false
        state.bookings = action.payload
      })
      .addCase(getUserBookings.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Lỗi khi tải vé của bạn'
      })

      // Get Booking By ID
      .addCase(getBookingById.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        state.loading = false
        state.currentBooking = action.payload
      })
      .addCase(getBookingById.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Lỗi khi tải thông tin vé'
      })
  },
})

export const { clearBookingError, clearCurrentBooking } = bookingSlice.actions
export default bookingSlice.reducer
