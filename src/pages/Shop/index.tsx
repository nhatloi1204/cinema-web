import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchShopItems } from '../../store/shopData/shopThunk'
import {
  selectShopItems,
  selectShopLoading,
} from '../../store/shopData/shopSelector'
import { motion, AnimatePresence } from 'framer-motion'
import { FaShoppingCart } from 'react-icons/fa'

function ShopPage() {
  const dispatch = useAppDispatch()
  const shopItems = useAppSelector(selectShopItems)
  const loading = useAppSelector(selectShopLoading)

  useEffect(() => {
    dispatch(fetchShopItems())
  }, [dispatch])

  if (loading) {
    return (
      <div className='w-screen overflow-x-hidden'>
        <div className='text-center text-lg md:text-2xl py-24 md:py-32 text-gray-500'>
          Đang tải menu...
        </div>
      </div>
    )
  }

  return (
    <div className='w-screen overflow-x-hidden'>
      {/* Banner Section */}
      <div className='bg-gradient-to-r from-blue-normal to-blue-light py-8 md:py-16 lg:py-24'>
        <div className='px-[50px] md:px-8 lg:px-16 mx-auto max-w-7xl'>
          <div className='text-center'>
            <h1 className='text-3xl md:text-4xl lg:text-6xl font-bungee text-white mb-2 md:mb-4 flex items-center justify-center gap-2 md:gap-3'>
              <FaShoppingCart className='text-xl md:text-3xl lg:text-5xl' />
              Menu Hấp Dẫn
            </h1>
            <p className='text-xs md:text-sm lg:text-base text-blue-100'>
              Khám phá những sản phẩm ngon miệng phục vụ cho bạn
            </p>
          </div>
        </div>
      </div>

      {/* Shop Grid */}
      <div className='bg-white py-8 md:py-12 lg:py-16 px-[50px] md:px-8 lg:px-16'>
        <div className='mx-auto max-w-7xl'>
          {shopItems.length === 0 ? (
            <div className='text-center py-16 text-gray-500'>
              <p className='text-lg'>Chưa có sản phẩm nào</p>
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6'>
              <AnimatePresence>
                {shopItems.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className='group bg-white rounded-lg md:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-light flex flex-col'
                  >
                    {/* Image Container - Fixed */}
                    <div className='relative w-full h-24 md:h-32 lg:h-40 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                      />
                      <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300'></div>
                    </div>

                    {/* Title - Fixed Height 2 lines */}
                    <div className='h-10 md:h-12 lg:h-14 p-2 md:p-3 lg:p-4 flex items-start border-b border-gray-100 overflow-hidden'>
                      <h3 className='text-xs md:text-sm lg:text-base font-bold text-blue-normal line-clamp-2 group-hover:text-blue-light transition-colors'>
                        {item.name}
                      </h3>
                    </div>

                    {/* Description - Fixed Height 5-6 lines */}
                    <div className='h-20 md:h-24 lg:h-28 p-2 md:p-3 lg:p-4 overflow-hidden border-b border-gray-100'>
                      <p className='text-[10px] md:text-xs lg:text-sm text-gray-600 line-clamp-6 leading-snug'>
                        {item.description}
                      </p>
                    </div>

                    {/* Price & Button - Fixed */}
                    <div className='h-10 md:h-12 lg:h-14 p-2 md:p-3 lg:p-4 flex items-center justify-between'>
                      <span className='text-xs md:text-sm lg:text-base font-bold text-blue-normal'>
                        {item.price.toLocaleString()}₫
                      </span>
                      <button className='bg-blue-normal hover:bg-blue-light active:bg-blue-dark text-white text-[9px] md:text-xs lg:text-sm py-1 md:py-1.5 px-2 md:px-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-110 active:scale-95'>
                        Thêm
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

export default ShopPage
