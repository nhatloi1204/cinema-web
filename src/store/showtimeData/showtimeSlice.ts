import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShowtimeState, Showtime } from './showtimeType'
import {
  fetchShowtimes,
  fetchShowtimeById,
  fetchShowtimesByMovie,
  createShowtime,
  updateShowtime,
  deleteShowtime,
} from './showtimeThunk'

const initialState: ShowtimeState = {
  showtimes: [],
  loading: false,
  error: null,
}

const showtimeSlice = createSlice({
  name: 'showtime',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    // Fetch all showtimes
    builder
      .addCase(fetchShowtimes.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchShowtimes.fulfilled,
        (state, action: PayloadAction<Showtime[]>) => {
          state.loading = false
          state.showtimes = action.payload
        },
      )
      .addCase(fetchShowtimes.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Fetch showtime by ID
    builder
      .addCase(fetchShowtimeById.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchShowtimeById.fulfilled, state => {
        state.loading = false
      })
      .addCase(fetchShowtimeById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Fetch showtimes by movie
    builder
      .addCase(fetchShowtimesByMovie.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchShowtimesByMovie.fulfilled,
        (state, action: PayloadAction<Showtime[]>) => {
          state.loading = false
          state.showtimes = action.payload
        },
      )
      .addCase(fetchShowtimesByMovie.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Create showtime
    builder
      .addCase(createShowtime.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        createShowtime.fulfilled,
        (state, action: PayloadAction<Showtime>) => {
          state.loading = false
          state.showtimes.push(action.payload)
        },
      )
      .addCase(createShowtime.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Update showtime
    builder
      .addCase(updateShowtime.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        updateShowtime.fulfilled,
        (state, action: PayloadAction<Showtime>) => {
          state.loading = false
          const index = state.showtimes.findIndex(
            s => s._id === action.payload._id,
          )
          if (index !== -1) {
            state.showtimes[index] = action.payload
          }
        },
      )
      .addCase(updateShowtime.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Delete showtime
    builder
      .addCase(deleteShowtime.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        deleteShowtime.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false
          state.showtimes = state.showtimes.filter(
            s => s._id !== action.payload,
          )
        },
      )
      .addCase(deleteShowtime.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError } = showtimeSlice.actions
export default showtimeSlice.reducer
