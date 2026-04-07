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
      <div className='pt-16 px-64'>
        <div className='flex justify-between '>
          <p className='uppercase text-blue-normal font-bungee text-5xl'>
            Tin tức
          </p>
          <Link to={pathKeys.NEWS}>
            <button className='w-48 h-auto text-2xl uppercase font-bungee border-2 border-blue-normal rounded-full text-blue-normal py-2 hover:bg-blue-lightHover active:bg-blue-lightActive'>
              Xem thêm
            </button>
          </Link>
        </div>
      </div>
      <div className='py-10 px-40'>
        <div className='flex justify-between gap-5'>
          {news.slice(0, 3).map(item => (
            <NewsCard key={item._id} image={item.image} title={item.title} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default React.memo(NewsSection)
