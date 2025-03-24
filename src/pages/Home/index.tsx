import Carousel from '../../components/Carousel'
import QuickBooking from '../../components/QuickBooking'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MovieSlider from '../../components/MovieSlider'
import { Movie } from '../../types/types'

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

const moviesNowShowing: Movie[] = [
  {
    id: 1,
    title: 'Nhat Loi',
    image: '/src/assets/images/banner1.png',
    genre: 'Tâm lý',
    duration: '100 phút',
    releaseDate: '24-03-2025',
  },
  {
    id: 2,
    title: 'Nhat Loi',
    image: '/src/assets/images/banner2.png',
    genre: 'Hoạt hình',
    duration: '100 phút',
    releaseDate: '24-03-2025',
  },
  {
    id: 3,
    title: 'Nhat Loi',
    image: '/src/assets/images/banner1.png',
    genre: 'Hành động',
    duration: '100 phút',
    releaseDate: '24-03-2025',
  },
  {
    id: 4,
    title: 'Nhat Loi',
    image: '/src/assets/images/banner2.png',
    genre: 'Kinh dị',
    duration: '100 phút',
    releaseDate: '24-03-2025',
  },
]

const moviesComingSoon: Movie[] = []
const moviesSpecialShows: Movie[] = []

function Home() {
  const [activeTab, setActiveTab] = useState<string>('nowShowing')

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
      <div>
        <QuickBooking
          theaters={theaters}
          movies={movies}
          dates={dates}
          times={times}
        />
      </div>
      {/* Quick Booking */}

      <div className='flex justify-center gap-6 px-36 pt-10 bg-white'>
        <button
          className={`py-2 px-4 rounded-t-lg  transition w-[25%] uppercase font-bungee text-normalBlue ${
            activeTab === 'nowShowing'
              ? 'bg-normalBlue text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('nowShowing')}
        >
          Phim Đang Chiếu
        </button>
        <button
          className={`py-2 px-4 rounded-t-lg  transition w-[25%] uppercase font-bungee text-normalBlue ${
            activeTab === 'comingSoon'
              ? 'bg-normalBlue text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('comingSoon')}
        >
          Phim Sắp Chiếu
        </button>
        <button
          className={`py-2 px-4 rounded-t-lg  transition w-[25%] uppercase font-bungee text-normalBlue ${
            activeTab === 'specialShows'
              ? 'bg-normalBlue text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('specialShows')}
        >
          Suất Chiếu Đặc Biệt
        </button>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md overflow-hidden min-h-[600px]'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'nowShowing' && (
              <MovieSlider title='' movies={moviesNowShowing} />
            )}
            {activeTab === 'comingSoon' &&
              (moviesComingSoon.length > 0 ? (
                <MovieSlider title='Phim Sắp Chiếu' movies={moviesComingSoon} />
              ) : (
                <div className='h-full flex items-center justify-center'>
                  <p className='text-center text-gray-500'>
                    🟡 Hiện tại chưa có phim sắp chiếu.
                  </p>
                </div>
              ))}
            {activeTab === 'specialShows' &&
              (moviesSpecialShows.length > 0 ? (
                <MovieSlider
                  title='Suất Chiếu Đặc Biệt'
                  movies={moviesSpecialShows}
                />
              ) : (
                <div className='h-full flex items-center justify-center'>
                  <p className='text-center text-gray-500'>
                    🔴 Hiện tại chưa có suất chiếu đặc biệt.
                  </p>
                </div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}

export default Home
