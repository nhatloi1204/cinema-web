import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TheaterState, Theater } from './theaterType'
import {
  fetchTheaters,
  fetchTheaterById,
  createTheater,
  updateTheater,
  deleteTheater,
} from './theaterThunk'

const initialState: TheaterState = {
  theaters: [],
  selectedTheater: null,
  loading: false,
  error: null,
}

const theaterSlice = createSlice({
  name: 'theater',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    },
    clearSelectedTheater: state => {
      state.selectedTheater = null
    },
  },
  extraReducers: builder => {
    // Fetch all theaters
    builder
      .addCase(fetchTheaters.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchTheaters.fulfilled,
        (state, action: PayloadAction<Theater[]>) => {
          state.loading = false
          state.theaters = action.payload
        },
      )
      .addCase(fetchTheaters.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Fetch theater by ID
    builder
      .addCase(fetchTheaterById.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchTheaterById.fulfilled,
        (state, action: PayloadAction<Theater>) => {
          state.loading = false
          state.selectedTheater = action.payload
        },
      )
      .addCase(fetchTheaterById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Create theater
    builder
      .addCase(createTheater.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        createTheater.fulfilled,
        (state, action: PayloadAction<Theater>) => {
          state.loading = false
          state.theaters.push(action.payload)
        },
      )
      .addCase(createTheater.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Update theater
    builder
      .addCase(updateTheater.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        updateTheater.fulfilled,
        (state, action: PayloadAction<Theater>) => {
          state.loading = false
          const index = state.theaters.findIndex(
            t => t._id === action.payload._id,
          )
          if (index !== -1) {
            state.theaters[index] = action.payload
          }
          if (state.selectedTheater?._id === action.payload._id) {
            state.selectedTheater = action.payload
          }
        },
      )
      .addCase(updateTheater.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Delete theater
    builder
      .addCase(deleteTheater.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        deleteTheater.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false
          state.theaters = state.theaters.filter(t => t._id !== action.payload)
          if (state.selectedTheater?._id === action.payload) {
            state.selectedTheater = null
          }
        },
      )
      .addCase(deleteTheater.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, clearSelectedTheater } = theaterSlice.actions
export default theaterSlice.reducer
