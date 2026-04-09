export interface Banner {
  _id: string
  title: string
  subtitle?: string
  image: string
  link?: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface BannerState {
  items: Banner[]
  loading: boolean
  error: string | null
}
