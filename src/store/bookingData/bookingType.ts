// Movie Type
export interface Movie {
  _id: string
  title: string
  description?: string
  genre?: string
  duration?: number
  poster?: string
  releaseDate?: string
  status?: string
}

// Theater Type
export interface Theater {
  _id: string
  name: string
  address?: string
  city?: string
  phone?: string
}

// Room Type
export interface Room {
  _id: string
  name: string
  theater?: Theater | string
  capacity?: number
  rows?: number
  seatsPerRow?: number
}

// Showtime Type (from backend, contains IDs not populated objects by default)
// But can be populated with movie, room, theater data
export interface Showtime {
  _id: string
  movieId?: string // ID reference to Movie
  roomId?: string // ID reference to Room
  theaterId?: string // ID reference to Theater
  startTime: string // ISO date string
  endTime: string // ISO date string
  price: number
  createdAt?: string
  updatedAt?: string
  // Populated data when fetched with .populate()
  movie?: Movie
  room?: Room
  theater?: Theater
}

// Shop Item Type
export interface ShopItem {
  itemId: {
    _id: string
    name: string
    price: number
  }
  quantity: number
  price?: number // calculated price (quantity * itemId.price)
}

// User Type
export interface User {
  _id: string
  name: string
  email: string
  phoneNumber?: string
}

// Booking Type
export interface Booking {
  _id: string
  userId: User | string
  showtimeId: Showtime
  seats: string[] // e.g., ['A1', 'A2']
  shopItems: ShopItem[]
  totalPrice: number
  paymentStatus: 'pending' | 'paid' | 'cancelled'
  createdAt: string
  updatedAt: string
}

// Redux State Type
export interface BookingsState {
  bookings: Booking[]
  currentBooking: Booking | null
  loading: boolean
  error: string | null
}
