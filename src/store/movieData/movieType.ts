export interface Movie {
  _id: string
  title: string
  description: string
  genre: string
  duration: number
  releaseDate: string
  poster: string
  trailerUrl: string
  director: string
  cast: string[]
  rating: number
  status: 'now_showing' | 'coming_soon' | 'special'
  createdAt: string
  updatedAt: string
}

export interface MoviesState {
  movies: Movie[]
  loading: boolean
  error: string | null
}
