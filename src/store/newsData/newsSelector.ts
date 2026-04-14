import { RootState } from '../rootReducer'

export const selectNews = (state: RootState) => state.news.items
export const selectNewsLoading = (state: RootState) => state.news.loading
export const selectNewsError = (state: RootState) => state.news.error
