import { createSlice } from '@reduxjs/toolkit'
import { BannerState } from './bannerType'
import {
  fetchBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from './bannerThunk'

const initialState: BannerState = {
  items: [],
  loading: false,
  error: null,
}

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      // Fetch Banners
      .addCase(fetchBanners.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch banners'
      })
      // Create Banner
      .addCase(createBanner.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.loading = false
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to create banner'
      })
      // Update Banner
      .addCase(updateBanner.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        const index = state.items.findIndex(b => b._id === action.payload._id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
        state.loading = false
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to update banner'
      })
      // Delete Banner
      .addCase(deleteBanner.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.items = state.items.filter(b => b._id !== action.payload)
        state.loading = false
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to delete banner'
      })
  },
})

export const { clearError } = bannerSlice.actions
export default bannerSlice.reducer
