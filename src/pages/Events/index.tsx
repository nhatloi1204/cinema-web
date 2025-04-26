import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchEvents } from '../../store/eventData/eventThunk'
import {
  selectEvents,
  selectEventLoading,
} from '../../store/eventData/eventSelector'
import { formatDate } from '../../utils/formatDate'
import { Link } from 'react-router-dom'

function EventsPage() {
  const dispatch = useAppDispatch()
  const events = useAppSelector(selectEvents)
  const loading = useAppSelector(selectEventLoading)

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  if (loading) {
    return <div className='text-center text-2xl py-32'>Đang tải sự kiện...</div>
  }

  return (
    <div className='bg-white py-16 px-6 md:px-20 lg:px-32'>
      <h1 className='text-blue-normal font-bungee text-5xl text-center mb-16'>
        Sự kiện nổi bật
      </h1>

      <div className='grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {events.map(event => (
          <div
            key={event._id}
            className='bg-white border rounded-3xl overflow-hidden shadow hover:shadow-xl transition'
          >
            <img
              src={event.image}
              alt={event.title}
              className='w-full h-52 object-cover'
            />
            <div className='p-5 text-blue-normal'>
              <Link
                to={`/events/${event._id}`}
                className='block text-lg font-bold hover:underline mb-2'
              >
                {event.title}
              </Link>
              <p className='text-black text-sm mb-3 line-clamp-3'>
                {event.description}
              </p>
              <div className='text-sm text-gray-600'>
                <strong>Thời gian:</strong> {formatDate(event.startDate)} -{' '}
                {formatDate(event.endDate)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventsPage
