import Carousel from '../../components/Carousel'
import { useState } from 'react'
import MovieCard from '../../components/MovieCard'

const slides = [
  '/src/assets/images/banner1.png',
  '/src/assets/images/banner2.png',
  '/src/assets/images/banner1.png',
  '/src/assets/images/banner2.png',
]

const theaters = ['CGV Van Hanh Mall', 'CGV Crescent Mall']
const movies = ['Avengers', 'Batman', 'Spider-Man', 'Interstellar']
const dates = ['24/03/2025', '25/03/2025', '26/03/2025']
const times = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM']

function Home() {
  const [selectedTheater, setSelectedTheater] = useState('')
  const [selectedMovie, setSelectedMovie] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  return (
    <>
      {/* Carousel */}
      <div className='w-full'>
        <Carousel autoSlide={true} autoSlideInterval={3000}>
          {slides.map((s, i) => (
            <img
              key={i}
              src={s}
              alt='banner'
              className='w-full h-auto max-h-[35rem] object-cover'
            />
          ))}
        </Carousel>
      </div>
      {/* Carousel */}

      {/* Quick Booking */}
      <section className='w-full h-24 bg-red-500 '>
        <div className='flex items-center justify-around  h-full px-10'>
          <div className='flex gap-10'>
            <img
              src='src/assets/images/miniLogo.png'
              alt='miniLogo'
              className='w-12 h-auto shrink-0'
            />

            <p className='font-bungee uppercase text-white text-xl leading-5'>
              Đặt Vé <br /> Nhanh
            </p>
          </div>

          {/* Dropdowns */}
          <div className='flex items-center gap-4'>
            {/* Theater Selection */}
            <select
              className='bg-white text-blue-500 font-bold px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition focus:outline-0'
              value={selectedTheater}
              onChange={e => setSelectedTheater(e.target.value)}
            >
              <option value=''>Chọn rạp</option>
              {theaters.map((theater, index) => (
                <option key={index} value={theater}>
                  {theater}
                </option>
              ))}
            </select>

            {/* Movie Selection */}
            <select
              className='bg-white text-blue-500 font-bold px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition focus:outline-0'
              value={selectedMovie}
              onChange={e => setSelectedMovie(e.target.value)}
            >
              <option value=''>Chọn phim</option>
              {movies.map((movie, index) => (
                <option key={index} value={movie}>
                  {movie}
                </option>
              ))}
            </select>

            {/* Date Selection */}
            <select
              className='bg-white text-blue-500 font-bold px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition focus:outline-0'
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            >
              <option value=''>Chọn ngày</option>
              {dates.map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>

            {/* Time Selection */}
            <select
              className='bg-white text-blue-500 font-bold px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition focus:outline-0'
              value={selectedTime}
              onChange={e => setSelectedTime(e.target.value)}
            >
              <option value=''>Chọn giờ</option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Book Now Button */}
          <button
            className='bg-white text-blue-500 font-bold px-6 py-2 rounded-full shadow-md hover:bg-gray-200 transition'
            disabled={
              !selectedTheater ||
              !selectedMovie ||
              !selectedDate ||
              !selectedTime
            }
          >
            Đặt Ngay
          </button>
        </div>
      </section>
      {/* Quick Booking */}

      {/* List Movie Card */}
      <div className='w-full'>
        <div className='flex gap-20 justify-center'>
          <MovieCard
            image='https://via.placeholder.com/150'
            movieName='The Great Adventure'
            type='Action'
            duration='2h 15m'
            openingDay={new Date('2025-05-10')} // ✅ Pass a real Date object
          />
          <MovieCard
            image='https://via.placeholder.com/150'
            movieName='The Great Adventure'
            type='Action'
            duration='2h 15m'
            openingDay={new Date('2025-05-10')} // ✅ Pass a real Date object
          />
          <MovieCard
            image='https://via.placeholder.com/150'
            movieName='The Great Adventure'
            type='Action'
            duration='2h 15m'
            openingDay={new Date('2025-05-10')} // ✅ Pass a real Date object
          />
        </div>
      </div>
      {/* List Movie Card */}
    </>
  )
}

export default Home
