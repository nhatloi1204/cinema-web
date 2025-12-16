export interface Showtime {
  _id: string
  movieId: {
    _id: string
    title: string
  }
  roomId: {
    _id: string
    name: string
  }
  theaterId: {
    _id: string
    name: string
  }
  startTime: string
  endTime: string
  price: number
  createdAt?: string
  updatedAt?: string
}

export interface ShowtimeState {
  showtimes: Showtime[]
  loading: boolean
  error: string | null
}
