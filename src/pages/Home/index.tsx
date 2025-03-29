import Carousel from '../../components/Carousel'
import QuickBooking from '../../components/QuickBooking'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MovieSlider from '../../components/MovieSlider'
import { Movie } from '../../types/types'
import NewsCard from '../../components/NewsCard'
import { Link } from 'react-router-dom'
import { pathKeys } from '../../constants'

const slides = [
  '/src/assets/images/carousel/banner1.png',
  '/src/assets/images/carousel/banner2.png',
  '/src/assets/images/carousel/banner3.png',
  '/src/assets/images/carousel/banner4.png',
]

const theaters = ['CGV Van Hanh Mall', 'CGV Crescent Mall']
const movies = ['Avengers', 'Batman', 'Spider-Man', 'Interstellar']
const dates = ['24/03/2025', '25/03/2025', '26/03/2025']
const times = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM']

const moviesNowShowing: Movie[] = [
  {
    id: 1,
    title: 'Nhat Loi',
    image: '/src/assets/images/carousel/banner1.png',
    genre: 'Tâm lý',
    duration: '100 phút',
    releaseDate: '24-03-2025',
  },
  {
    id: 2,
    title: 'Nhat Loi',
    image: '/src/assets/images/carousel/banner2.png',
    genre: 'Hoạt hình',
    duration: '100 phút',
    releaseDate: '24-03-2025',
  },
  {
    id: 3,
    title: 'Nhat Loi',
    image: '/src/assets/images/carousel/banner1.png',
    genre: 'Hành động',
    duration: '100 phút',
    releaseDate: '24-03-2025',
  },
  {
    id: 4,
    title: 'Nhat Loi',
    image: '/src/assets/images/carousel/banner2.png',
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
              className='w-full h-full max-h-[35rem] object-cover'
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

      <div className='bg-white p-6 rounded-lg overflow-hidden min-h-[600px]'>
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
        <div className='flex gap-6 pt-10'>
          <img
            src='/src/assets/images/event1.png'
            alt='event1'
            className='h-96 min-w-3/5 object-cover rounded-3xl'
          />
          <div className='self-end'>
            <h1 className='uppercase text-3xl text-blue-normal font-bungee'>
              Sự kiện khai trương
            </h1>
            <div className='py-6'>
              Khám phá rạp chiếu phim hiện đại, nơi mọi khoảnh khắc đều sống
              động và tràn đầy cảm hứng! Tham gia lễ khai trương với suất chiếu
              miễn phí, ưu đãi hấp dẫn và nhiều hoạt động vui nhộn dành riêng
              cho bạn.
              <p>
                <span className='text-blue-normal font-bold'>Thời gian:</span>{' '}
                20-03-2025
              </p>
            </div>
            <button className='w-48 h-auto text-2xl uppercase font-bungee border-0 border-blue-normal rounded-full text-blue-normal bg-blue-light'>
              <p className='py-2 '>Khám phá</p>
            </button>
          </div>
        </div>
      </div>

      <div className='bg-blue-normal py-16'>
        <div className='px-64'>
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
          <MovieSlider title='' movies={moviesNowShowing} />
        </div>
      </div>

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
              <p>
                <span className='text-blue-normal font-bold'>Thời gian:</span>{' '}
                20-03-2025
              </p>
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
            <NewsCard
              image='/src/assets/images/event1.png'
              title='Ra mắt bộ phim Avatar 3 vào mùa đông 2025'
            />
            <NewsCard
              image='/src/assets/images/event1.png'
              title='Ra mắt bộ phim Avatar 3 vào mùa đông 2025'
            />
            <NewsCard
              image='/src/assets/images/event1.png'
              title='Ra mắt bộ phim Avatar 3 vào mùa đông 2025'
            />
            <NewsCard
              image='/src/assets/images/event1.png'
              title='Ra mắt bộ phim Avatar 3 vào mùa đông 2025'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
