import Carousel from '../../components/Carousel'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchNews } from '../../store/newsData/newsThunk'
import { fetchEvents } from '../../store/eventData/eventThunk'
import {
  selectNews,
  selectNewsLoading,
} from '../../store/newsData/newsSelector'
import { selectEvents } from '../../store/eventData/eventSelector'
import { motion, AnimatePresence } from 'framer-motion'
import { FaNewspaper } from 'react-icons/fa'

function News() {
  const dispatch = useAppDispatch()
  const news = useAppSelector(selectNews)
  const loading = useAppSelector(selectNewsLoading)

  // Events
  const events = useAppSelector(selectEvents)
  const slides = events.map(event => ({
    id: event._id,
    image: event.image,
    title: event.title,
    subtitle: event.title,
  }))

  useEffect(() => {
    dispatch(fetchNews())
    dispatch(fetchEvents())
  }, [dispatch])

  if (loading) {
    return (
      <div className='w-screen overflow-x-hidden'>
        <div className='text-center text-lg md:text-2xl py-24 md:py-32 text-gray-500'>
          Đang tải tin tức...
        </div>
      </div>
    )
  }

  return (
    <div className='w-screen overflow-x-hidden'>
      {/* Header Section */}
      <div className='bg-gradient-to-r from-blue-light to-blue-normal py-8 md:py-16 lg:py-24'>
        <div className='px-[50px] md:px-8 lg:px-16 mx-auto max-w-7xl'>
          <div className='text-center'>
            <h1 className='text-3xl md:text-4xl lg:text-6xl font-bungee text-white mb-2 md:mb-4 flex items-center justify-center gap-2 md:gap-3'>
              <FaNewspaper className='text-xl md:text-3xl lg:text-5xl' />
              Tin Tức & Ưu Đãi
            </h1>
            <p className='text-xs md:text-sm lg:text-base text-blue-100'>
              Cập nhật những tin tức mới nhất và ưu đãi hấp dẫn từ SPIXAL
            </p>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className='bg-white py-8 md:py-12 lg:py-16 px-[50px] md:px-8 lg:px-16'>
        <div className='mx-auto max-w-7xl'>
          {news.length === 0 ? (
            <div className='text-center py-16 text-gray-500'>
              <p className='text-lg'>Chưa có tin tức nào</p>
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6'>
              <AnimatePresence>
                {news.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className='group bg-white rounded-lg md:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-light flex flex-col cursor-pointer'
                  >
                    {/* Image Container - Fixed */}
                    <div className='relative w-full h-24 md:h-32 lg:h-40 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300'>
                      <img
                        src={item.image}
                        alt={item.title}
                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    </div>

                    {/* Title & Badge - Fixed Height 2 lines */}
                    <div className='h-10 md:h-12 lg:h-14 p-2 md:p-3 lg:p-4 flex flex-col items-start justify-start border-b border-gray-100 overflow-hidden'>
                      {/* Badge */}
                      <span className='inline-block bg-blue-light text-blue-normal text-[8px] md:text-xs px-2 py-0.5 rounded-full font-bold uppercase mb-0.5'>
                        Tin Tức
                      </span>

                      {/* Title */}
                      <h3 className='text-xs md:text-sm lg:text-base font-bold text-blue-normal line-clamp-2 group-hover:text-blue-light transition-colors'>
                        {item.title}
                      </h3>
                    </div>

                    {/* Description - Fixed Height 5-6 lines */}
                    <div className='h-20 md:h-24 lg:h-28 p-2 md:p-3 lg:p-4 overflow-hidden border-b border-gray-100'>
                      <p className='text-[10px] md:text-xs lg:text-sm text-gray-600 line-clamp-6 leading-snug'>
                        {item.content}
                      </p>
                    </div>

                    {/* Button - Fixed */}
                    <div className='h-10 md:h-12 lg:h-14 p-2 md:p-3 lg:p-4 flex items-center'>
                      <button className='text-blue-normal hover:text-blue-light text-[9px] md:text-xs lg:text-sm font-bold uppercase transition-colors duration-200 flex items-center gap-1'>
                        Xem Thêm
                        <span>→</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default News
