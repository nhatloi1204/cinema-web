// src/store/showtimeData/showtimeSelector.ts
import { RootState } from '../store'

export const selectShowtimes = (state: RootState) => state.showtime.data
export const selectShowtimeStatus = (state: RootState) => state.showtime.status
