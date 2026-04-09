import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchShopItems } from '../../../store/shopData/shopThunk'
import {
  selectShopItems,
  // selectShopLoading,
} from '../../../store/shopData/shopSelector'
import { pathKeys } from '../../../constants'
import ShopItemSlider from '../../../components/ShopItemSlider'

const ShopMenuSection: React.FC = () => {
  const hasInitialized = useRef(false)
  const dispatch = useAppDispatch()

  const shopItems = useAppSelector(selectShopItems)
  // const loading = useAppSelector(selectShopLoading) // Commented out as it's unused

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      dispatch(fetchShopItems())
    }
  }, [dispatch])

  return (
    <div className='py-8 md:py-12 lg:py-16'>
      {/* Header */}
      <div className='px-[50px] md:px-8 lg:px-16 mb-6 md:mb-8 mx-auto max-w-7xl'>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-4'>
          <p className='uppercase font-bungee text-2xl md:text-3xl lg:text-4xl text-blue-normal'>
            Menu hấp dẫn
          </p>
          <Link to={pathKeys.SHOP} className='w-fit'>
            <button className='text-xs md:text-sm lg:text-lg uppercase font-bungee border-2 border-blue-normal rounded-full text-blue-normal py-1.5 px-3 md:px-4 lg:px-6 hover:bg-blue-lightHover active:bg-blue-lightActive transition-all whitespace-nowrap'>
              Xem thêm
            </button>
          </Link>
        </div>
      </div>

      {/* Slider */}
      <div>
        <ShopItemSlider shopItems={shopItems} />
      </div>
    </div>
  )
}

export default React.memo(ShopMenuSection)
