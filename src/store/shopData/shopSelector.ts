import { RootState } from '../rootReducer'

export const selectShopItems = (state: RootState) => state.shop.items
export const selectShopLoading = (state: RootState) => state.shop.loading
