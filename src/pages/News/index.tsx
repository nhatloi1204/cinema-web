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

function News() {
  const dispatch = useAppDispatch()
  const news = useAppSelector(selectNews)
  const loading = useAppSelector(selectNewsLoading)

  // Events
  const events = useAppSelector(selectEvents)
  const slides = events.map(event => event.image)

  useEffect(() => {
    dispatch(fetchNews())
    dispatch(fetchEvents())
  }, [dispatch])

  if (loading) {
    return <div className='text-center text-2xl py-32'>Đang tải tin tức...</div>
  }

  return (
    <>
      <div className='w-full'>
        <Carousel autoSlide={false} autoSlideInterval={3000}>
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

      <div className='bg-white py-24 px-32'>
        <div className='flex flex-col w-full gap-16'>
          {news.map((item, index) => (
            <div
              key={item._id}
              className={`flex w-full gap-7 items-end ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse '}`}
            >
              <img
                src={item.image}
                alt='item'
                className='w-1/2 max-h-96 object-cover rounded-3xl'
              />
              <div
                className={` flex flex-col w-1/2 ${index % 2 == 0 ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`flex flex-col w-3/4 ${index % 2 == 0 ? 'text-left' : 'text-right'}`}
                >
                  <h1 className='uppercase text-4xl text-blue-normal font-bungee'>
                    {item.title}
                  </h1>
                  <p className='py-7'>{item.content}</p>
                  <div>
                    <button className='w-48 h-auto text-2xl uppercase font-bungee border-2 border-blue-normal rounded-full text-blue-normal py-2 hover:bg-blue-lightHover active:bg-blue-lightActive'>
                      Xem thêm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default News
