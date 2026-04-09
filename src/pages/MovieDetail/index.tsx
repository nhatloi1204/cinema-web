import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchMovies } from '../../store/movieData/movieThunk'
import { selectMovies } from '../../store/movieData/movieSelector'
import { fetchShowtimesByMovie } from '../../store/showtimeData/showtimeThunk'
import { selectShowtimes } from '../../store/showtimeData/showtimeSelector'
import { Movie } from '../../store/movieData/movieType'
import { Showtime } from '../../store/showtimeData/showtimeType'
import { formatDate } from '../../utils/formatDate'
import {
  FaClock,
  FaMapMarkerAlt,
  FaPlayCircle,
  FaTicketAlt,
} from 'react-icons/fa'

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const movies = useAppSelector(selectMovies)
  const showtimes = useAppSelector(selectShowtimes)

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [expandedTheater, setExpandedTheater] = useState<string | null>(null)

  useEffect(() => {
    if (!movies.length) {
      dispatch(fetchMovies())
    }
  }, [dispatch, movies.length])

  useEffect(() => {
    if (id) {
      dispatch(fetchShowtimesByMovie(id))
    }
  }, [id, dispatch])

  const movie = movies.find((m: Movie) => m._id === id)

  if (!movie) {
    return (
      <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-white mb-4'>
            Không tìm thấy phim
          </h1>
          <button
            onClick={() => navigate('/movies')}
            className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-200'
          >
            Quay lại danh sách phim
          </button>
        </div>
      </div>
    )
  }

  // Extract unique dates from showtimes
  const getDateFromString = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toISOString().split('T')[0]
    } catch {
      return null
    }
  }

  const uniqueDates = Array.from(
    new Set(
      showtimes
        .map(st => getDateFromString(st.startTime))
        .filter((date): date is string => date !== null),
    ),
  ).sort()

  // Set default selected date to first available date
  useEffect(() => {
    if (uniqueDates.length > 0 && !selectedDate) {
      setSelectedDate(uniqueDates[0])
    }
  }, [uniqueDates, selectedDate])

  const getCurrentTime = () => new Date()

  // Group showtimes by date and theater
  const showtimesByDateAndTheater = selectedDate
    ? showtimes
        .filter(
          showtime =>
            getDateFromString(showtime.startTime) === selectedDate &&
            new Date(showtime.startTime) > getCurrentTime(),
        )
        .reduce(
          (acc, showtime) => {
            const theaterId = showtime.theaterId._id
            if (!acc[theaterId]) {
              acc[theaterId] = {
                theater: showtime.theaterId,
                showtimes: [],
              }
            }
            acc[theaterId].showtimes.push(showtime)
            return acc
          },
          {} as Record<
            string,
            {
              theater: { _id: string; name: string }
              showtimes: Showtime[]
            }
          >,
        )
    : {}

  const handleShowtimeClick = (showtime: Showtime) => {
    // Navigate to seat selection page with showtime info
    navigate(`/seat-selection/${showtime._id}`, { state: { showtime, movie } })
  }

  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString)
      return date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    } catch {
      return timeString
    }
  }

  const formatDateDisplay = (dateString: string) => {
    try {
      const date = new Date(dateString + 'T00:00:00')
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      if (date.toDateString() === today.toDateString()) {
        return 'Hôm nay'
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Ngày mai'
      }
      return date.toLocaleDateString('vi-VN', {
        weekday: 'short',
        month: 'numeric',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black'>
      {/* Hero Section with Backdrop */}
      <div className='relative w-full h-96 md:h-[500px] overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center blur-sm'
          style={{
            backgroundImage: `url(${movie.poster})`,
            opacity: 0.3,
          }}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900' />

        {/* Content */}
        <div className='relative h-full flex items-end px-4 md:px-8 pb-8'>
          <div className='flex flex-col md:flex-row gap-6 md:gap-12 w-full max-w-6xl mx-auto items-end'>
            {/* Poster */}
            <div className='flex-shrink-0 -mb-20 md:-mb-0'>
              <img
                src={movie.poster}
                alt={movie.title}
                className='w-32 md:w-48 h-auto rounded-2xl shadow-2xl border-4 border-blue-500/50 object-cover'
              />
            </div>

            {/* Title and Meta */}
            <div className='flex-1 mb-6'>
              <h1 className='text-3xl md:text-5xl font-bungee text-white mb-4 uppercase tracking-wider'>
                {movie.title}
              </h1>
              <div className='flex flex-wrap gap-3 mb-4'>
                <span className='inline-block px-4 py-2 bg-blue-600/90 text-white rounded-full text-sm font-bold uppercase tracking-wider'>
                  {movie.genre}
                </span>
                <span className='inline-block px-4 py-2 bg-red-600/90 text-white rounded-full text-sm font-bold uppercase tracking-wider'>
                  {movie.status === 'now_showing'
                    ? 'Đang chiếu'
                    : movie.status === 'coming_soon'
                      ? 'Sắp chiếu'
                      : 'Hết chiếu'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto px-4 md:px-8 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Movie Info */}
          <div className='lg:col-span-2'>
            {/* Movie Details Card */}
            <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 mb-8'>
              <h2 className='text-2xl font-bungee text-blue-400 uppercase mb-6 tracking-wider'>
                Thông tin phim
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-200'>
                <div className='flex items-start gap-4'>
                  <FaClock className='text-blue-500 mt-1 flex-shrink-0 text-xl' />
                  <div>
                    <p className='text-sm text-gray-400 uppercase tracking-wider font-bold mb-1'>
                      Thời lượng
                    </p>
                    <p className='text-lg font-semibold'>
                      {movie.duration} phút
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <FaTicketAlt className='text-blue-500 mt-1 flex-shrink-0 text-xl' />
                  <div>
                    <p className='text-sm text-gray-400 uppercase tracking-wider font-bold mb-1'>
                      Khởi chiếu
                    </p>
                    <p className='text-lg font-semibold'>
                      {formatDate(movie.releaseDate)}
                    </p>
                  </div>
                </div>

                {movie.director && (
                  <div className='flex items-start gap-4'>
                    <FaPlayCircle className='text-blue-500 mt-1 flex-shrink-0 text-xl' />
                    <div>
                      <p className='text-sm text-gray-400 uppercase tracking-wider font-bold mb-1'>
                        Đạo diễn
                      </p>
                      <p className='text-lg font-semibold'>{movie.director}</p>
                    </div>
                  </div>
                )}

                {movie.cast && movie.cast.length > 0 && (
                  <div className='flex items-start gap-4'>
                    <FaPlayCircle className='text-blue-500 mt-1 flex-shrink-0 text-xl' />
                    <div>
                      <p className='text-sm text-gray-400 uppercase tracking-wider font-bold mb-1'>
                        Diễn viên
                      </p>
                      <p className='text-lg font-semibold'>
                        {movie.cast.join(', ')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 mb-8'>
              <h2 className='text-2xl font-bungee text-blue-400 uppercase mb-4 tracking-wider'>
                Nội dung
              </h2>
              <p className='text-gray-300 leading-relaxed text-base md:text-lg'>
                {movie.description}
              </p>
            </div>

            {/* Trailer */}
            {movie.trailerUrl && (
              <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 mb-8'>
                <h2 className='text-2xl font-bungee text-blue-400 uppercase mb-4 tracking-wider'>
                  Trailer
                </h2>
                <div className='relative w-full aspect-video rounded-xl overflow-hidden bg-black'>
                  <iframe
                    width='100%'
                    height='100%'
                    src={movie.trailerUrl.replace('watch?v=', 'embed/')}
                    title='Movie Trailer'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Showtimes */}
          <div className='lg:col-span-1'>
            <div className='sticky top-24 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8'>
              <h2 className='text-2xl font-bungee text-blue-400 uppercase mb-6 tracking-wider'>
                Lịch chiếu
              </h2>

              {uniqueDates.length === 0 ? (
                <div className='text-center py-8 text-gray-400'>
                  <p className='text-sm'>Hiện chưa có lịch chiếu</p>
                </div>
              ) : (
                <>
                  {/* Date Selection */}
                  <div className='mb-6'>
                    <label className='block text-sm text-gray-400 uppercase tracking-wider font-bold mb-3'>
                      Chọn ngày
                    </label>
                    <select
                      value={selectedDate || ''}
                      onChange={e => setSelectedDate(e.target.value)}
                      className='w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-2 font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-700 focus:outline-none focus:border-blue-500 transition-all'
                    >
                      {uniqueDates.map(date => (
                        <option key={date} value={date}>
                          {formatDateDisplay(date)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Theaters List */}
                  <div className='space-y-3 max-h-[600px] overflow-y-auto pr-2'>
                    {Object.values(showtimesByDateAndTheater).length === 0 ? (
                      <div className='text-center py-8 text-gray-400'>
                        <p className='text-sm'>
                          Không có showtimes trong ngày này
                        </p>
                      </div>
                    ) : (
                      Object.entries(showtimesByDateAndTheater).map(
                        ([
                          theaterId,
                          { theater, showtimes: theaterShowtimes },
                        ]) => (
                          <div
                            key={theaterId}
                            className='border border-gray-600 rounded-lg overflow-hidden'
                          >
                            {/* Theater Header */}
                            <button
                              onClick={() =>
                                setExpandedTheater(
                                  expandedTheater === theaterId
                                    ? null
                                    : theaterId,
                                )
                              }
                              className='w-full bg-gradient-to-r from-blue-600/80 to-blue-700/80 hover:from-blue-600 hover:to-blue-700 px-4 py-3 flex items-center justify-between text-white font-bold uppercase text-sm transition-all duration-200'
                            >
                              <span className='flex items-center gap-2'>
                                <FaMapMarkerAlt className='text-yellow-400' />
                                {theater.name}
                              </span>
                              <span className='text-lg'>
                                {expandedTheater === theaterId ? '▼' : '▶'}
                              </span>
                            </button>

                            {/* Showtimes List */}
                            {expandedTheater === theaterId && (
                              <div className='bg-gray-700/50 p-4'>
                                <div className='flex flex-wrap gap-2'>
                                  {theaterShowtimes.map(showtime => (
                                    <button
                                      key={showtime._id}
                                      onClick={() =>
                                        handleShowtimeClick(showtime)
                                      }
                                      className='bg-gradient-to-r from-gray-600 to-gray-700 hover:from-blue-500 hover:to-blue-600 text-white px-3 py-2 rounded-lg transition-all duration-200 text-sm font-bold flex-shrink-0'
                                    >
                                      {formatTime(showtime.startTime)}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ),
                      )
                    )}
                  </div>

                  {/* Info Note */}
                  <div className='mt-6 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg'>
                    <p className='text-xs text-yellow-200 text-center'>
                      ℹ Chọn ngày rồi nhấp vào rạp để xem khung giờ
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
