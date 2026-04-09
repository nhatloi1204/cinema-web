export interface GeneratedShowtime {
  roomId: string
  roomName: string
  theaterId: string
  movieId: string
  movieTitle: string
  date: string
  startTime: string
  endTime: string
  duration: number
  price: number
}

export interface ScheduleGeneratorConfig {
  filmIds: string[]
  filmPriorities: number[]
  roomIds: string[]
  startDate: string
  endDate: string
  timeSlots: string[]
  bufferTime: number
  price: number
  theaterId: string
}

export interface ScheduleState {
  config: ScheduleGeneratorConfig | null
  preview: GeneratedShowtime[]
  previewLoading: boolean
  previewError: string | null
  saveLoading: boolean
  saveError: string | null
  savedShowtimes: any[] | null
  successMessage: string | null
}
