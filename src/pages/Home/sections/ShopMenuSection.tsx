import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchShopItems } from '../../../store/shopData/shopThunk'
import {
  selectShopItems,
  selectShopLoading,
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
    <div className='py-16'>
      <div className='px-64 mb-16'>
        <div className='flex justify-between'>
          <p className='uppercase font-bungee text-5xl text-blue-normal'>
            Menu hấp dẫn
          </p>
          <Link to={pathKeys.SHOP}>
            <button className='w-48 h-auto text-2xl uppercase font-bungee border-2 border-blue-normal rounded-full text-blue-normal py-2 hover:bg-blue-lightHover active:bg-blue-lightActive'>
              Xem thêm
            </button>
          </Link>
        </div>
      </div>

      <div>
        <ShopItemSlider shopItems={shopItems} />
      </div>
    </div>
  )
}

export default React.memo(ShopMenuSection)
