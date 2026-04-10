import { RootState } from '../store'

export const selectBookings = (state: RootState) => state.booking.bookings
export const selectCurrentBooking = (state: RootState) =>
  state.booking.currentBooking
export const selectBookingLoading = (state: RootState) => state.booking.loading
export const selectBookingError = (state: RootState) => state.booking.error
