import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchNews } from '../../../store/newsData/newsThunk'
import { selectNews } from '../../../store/newsData/newsSelector'
import { pathKeys } from '../../../constants'
import NewsCard from '../../../components/NewsCard'

const NewsSection: React.FC = () => {
  const hasInitialized = useRef(false)
  const dispatch = useAppDispatch()

  const news = useAppSelector(selectNews)

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      dispatch(fetchNews())
    }
  }, [dispatch])

  return (
    <div className='bg-blue-light'>
      {/* Header */}
      <div className='pt-8 md:pt-12 lg:pt-16 px-[50px] md:px-8 lg:px-16 mx-auto max-w-7xl'>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-4'>
          <p className='uppercase text-blue-normal font-bungee text-2xl md:text-3xl lg:text-4xl'>
            Tin tức
          </p>
          <Link to={pathKeys.NEWS} className='w-fit'>
            <button className='text-xs md:text-sm lg:text-lg uppercase font-bungee border-2 border-blue-normal rounded-full text-blue-normal py-1.5 px-3 md:px-4 lg:px-6 hover:bg-blue-lightHover active:bg-blue-lightActive transition-all whitespace-nowrap'>
              Xem thêm
            </button>
          </Link>
        </div>
      </div>
      {/* News Grid */}
      <div className='py-6 md:py-8 lg:py-10 px-4 md:px-8 lg:px-16 mx-auto max-w-7xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4'>
          {news.slice(0, 3).map(item => (
            <NewsCard key={item._id} image={item.image} title={item.title} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default React.memo(NewsSection)
