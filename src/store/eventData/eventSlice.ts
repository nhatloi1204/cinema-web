import { createSlice } from '@reduxjs/toolkit'
import { Event } from './eventType'
import { fetchEvents } from './eventThunk'

interface EventState {
  items: Event[]
  loading: boolean
}

const initialState: EventState = {
  items: [],
  loading: false,
}

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, state => {
        state.loading = true
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchEvents.rejected, state => {
        state.loading = false
      })
  },
})

export default eventSlice.reducer
