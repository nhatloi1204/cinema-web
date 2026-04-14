import { createSlice } from '@reduxjs/toolkit'
import { Event } from './eventType'
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from './eventThunk'

interface EventState {
  items: Event[]
  loading: boolean
  error: string | null
}

const initialState: EventState = {
  items: [],
  loading: false,
  error: null,
}

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      // Fetch Events
      .addCase(fetchEvents.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch events'
      })
      // Create Event
      .addCase(createEvent.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.loading = false
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to create event'
      })
      // Update Event
      .addCase(updateEvent.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          event => event._id === action.payload._id,
        )
        if (index !== -1) {
          state.items[index] = action.payload
        }
        state.loading = false
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to update event'
      })
      // Delete Event
      .addCase(deleteEvent.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.items = state.items.filter(event => event._id !== action.payload)
        state.loading = false
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to delete event'
      })
  },
})

export const { clearError } = eventSlice.actions
export default eventSlice.reducer
