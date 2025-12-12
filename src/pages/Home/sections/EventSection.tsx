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
    <div className='px-64 pb-16'>
      <div className='flex justify-between'>
        <p className='uppercase font-bungee text-5xl text-blue-normal'>
          Sự kiện
        </p>
        <Link to={pathKeys.EVENTS}>
          <button className='w-48 h-auto text-2xl uppercase font-bungee border-2 border-blue-normal rounded-full text-blue-normal py-2 hover:bg-blue-lightHover active:bg-blue-lightActive'>
            Xem thêm
          </button>
        </Link>
      </div>

      <div className='flex gap-6 pt-10'>
        <img
          src={events[0].image}
          alt={events[0].title}
          className='h-96 min-w-3/5 object-cover rounded-3xl'
        />
        <div className='self-end'>
          <h1 className='uppercase text-3xl text-blue-normal font-bungee'>
            {events[0].title}
          </h1>
          <div className='py-6'>
            {events[0].description}
            <p>
              <span className='text-blue-normal font-bold'>Thời gian:</span>{' '}
              {formatDate(events[0].startDate)}
            </p>
          </div>
          <button className='w-48 h-auto text-2xl uppercase font-bungee border-0 border-blue-normal rounded-full text-blue-normal bg-blue-light'>
            <p className='py-2'>Khám phá</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(EventSection)
