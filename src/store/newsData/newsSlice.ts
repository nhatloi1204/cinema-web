import { createSlice } from '@reduxjs/toolkit'
import { News } from './newsType'
import { fetchNews, createNews, updateNews, deleteNews } from './newsThunk'

interface NewsState {
  items: News[]
  loading: boolean
  error: string | null
}

const initialState: NewsState = {
  items: [],
  loading: false,
  error: null,
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      // Fetch News
      .addCase(fetchNews.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch news'
      })
      // Create News
      .addCase(createNews.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.loading = false
      })
      .addCase(createNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to create news'
      })
      // Update News
      .addCase(updateNews.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        const index = state.items.findIndex(n => n._id === action.payload._id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
        state.loading = false
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to update news'
      })
      // Delete News
      .addCase(deleteNews.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.items = state.items.filter(n => n._id !== action.payload)
        state.loading = false
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to delete news'
      })
  },
})

export const { clearError } = newsSlice.actions
export default newsSlice.reducer
