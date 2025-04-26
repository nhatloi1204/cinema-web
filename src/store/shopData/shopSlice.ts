import { createSlice } from '@reduxjs/toolkit'
import { ShopItem } from './shopType'
import { fetchShopItems } from './shopThunk'

interface ShopState {
  items: ShopItem[]
  loading: boolean
}

const initialState: ShopState = {
  items: [],
  loading: false,
}

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchShopItems.pending, state => {
        state.loading = true
      })
      .addCase(fetchShopItems.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchShopItems.rejected, state => {
        state.loading = false
      })
  },
})

export default shopSlice.reducer
