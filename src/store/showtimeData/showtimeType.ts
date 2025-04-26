// src/store/showtimeData/showtimeType.ts
export interface Showtime {
  _id: string
  movieId: string
  roomId: string
  theaterId: {
    _id: string
    name: string
  }
  startTime: string
  endTime: string
  price: number
}
