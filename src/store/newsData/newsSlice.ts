import { createSlice } from '@reduxjs/toolkit'
import { News } from './newsType'
import { fetchNews } from './newsThunk'

interface NewsState {
  items: News[]
  loading: boolean
}

const initialState: NewsState = {
  items: [],
  loading: false,
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.loading = true
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchNews.rejected, state => {
        state.loading = false
      })
  },
})

export default newsSlice.reducer
