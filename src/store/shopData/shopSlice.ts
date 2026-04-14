import { createSlice } from '@reduxjs/toolkit'
import { ShopItem } from './shopType'
import {
  fetchShopItems,
  createShopItem,
  updateShopItem,
  deleteShopItem,
} from './shopThunk'

interface ShopState {
  items: ShopItem[]
  loading: boolean
  error: string | null
}

const initialState: ShopState = {
  items: [],
  loading: false,
  error: null,
}

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      // Fetch Shop Items
      .addCase(fetchShopItems.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchShopItems.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchShopItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch shop items'
      })
      // Create Shop Item
      .addCase(createShopItem.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createShopItem.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.loading = false
      })
      .addCase(createShopItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to create shop item'
      })
      // Update Shop Item
      .addCase(updateShopItem.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateShopItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          item => item._id === action.payload._id,
        )
        if (index !== -1) {
          state.items[index] = action.payload
        }
        state.loading = false
      })
      .addCase(updateShopItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to update shop item'
      })
      // Delete Shop Item
      .addCase(deleteShopItem.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteShopItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload)
        state.loading = false
      })
      .addCase(deleteShopItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to delete shop item'
      })
  },
})

export const { clearError } = shopSlice.actions
export default shopSlice.reducer
