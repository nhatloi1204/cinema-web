import { RootState } from '../rootReducer'

export const selectRooms = (state: RootState) => state.room.rooms
export const selectSelectedRoom = (state: RootState) => state.room.selectedRoom
export const selectRoomLoading = (state: RootState) => state.room.loading
export const selectRoomError = (state: RootState) => state.room.error
