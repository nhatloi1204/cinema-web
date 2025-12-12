import Carousel from '../../components/Carousel'
import ShopItemSlider from '../../components/ShopItemSlider'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MovieSlider from '../../components/MovieSlider'
import NewsCard from '../../components/NewsCard'
import { Link } from 'react-router-dom'
import { pathKeys } from '../../constants'
import { formatDate } from '../../utils/formatDate'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchMovies } from '../../store/movieData/movieThunk'
import { fetchEvents } from '../../store/eventData/eventThunk'
import { fetchShopItems } from '../../store/shopData/shopThunk'
import { fetchNews } from '../../store/newsData/newsThunk'
import {
  selectMovies,
  selectMovieLoading,
  selectMovieError,
} from '../../store/movieData/movieSelector'
import {
  selectEvents,
  selectEventLoading,
} from '../../store/eventData/eventSelector'
import {
  selectShopItems,
  selectShopLoading,
} from '../../store/shopData/shopSelector'
import {
  selectNews,
  selectNewsLoading,
} from '../../store/newsData/newsSelector'

// const theaters = ['CGV Van Hanh Mall', 'CGV Crescent Mall']
// const movies = ['Avengers', 'Batman', 'Spider-Man', 'Interstellar']
// const dates = ['24/03/2025', '25/03/2025', '26/03/2025']
// const times = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM']

