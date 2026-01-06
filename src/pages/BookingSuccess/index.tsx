import { useLocation, useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaDownload, FaHome } from 'react-icons/fa'
import { Showtime } from '../../store/showtimeData/showtimeType'
import { Movie } from '../../store/movieData/movieType'

interface BookingSuccessState {
  bookingId: string
  movie: Movie
  showtime: Showtime
  selectedSeats: string[]
}

export default function BookingSuccess() {
  const location = useLocation()
  const navigate = useNavigate()

  const state = location.state as BookingSuccessState | null

  if (!state) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-white mb-4'>
            Dữ liệu không hợp lệ
          </h1>
          <button
            onClick={() => navigate('/movies')}
            className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all'
          >
            Quay lại danh sách phim
          </button>
        </div>
      </div>
    )
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

  const formatDate = (timeString: string) => {
    try {
      const date = new Date(timeString)
      return date.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return timeString
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-8 px-4'>
      <div className='max-w-2xl mx-auto'>
        {/* Success Icon */}
        <div className='flex justify-center mb-8'>
          <div className='p-4 bg-green-900/20 border-2 border-green-500/50 rounded-full animate-pulse'>
            <FaCheckCircle className='text-green-400 text-5xl' />
          </div>
        </div>

        {/* Success Message */}
        <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8 text-center'>
          <h1 className='text-4xl font-bungee text-white uppercase mb-2 tracking-wider'>
            Đặt vé thành công!
          </h1>
          <p className='text-gray-300 text-lg'>
            Vé của bạn đã được đặt thành công. Kiểm tra email để nhận vé điện tử.
          </p>
        </div>

        {/* Booking Details */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          {/* Movie Info */}
          <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6'>
            <h2 className='text-xl font-bungee text-blue-400 uppercase mb-4 tracking-wider'>
              Thông tin phim
            </h2>
            <div className='space-y-3'>
              <div>
                <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                  Tên phim
                </p>
                <p className='text-white font-semibold'>{state.movie.title}</p>
              </div>
              <div>
                <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                  Thể loại
                </p>
                <p className='text-white font-semibold'>{state.movie.genre}</p>
              </div>
            </div>
          </div>

          {/* Showtime Info */}
          <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6'>
            <h2 className='text-xl font-bungee text-blue-400 uppercase mb-4 tracking-wider'>
              Chi tiết suất chiếu
            </h2>
            <div className='space-y-3'>
              <div>
                <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                  Ngày chiếu
                </p>
                <p className='text-white font-semibold'>
                  {formatDate(state.showtime.startTime)}
                </p>
              </div>
              <div>
                <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                  Giờ chiếu
                </p>
                <p className='text-white font-semibold'>
                  {formatTime(state.showtime.startTime)}
                </p>
              </div>
            </div>
          </div>

          {/* Theater Info */}
          <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6'>
            <h2 className='text-xl font-bungee text-blue-400 uppercase mb-4 tracking-wider'>
              Địa điểm
            </h2>
            <div className='space-y-3'>
              <div>
                <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                  Rạp
                </p>
                <p className='text-white font-semibold'>
                  {state.showtime.theaterId?.name || 'N/A'}
                </p>
              </div>
              <div>
                <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                  Phòng
                </p>
                <p className='text-white font-semibold'>
                  {state.showtime.roomId?.name || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Seats Info */}
          <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6'>
            <h2 className='text-xl font-bungee text-blue-400 uppercase mb-4 tracking-wider'>
              Ghế đã đặt
            </h2>
            <div className='flex flex-wrap gap-2'>
              {state.selectedSeats.sort().map(seat => (
                <span
                  key={seat}
                  className='px-3 py-2 bg-blue-600/30 text-blue-400 font-bold rounded border border-blue-500/50'
                >
                  {seat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Booking ID */}
        <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-2'>
                Mã đơn đặt vé
              </p>
              <p className='text-xl font-mono text-blue-400 font-bold'>
                {state.bookingId}
              </p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(state.bookingId)
              }}
              className='p-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg transition-all'
              title='Sao chép mã đơn'
            >
              Sao chép
            </button>
          </div>
        </div>

        {/* Info Notes */}
        <div className='space-y-4 mb-8'>
          <div className='flex gap-4 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg'>
            <div className='text-blue-400 text-xl flex-shrink-0'>ℹ</div>
            <div className='text-blue-200 text-sm'>
              <p className='font-bold mb-1'>Vé điện tử của bạn</p>
              <p>Vé sẽ được gửi đến email đăng ký trong vòng 5 phút. Vui lòng kiểm tra hộp thư (bao gồm thư rác).</p>
            </div>
          </div>
          <div className='flex gap-4 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg'>
            <div className='text-yellow-400 text-xl flex-shrink-0'>⚠</div>
            <div className='text-yellow-200 text-sm'>
              <p className='font-bold mb-1'>Lưu ý quan trọng</p>
              <p>Vui lòng đến rạp cách giờ chiếu 15 phút để làm thủ tục và lấy vé. Mang theo số điện thoại hoặc mã đơn đặt vé.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <button
            onClick={() => navigate('/profile')}
            className='flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all duration-200 uppercase tracking-wider'
          >
            <FaDownload /> Xem đơn đặt vé
          </button>
          <button
            onClick={() => navigate('/')}
            className='flex items-center justify-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 rounded-lg transition-all duration-200 uppercase tracking-wider'
          >
            <FaHome /> Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  )
}
