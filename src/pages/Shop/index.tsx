import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchShopItems } from '../../store/shopData/shopThunk'
import {
  selectShopItems,
  selectShopLoading,
} from '../../store/shopData/shopSelector'

function ShopPage() {
  const dispatch = useAppDispatch()
  const shopItems = useAppSelector(selectShopItems)
  const loading = useAppSelector(selectShopLoading)

  useEffect(() => {
    dispatch(fetchShopItems())
  }, [dispatch])

  if (loading) {
    return <div className='text-center text-2xl py-32'>Đang tải menu...</div>
  }

  return (
    <div className='bg-white py-16 px-20'>
      <h1 className='text-blue-normal font-bungee text-5xl text-center mb-16'>
        Menu hấp dẫn
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12'>
        {shopItems.map(item => (
          <div
            key={item._id}
            className='bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2'
          >
            <img
              src={item.image}
              alt={item.name}
              className='w-full h-64 object-cover'
            />
            <div className='p-4 flex flex-col justify-between h-48'>
              <div>
                <h2 className='text-xl font-bold text-blue-normal'>
                  {item.name}
                </h2>
                <p className='text-gray-600 mt-2 line-clamp-2'>
                  {item.description}
                </p>
              </div>
              <div className='flex justify-between items-center mt-4'>
                <p className='text-lg font-semibold text-blue-normal'>
                  {item.price.toLocaleString()}₫
                </p>
                <button className='bg-blue-normal text-white py-1 px-4 rounded-full hover:bg-blue-lightHover active:bg-blue-lightActive'>
                  Thêm
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopPage
