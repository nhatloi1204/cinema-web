export interface Seat {
  code: string
  type: 'normal' | 'vip'
}

export interface Room {
  _id: string
  name: string
  theaterId: { _id: string; name: string }
  rows: number
  cols: number
  seatLayout: (Seat | null)[][]
  createdAt?: string
  updatedAt?: string
}

export interface RoomState {
  rooms: Room[]
  selectedRoom: Room | null
  loading: boolean
  error: string | null
}
