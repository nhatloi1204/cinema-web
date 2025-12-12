export interface Theater {
  _id: string
  name: string
  location: string
  createdAt?: string
  updatedAt?: string
}

export interface TheaterState {
  theaters: Theater[]
  selectedTheater: Theater | null
  loading: boolean
  error: string | null
}
