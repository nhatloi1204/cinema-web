import { RootState } from '../rootReducer'

export const selectEvents = (state: RootState) => state.event.items
export const selectEventLoading = (state: RootState) => state.event.loading
export const selectEventError = (state: RootState) => state.event.error
