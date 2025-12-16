import { RootState } from '../store'

export const selectShowtimes = (state: RootState) => state.showtime.showtimes
export const selectShowtimeLoading = (state: RootState) =>
  state.showtime.loading
export const selectShowtimeError = (state: RootState) => state.showtime.error
