// store/showtimeData/showtimeSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import { fetchShowtimesByMovie } from './showtimeThunk'
import { Showtime } from './showtimeType'

interface ShowtimeState {
  data: Showtime[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: ShowtimeState = {
  data: [],
  status: 'idle',
}

const showtimeSlice = createSlice({
  name: 'showtimes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchShowtimesByMovie.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },
})

export default showtimeSlice.reducer
