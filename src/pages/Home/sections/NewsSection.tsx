import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchNews } from '../../../store/newsData/newsThunk'
import {
  selectNews,
  selectNewsLoading,
} from '../../../store/newsData/newsSelector'
import { pathKeys } from '../../../constants'
import NewsCard from '../../../components/NewsCard'

const NewsSection: React.FC = () => {
  const hasInitialized = useRef(false)
  const dispatch = useAppDispatch()

  const news = useAppSelector(selectNews)
  const loading = useAppSelector(selectNewsLoading)

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      dispatch(fetchNews())
    }
  }, [dispatch])

  return (
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
  )
}

export default React.memo(NewsSection)
