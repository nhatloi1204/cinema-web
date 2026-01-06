import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchShowtimeById } from '../../store/showtimeData/showtimeThunk'
import { fetchMovies } from '../../store/movieData/movieThunk'
import { selectMovies } from '../../store/movieData/movieSelector'
import { Showtime } from '../../store/showtimeData/showtimeType'
import { Movie } from '../../store/movieData/movieType'
import {
  FaArrowLeft,
  FaChair,
  FaCheckCircle,
  FaExclamationTriangle,
} from 'react-icons/fa'
import './seat-selection.css'

interface SeatSelectionState {
  showtime: Showtime
  movie: Movie
}

interface SeatLayoutResponse {
  showtimeId: string
  roomId: string
  roomName: string
  rows: number
  cols: number
  seatsLayout: (SeatInfo | null)[][]
  summary: {
    total: number
    occupied: number
    available: number
  }
}

interface SeatInfo {
  code: string
  type: string
  available: boolean
  occupied: boolean
}

export default function SeatSelection() {
  const { showtimeId } = useParams<{ showtimeId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const moviesFromStore = useAppSelector(selectMovies)

  const state = location.state as SeatSelectionState | null
  const [showtime, setShowtime] = useState<Showtime | null>(
    state?.showtime || null,
  )
  const [movie, setMovie] = useState<Movie | null>(state?.movie || null)
  const [loading, setLoading] = useState(!state)

  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [seatsLayout, setSeatsLayout] = useState<(SeatInfo | null)[][] | null>(
    null,
  )
  const [summary, setSummary] = useState<{
    total: number
    occupied: number
    available: number
  } | null>(null)
  const [layoutLoading, setLayoutLoading] = useState(false)
  const [layoutError, setLayoutError] = useState<string | null>(null)

  // Fetch showtime if not in state
  useEffect(() => {
    if (!showtime && showtimeId) {
      const fetchData = async () => {
        try {
          setLoading(true)
          const result = await dispatch(fetchShowtimeById(showtimeId))
          if (result.payload) {
            setShowtime(result.payload as Showtime)
          }
        } catch (error) {
          console.error('Failed to fetch showtime:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }
  }, [showtimeId, showtime, dispatch])

  // Fetch movies if not in state
  useEffect(() => {
    if (!movie && showtime && moviesFromStore.length > 0) {
      const foundMovie = moviesFromStore.find(
        m => m._id === showtime.movieId._id,
      )
      if (foundMovie) {
        setMovie(foundMovie)
      }
    } else if (!moviesFromStore.length) {
      dispatch(fetchMovies())
    }
  }, [showtime, movie, moviesFromStore, dispatch])

  // Fetch seat layout from API
  useEffect(() => {
    if (showtimeId) {
      const fetchSeatsLayout = async () => {
        try {
          setLayoutLoading(true)
          setLayoutError(null)
          const apiUrl = import.meta.env.VITE_API_URL
          const response = await fetch(
            `${apiUrl}/public/showtimes/${showtimeId}/seats-layout`,
          )

          if (!response.ok) {
            throw new Error('Failed to fetch seats layout')
          }

          const data: SeatLayoutResponse = await response.json()
          setSeatsLayout(data.seatsLayout)
          setSummary(data.summary)
        } catch (error) {
          console.error('Failed to fetch seats layout:', error)
          setLayoutError('Không thể tải dữ liệu ghế. Vui lòng thử lại.')
        } finally {
          setLayoutLoading(false)
        }
      }

      fetchSeatsLayout()
    }
  }, [showtimeId])

  if (!showtime || !movie) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center'>
        <div className='text-center'>
          {loading ? (
            <>
              <h1 className='text-3xl font-bold text-white mb-4'>
                Đang tải...
              </h1>
              <p className='text-gray-400'>Vui lòng chờ</p>
            </>
          ) : (
            <>
              <h1 className='text-3xl font-bold text-white mb-4'>
                Dữ liệu không hợp lệ
              </h1>
              <button
                onClick={() => navigate('/movies')}
                className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all'
              >
                Quay lại danh sách phim
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  const handleSeatClick = (seatCode: string) => {
    setSelectedSeats(prev =>
      prev.includes(seatCode)
        ? prev.filter(id => id !== seatCode)
        : [...prev, seatCode],
    )
  }

  const totalPrice = selectedSeats.length * showtime.price

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

  // Get row letter from seat code (e.g., "A1" -> "A")
  const getRowFromSeatCode = (code: string): string => {
    return code.replace(/\d+/g, '')
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-8 px-4'>
      {/* Header */}
      <div className='max-w-4xl mx-auto mb-8'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold mb-6 transition-colors'
        >
          <FaArrowLeft /> Quay lại
        </button>

        <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6'>
          <h1 className='text-3xl md:text-4xl font-bungee text-white uppercase mb-2 tracking-wider'>
            Chọn ghế của bạn
          </h1>
          <p className='text-gray-300 mb-4'>{movie.title}</p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm md:text-base'>
            <div>
              <span className='text-gray-400'>Rạp:</span>
              <p className='text-blue-400 font-bold'>
                {showtime.theaterId?.name || 'N/A'}
              </p>
            </div>
            <div>
              <span className='text-gray-400'>Phòng:</span>
              <p className='text-blue-400 font-bold'>
                {showtime.roomId?.name || 'N/A'}
              </p>
            </div>
            <div>
              <span className='text-gray-400'>Giờ chiếu:</span>
              <p className='text-blue-400 font-bold'>
                {formatTime(showtime.startTime)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Seats Area */}
        <div className='lg:col-span-2'>
          <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8'>
            {/* Screen */}
            <div className='mb-12 text-center'>
              <div className='inline-block'>
                <div className='w-full max-w-md h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full mb-2' />
                <p className='text-gray-400 text-sm uppercase tracking-widest font-bold'>
                  Màn hình
                </p>
              </div>
            </div>

            {/* Seats Grid */}
            {layoutLoading ? (
              <div className='flex items-center justify-center py-12'>
                <p className='text-gray-400'>Đang tải dữ liệu ghế...</p>
              </div>
            ) : layoutError ? (
              <div className='flex items-center justify-center py-12 text-red-400 gap-2'>
                <FaExclamationTriangle />
                <p>{layoutError}</p>
              </div>
            ) : seatsLayout ? (
              <div className='space-y-4'>
                {seatsLayout.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className='flex items-center justify-center gap-4'
                  >
                    <span className='w-8 text-center text-gray-400 font-bold text-sm'>
                      {getRowFromSeatCode(row.find(s => s)?.code || '')}
                    </span>
                    <div className='flex gap-2'>
                      {row.map((seat, colIndex) => {
                        if (!seat) {
                          return (
                            <div
                              key={`${rowIndex}-${colIndex}`}
                              className='w-10 h-10'
                            />
                          )
                        }

                        const isSelected = selectedSeats.includes(seat.code)
                        const isOccupied = seat.occupied

                        return (
                          <button
                            key={seat.code}
                            onClick={() => handleSeatClick(seat.code)}
                            disabled={isOccupied}
                            className={`
                              w-10 h-10 rounded-lg transition-all duration-200 flex items-center justify-center text-xs font-bold
                              ${
                                isOccupied
                                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                  : isSelected
                                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white scale-110 shadow-lg shadow-blue-500/50'
                                    : 'bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white'
                              }
                            `}
                            title={seat.code}
                          >
                            {isSelected ? (
                              <FaCheckCircle size={16} />
                            ) : (
                              <FaChair size={14} />
                            )}
                          </button>
                        )
                      })}
                    </div>
                    <span className='w-8 text-center text-gray-400 font-bold text-sm'>
                      {getRowFromSeatCode(row.find(s => s)?.code || '')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex items-center justify-center py-12'>
                <p className='text-gray-400'>Không có dữ liệu ghế</p>
              </div>
            )}

            {/* Legend */}
            <div className='mt-12 flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300'>
                  <FaChair size={12} />
                </div>
                <span className='text-gray-300'>
                  Trống ({summary?.available || 0})
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white'>
                  <FaCheckCircle size={12} />
                </div>
                <span className='text-gray-300'>Đã chọn</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center text-gray-400'>
                  <FaChair size={12} />
                </div>
                <span className='text-gray-300'>
                  Đã bán ({summary?.occupied || 0})
                </span>
              </div>
            </div>

            {/* Seat Summary */}
            {summary && (
              <div className='mt-8 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg'>
                <div className='grid grid-cols-3 gap-4 text-center'>
                  <div>
                    <p className='text-xs text-gray-400 uppercase tracking-wider mb-1'>
                      Tổng ghế
                    </p>
                    <p className='text-lg font-bold text-blue-400'>
                      {summary.total}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-400 uppercase tracking-wider mb-1'>
                      Trống
                    </p>
                    <p className='text-lg font-bold text-green-400'>
                      {summary.available}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-400 uppercase tracking-wider mb-1'>
                      Đã bán
                    </p>
                    <p className='text-lg font-bold text-red-400'>
                      {summary.occupied}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Summary */}
        <div className='lg:col-span-1'>
          <div className='sticky top-24 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6'>
            <h2 className='text-xl font-bungee text-blue-400 uppercase mb-6 tracking-wider'>
              Tóm tắt đơn
            </h2>

            {selectedSeats.length === 0 ? (
              <div className='text-center py-8'>
                <p className='text-gray-400 text-sm'>Chưa chọn ghế nào</p>
              </div>
            ) : (
              <>
                <div className='bg-gray-700/50 rounded-lg p-4 mb-6'>
                  <p className='text-sm text-gray-400 mb-2'>
                    Ghế đã chọn ({selectedSeats.length}):
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {selectedSeats.sort().map(seatCode => (
                      <span
                        key={seatCode}
                        className='px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-lg'
                      >
                        {seatCode}
                      </span>
                    ))}
                  </div>
                </div>

                <div className='space-y-3 border-t border-gray-600 pt-4 mb-6'>
                  <div className='flex justify-between text-gray-300'>
                    <span>Số lượng:</span>
                    <span className='font-bold'>
                      {selectedSeats.length} ghế
                    </span>
                  </div>
                  <div className='flex justify-between text-gray-300'>
                    <span>Giá vé:</span>
                    <span className='font-bold'>
                      {showtime.price.toLocaleString('vi-VN')}đ/ghế
                    </span>
                  </div>
                  <div className='flex justify-between text-lg font-bold text-blue-400 border-t border-gray-600 pt-3'>
                    <span>Tổng cộng:</span>
                    <span>{totalPrice.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </>
            )}

            <button
              disabled={selectedSeats.length === 0}
              onClick={() => {
                // Navigate to payment page
                navigate('/payment', {
                  state: {
                    showtime,
                    movie,
                    selectedSeats,
                    totalPrice,
                  },
                })
              }}
              className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all duration-200 uppercase tracking-wider'
            >
              Tiếp tục thanh toán
            </button>

            <button
              onClick={() => setSelectedSeats([])}
              className='w-full mt-3 bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-2 rounded-lg transition-all duration-200 text-sm'
            >
              Bỏ chọn tất cả
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
