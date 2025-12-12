import { RootState } from '../store'

export const selectTheaters = (state: RootState) => state.theater.theaters
export const selectSelectedTheater = (state: RootState) =>
  state.theater.selectedTheater
export const selectTheaterLoading = (state: RootState) => state.theater.loading
export const selectTheaterError = (state: RootState) => state.theater.error
