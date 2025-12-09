import { combineReducers } from '@reduxjs/toolkit'
import movieReducer from './movieData/movieSlice'
import shopReducer from './shopData/shopSlice'
import newsReducer from './newsData/newsSlice'
import eventReducer from './eventData/eventSlice'
// import theaterReducer from './theaterData/theaterSlice'
import showtimeReducer from './showtimeData/showtimeSlice'
import userReducer from './userData/userSlice'

const rootReducer = combineReducers({
  movie: movieReducer,
  shop: shopReducer,
  news: newsReducer,
  event: eventReducer,
  // theater: theaterReducer,
  showtime: showtimeReducer,
  user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
