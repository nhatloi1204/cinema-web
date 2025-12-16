import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RoomState, Room } from './roomType'
import {
  fetchRooms,
  fetchRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from './roomThunk'

const initialState: RoomState = {
  rooms: [],
  selectedRoom: null,
  loading: false,
  error: null,
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    },
    clearSelectedRoom: state => {
      state.selectedRoom = null
    },
  },
  extraReducers: builder => {
    // Fetch all rooms
    builder
      .addCase(fetchRooms.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.loading = false
        state.rooms = action.payload
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Fetch room by ID
    builder
      .addCase(fetchRoomById.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchRoomById.fulfilled,
        (state, action: PayloadAction<Room>) => {
          state.loading = false
          state.selectedRoom = action.payload
        },
      )
      .addCase(fetchRoomById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Create room
    builder
      .addCase(createRoom.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.loading = false
        state.rooms.push(action.payload)
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Update room
    builder
      .addCase(updateRoom.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.loading = false
        const index = state.rooms.findIndex(r => r._id === action.payload._id)
        if (index !== -1) {
          state.rooms[index] = action.payload
        }
        if (state.selectedRoom?._id === action.payload._id) {
          state.selectedRoom = action.payload
        }
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Delete room
    builder
      .addCase(deleteRoom.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteRoom.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false
        state.rooms = state.rooms.filter(r => r._id !== action.payload)
        if (state.selectedRoom?._id === action.payload) {
          state.selectedRoom = null
        }
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, clearSelectedRoom } = roomSlice.actions
export default roomSlice.reducer
