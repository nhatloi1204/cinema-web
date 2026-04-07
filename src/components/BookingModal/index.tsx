import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchShowtimesByMovie } from '../../store/showtimeData/showtimeThunk'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale/vi'
import { Movie } from '../../store/movieData/movieType'
import { Showtime } from '../../store/showtimeData/showtimeType'
import { motion } from 'framer-motion'

const getNextFiveDates = () =>
  Array.from({ length: 5 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

const modalVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export default function BookingModal({
  movie,
  onClose,
}: {
  movie: Movie
  onClose: () => void
}) {
  const dispatch = useAppDispatch()
  const showtimes: Showtime[] = useAppSelector(
    state => state.showtime.showtimes,
  )

  const [selectedDate, setSelectedDate] = useState(() =>
    format(new Date(), 'yyyy-MM-dd'),
  )

  useEffect(() => {
    dispatch(fetchShowtimesByMovie(movie._id))
  }, [dispatch, movie._id])

  const filteredShowtimes = showtimes.filter(
    st => format(new Date(st.startTime), 'yyyy-MM-dd') === selectedDate,
  )

  const theaters = Array.from(
    new Map(
      filteredShowtimes.map(st => [st.theaterId._id, st.theaterId]),
    ).values(),
  )

  return (
    <motion.div
      className='fixed inset-0 z-50 backdrop-blur-sm bg-white/30 flex items-center justify-center'
      initial='initial'
      animate='animate'
      exit='exit'
      variants={modalVariants}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className='bg-white p-8 rounded-2xl max-w-3xl w-full relative max-h-[90vh] overflow-y-auto'
        variants={{
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
        }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-600 hover:text-black text-2xl cursor-pointer'
        >
          ✖
        </button>

        <h2 className='text-2xl font-bold mb-6 text-blue-600'>
          Chọn suất chiếu: {movie.title}
        </h2>

        <div className='flex gap-3 mb-6'>
          {getNextFiveDates().map(date => {
            const dateStr = format(date, 'yyyy-MM-dd')
            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`px-4 py-2 rounded-full border cursor-pointer transition ${
                  selectedDate === dateStr
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-blue-600 border-blue-300 hover:border-blue-600'
                } hover:bg-blue-100`}
              >
                {format(date, 'EEE, dd/MM', { locale: vi })}
              </button>
            )
          })}
        </div>

        {theaters.map(theater => (
          <div key={theater._id} className='mb-6'>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>
              🎬 {theater.name}
            </h3>
            <div className='flex flex-wrap gap-3'>
              {filteredShowtimes
                .filter(st => st.theaterId._id === theater._id)
                .map(st => (
                  <button
                    key={st._id}
                    className='px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition cursor-pointer'
                  >
                    {format(new Date(st.startTime), 'HH:mm')}
                  </button>
                ))}
            </div>
          </div>
        ))}

        {filteredShowtimes.length === 0 && (
          <div className='text-gray-500 text-center py-10'>
            Không có suất chiếu cho ngày này.
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