function Home() {
  const [activeTab, setActiveTab] = useState<string>('nowShowing')
  const hasInitialized = useRef(false)

  const dispatch = useAppDispatch()

  // Movies
  const movies = useAppSelector(selectMovies)
  const loading = useAppSelector(selectMovieLoading)
  const error = useAppSelector(selectMovieError)

  // Events
  const events = useAppSelector(selectEvents)
  const eventLoading = useAppSelector(selectEventLoading)
  const slides = events.map(event => event.image)

  // Shop Items
  const shopItems = useAppSelector(selectShopItems)
  const shopLoading = useAppSelector(selectShopLoading)

  // News
  const news = useAppSelector(selectNews)
  const newsLoading = useAppSelector(selectNewsLoading)

  useEffect(() => {
    // Chỉ dispatch 1 lần khi component mount
    if (!hasInitialized.current) {
      hasInitialized.current = true
      dispatch(fetchMovies())
      dispatch(fetchEvents())
      dispatch(fetchShopItems())
      dispatch(fetchNews())
    }
  }, [dispatch])
  console.log('Home rendering...')

  const validMovies = Array.isArray(movies) ? movies : []

  const moviesNowShowing = validMovies.filter(
    movie => movie.status === 'now_showing',
  )
  const moviesComingSoon = validMovies.filter(
    movie => movie.status === 'coming_soon',
  )
  const moviesSpecialShows = validMovies.filter(
    movie => movie.status === 'special',
  )

  return (
    <>
      {/* Carousel */}
      <div className='w-full'>
        <Carousel autoSlide={false} autoSlideInterval={3000}>
          {slides.map((s, i) => (
            <img
              key={i}
              src={s}
              alt='banner'
              className='w-full h-full max-h-[35rem] object-cover'
            />
          ))}
        </Carousel>
      </div>
      {/* Carousel */}

      {/* Quick Booking */}
      {/* <div>
        <QuickBooking
          theaters={theaters}
          movies={movies}
          dates={dates}
          times={times}
        />
      </div> */}
      {/* Quick Booking */}

      <div className='flex justify-center gap-6 px-36 pt-10 bg-white'>
        <button
          className={`py-2 px-4 rounded-t-lg  transition w-[25%] uppercase font-bungee text-blue-normal ${
            activeTab === 'nowShowing'
              ? 'bg-blue-normal text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('nowShowing')}
        >
          Phim Đang Chiếu
        </button>
        <button
          className={`py-2 px-4 rounded-t-lg  transition w-[25%] uppercase font-bungee text-blue-normal ${
            activeTab === 'comingSoon'
              ? 'bg-blue-normal text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('comingSoon')}
        >
          Phim Sắp Chiếu
        </button>
        <button
          className={`py-2 px-4 rounded-t-lg  transition w-[25%] uppercase font-bungee text-blue-normal ${
            activeTab === 'specialShows'
              ? 'bg-blue-normal text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('specialShows')}
        >
          Suất Chiếu Đặc Biệt
        </button>
      </div>

      <div className='bg-white m-8 rounded-lg overflow-hidden min-h-[600px]'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='flex justify-center'
          >
            {activeTab === 'nowShowing' && (
              <MovieSlider movies={moviesNowShowing} />
            )}

            {activeTab === 'comingSoon' && (
              <MovieSlider movies={moviesComingSoon} />
            )}

            {activeTab === 'specialShows' && (
              <MovieSlider movies={moviesSpecialShows} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Events */}
      <div className='px-64 pb-16'>
        <div className='flex justify-between'>
          <p className='uppercase font-bungee text-5xl text-blue-normal'>
            Sự kiện
          </p>
          <Link to={pathKeys.EVENTS}>
            <button className='w-48 h-auto text-2xl uppercase font-bungee border-2 border-blue-normal rounded-full text-blue-normal py-2 hover:bg-blue-lightHover active:bg-blue-lightActive'>
              Xem thêm
            </button>
          </Link>
        </div>

        {events.length > 0 && (
          <div className='flex gap-6 pt-10'>
            <img
              src={events[0].image}
              alt={events[0].title}
              className='h-96 min-w-3/5 object-cover rounded-3xl'
            />
            <div className='self-end'>
              <h1 className='uppercase text-3xl text-blue-normal font-bungee'>
                {events[0].title}
              </h1>
              <div className='py-6'>
                {events[0].description}
                <p>
                  <span className='text-blue-normal font-bold'>Thời gian:</span>{' '}
                  {formatDate(events[0].startDate)}
                </p>
              </div>
              <button className='w-48 h-auto text-2xl uppercase font-bungee border-0 border-blue-normal rounded-full text-blue-normal bg-blue-light'>
                <p className='py-2'>Khám phá</p>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Events */}

      {/* Menu */}
      <div className='bg-blue-normal py-16'>
        <div className='px-64 m-8'>
          <div className='flex justify-between'>
            <p className='uppercase font-bungee text-5xl text-white'>
              Menu hấp dẫn
            </p>
            <Link to={pathKeys.SHOP}>
              <button className='w-48 h-auto text-2xl uppercase font-bungee bg-white rounded-full text-blue-normal py-2 hover:bg-blue-lightHover active:bg-blue-lightActive'>
                Xem thêm
              </button>
            </Link>
          </div>
        </div>

        <div>
          <ShopItemSlider shopItems={shopItems} />
        </div>
      </div>
      {/* Menu */}

      {/* About Us */}
      <div className='w-full px-64 pb-16 pt-8'>
        <div className='flex gap-6 pt-10'>
          <img
            src='/src/assets/images/aboutUs1.png'
            alt='aboutUs1'
            className='h-96 min-w-3/5 object-cover rounded-3xl'
          />
          <div className='self-end'>
            <h1 className='uppercase text-3xl text-blue-normal font-bungee'>
              Về chúng mình
            </h1>
            <div className='py-6'>
              SPIXAL là thương hiệu rạp chiếu phim lấy tên từ SPIRIT (tinh thần)
              +  Pixal (đồng âm của Pixel, là đơn vị là điểm ảnh nhỏ nhất có thể
              hiển thị trên màn hình). Khác với các rạp chiếu phim truyền thống,
              SPIXAL mong muốn trở thành nơi khán giả tìm thấy sự kết nối về cảm
              xúc và trải nghiệm đặc biệt qua từng thiết kế của mình. Các thiết
              kế và câu chuyện thương hiệu lấy cảm hứng từ những cung bậc cảm
              xúc của khán giả qua mỗi một tác phẩm điện ảnh.
            </div>
            <Link to={pathKeys.ABOUT_US}>
              <button className='w-48 h-auto text-2xl uppercase font-bungee border-2 border-blue-normal rounded-full text-blue-normal hover:bg-blue-lightHover active:bg-blue-lightActive'>
                <p className='py-2 '>Xem thêm</p>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* News */}
      <div className='bg-blue-light px-40'>
        <div className='flex justify-between pt-16'>
          <h1 className='uppercase text-blue-normal font-bungee text-5xl'>
            Tin tức
          </h1>
          <Link to={pathKeys.NEWS}>
            <button className='w-48 h-auto text-2xl uppercase font-bungee border-2 border-blue-normal rounded-full text-blue-normal py-2 hover:bg-blue-lightHover active:bg-blue-lightActive'>
              Xem thêm
            </button>
          </Link>
        </div>
        <div className='py-10'>
          <div className='flex justify-between'>
            {news.slice(0, 4).map(item => (
              <NewsCard key={item._id} image={item.image} title={item.title} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
