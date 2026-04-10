import { combineReducers } from '@reduxjs/toolkit'
import movieReducer from './movieData/movieSlice'
import shopReducer from './shopData/shopSlice'
import newsReducer from './newsData/newsSlice'
import eventReducer from './eventData/eventSlice'
import theaterReducer from './theaterData/theaterSlice'
import showtimeReducer from './showtimeData/showtimeSlice'
import userReducer from './userData/userSlice'
import roomReducer from './roomData/roomSlice'
import bannerReducer from './bannerData/bannerSlice'
import scheduleReducer from './scheduleData/scheduleSlice'
import bookingReducer from './bookingData/bookingSlice'

const rootReducer = combineReducers({
  movie: movieReducer,
  shop: shopReducer,
  news: newsReducer,
  event: eventReducer,
  theater: theaterReducer,
  showtime: showtimeReducer,
  user: userReducer,
  room: roomReducer,
  banner: bannerReducer,
  schedule: scheduleReducer,
  booking: bookingReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
