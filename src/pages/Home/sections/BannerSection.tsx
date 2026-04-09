import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectBanners } from '../../../store/bannerData/bannerSelector'
import { fetchBanners } from '../../../store/bannerData/bannerThunk'
import Carousel from '../../../components/Carousel'

const BannerSection: React.FC = () => {
  const dispatch = useAppDispatch()
  const banners = useAppSelector(selectBanners)
  // const loading = useAppSelector(selectBannerLoading)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      dispatch(fetchBanners())
    }
  }, [dispatch])

  const slides = banners
    .sort((a, b) => a.order - b.order)
    .map(banner => ({
      id: banner._id,
      image: banner.image,
      title: banner.title,
      subtitle: banner.subtitle || '',
      link: banner.link,
    }))

  return (
    <div className='w-full'>
      <Carousel slides={slides} autoSlide autoSlideInterval={5000} />
    </div>
  )
}

export default React.memo(BannerSection)
