import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchEvents } from '../../../store/eventData/eventThunk'
import {
  selectEvents,
  selectEventLoading,
} from '../../../store/eventData/eventSelector'
import { pathKeys } from '../../../constants'
import { formatDate } from '../../../utils/formatDate'

const EventSection: React.FC = () => {
  const hasInitialized = useRef(false)
  const dispatch = useAppDispatch()

  const events = useAppSelector(selectEvents)
  const loading = useAppSelector(selectEventLoading)

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      dispatch(fetchEvents())
    }
  }, [dispatch])

  if (loading || events.length === 0) {
    return null
  }

  return (
    <div className='px-[50px] md:px-8 lg:px-16 py-8 md:py-12 lg:py-16 mx-auto max-w-7xl'>
      {/* Header with Title and Button */}
      <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-4 mb-6 md:mb-8'>
        <p className='uppercase font-bungee text-2xl md:text-3xl lg:text-4xl text-blue-normal'>
          Sự kiện
        </p>
        <Link to={pathKeys.EVENTS}>
          <button className='w-fit text-xs md:text-sm lg:text-lg uppercase font-bungee border-2 border-blue-normal rounded-full text-blue-normal py-1.5 px-3 md:px-4 lg:px-6 hover:bg-blue-lightHover active:bg-blue-lightActive transition-all whitespace-nowrap'>
            Xem thêm
          </button>
        </Link>
      </div>

      {/* Content */}
      <div className='flex flex-col lg:flex-row gap-3 md:gap-4 lg:gap-6'>
        <img
          src={events[0].image}
          alt={events[0].title}
          className='h-40 md:h-64 lg:h-80 w-full lg:w-1/2 object-cover rounded-lg md:rounded-2xl'
        />
        <div className='flex flex-col justify-between lg:w-1/2'>
          <div>
            <h1 className='uppercase text-lg md:text-2xl lg:text-2xl text-blue-normal font-bungee mb-2 md:mb-3'>
              {events[0].title}
            </h1>
            <div className='text-xs md:text-sm text-gray-700 space-y-2'>
              <p className='line-clamp-2 md:line-clamp-3'>
                {events[0].description}
              </p>
              <p>
                <span className='text-blue-normal font-bold'>Thời gian:</span>{' '}
                {formatDate(events[0].startDate)}
              </p>
            </div>
          </div>
          <button className='w-fit text-xs md:text-sm lg:text-base uppercase font-bungee border-0 rounded-full text-white bg-blue-normal py-1.5 px-4 md:px-5 hover:bg-blue-lightHover transition-all mt-3 md:mt-4 whitespace-nowrap'>
            Khám phá
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(EventSection)
