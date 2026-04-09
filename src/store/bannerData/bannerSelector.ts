import { RootState } from '../rootReducer'

export const selectBanners = (state: RootState) => state.banner.items
export const selectBannerLoading = (state: RootState) => state.banner.loading
export const selectBannerError = (state: RootState) => state.banner.error
