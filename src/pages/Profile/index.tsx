import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userData/userSelector'
import { updateProfile } from '../../store/userData/userThunk'
import {
  selectBookings,
  selectBookingLoading,
} from '../../store/bookingData/bookingSelector'
import { getUserBookings } from '../../store/bookingData/bookingThunk'
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaTicketAlt,
  FaCalendar,
  FaMapMarkerAlt,
  FaChair,
  FaTimes,
  FaExclamationTriangle,
  FaCheckCircle,
} from 'react-icons/fa'

export default function UserProfile() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const bookings = useAppSelector(selectBookings)
  const loadingBookings = useAppSelector(selectBookingLoading)
  const [activeTab, setActiveTab] = useState<'info' | 'bookings'>('info')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateError, setUpdateError] = useState<string | null>(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    dob: user?.dob || '',
    gender: user?.gender || 'Khác',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        dob: user.dob || '',
        gender: user.gender || 'Khác',
      })
    }
  }, [user])

  useEffect(() => {
    if (activeTab === 'bookings' && bookings.length === 0) {
      dispatch(getUserBookings())
    }
  }, [activeTab, dispatch])

  if (!user) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center px-4'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-white mb-4'>
            Vui lòng đăng nhập
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

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('vi-VN', {
        weekday: 'short',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    } catch {
      return dateString
    }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-900/20 border-green-700/50 text-green-400'
      case 'pending':
        return 'bg-yellow-900/20 border-yellow-700/50 text-yellow-400'
      case 'cancelled':
        return 'bg-red-900/20 border-red-700/50 text-red-400'
      default:
        return 'bg-gray-700/20 border-gray-600/50 text-gray-400'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Đã thanh toán'
      case 'pending':
        return 'Chờ thanh toán'
      case 'cancelled':
        return 'Đã hủy'
      default:
        return 'Chưa xác định'
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-8 px-4'>
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold mb-8 transition-colors'
        >
          <FaArrowLeft /> Quay lại
        </button>

        {/* Profile Header */}
        <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 mb-8'>
          <div className='flex flex-col md:flex-row items-center md:items-start gap-6'>
            {/* Avatar */}
            <div className='flex-shrink-0'>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt='Avatar'
                  className='w-32 h-32 rounded-full border-4 border-blue-500/50 object-cover'
                />
              ) : (
                <div className='w-32 h-32 rounded-full border-4 border-blue-500/50 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center'>
                  <FaUser className='text-white text-4xl' />
                </div>
              )}
            </div>

            {/* User Info Summary */}
            <div className='flex-1 text-center md:text-left'>
              <h1 className='text-3xl md:text-4xl font-bungee text-white uppercase mb-2 tracking-wider'>
                {user.name || 'Người dùng'}
              </h1>
              <p className='text-gray-400 mb-4'>{user.email}</p>
              <div className='flex flex-wrap gap-3 justify-center md:justify-start'>
                <div className='px-3 py-1 bg-blue-600/20 border border-blue-500/50 rounded-full text-sm text-blue-400 font-semibold'>
                  {user.role === 'Admin' ? 'Quản trị viên' : 'Người dùng'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className='flex gap-4 mb-8 border-b border-gray-700'>
          <button
            onClick={() => setActiveTab('info')}
            className={`px-6 py-4 font-bold uppercase tracking-wider transition-all ${
              activeTab === 'info'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Thông tin cá nhân
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-4 font-bold uppercase tracking-wider transition-all ${
              activeTab === 'bookings'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Vé của tôi
          </button>
        </div>

        {/* Content */}
        {activeTab === 'info' ? (
          <div className='space-y-6'>
            {/* User Details Grid */}
            <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8'>
              <h2 className='text-2xl font-bungee text-blue-400 uppercase mb-6 tracking-wider'>
                Thông tin cơ bản
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Full Name */}
                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-blue-600/20 border border-blue-500/50 rounded-lg flex-shrink-0'>
                    <FaUser className='text-blue-400 text-lg' />
                  </div>
                  <div>
                    <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                      Họ và tên
                    </p>
                    <p className='text-white font-semibold text-lg'>
                      {user.name || 'Chưa cập nhật'}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-purple-600/20 border border-purple-500/50 rounded-lg flex-shrink-0'>
                    <FaEnvelope className='text-purple-400 text-lg' />
                  </div>
                  <div>
                    <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                      Email
                    </p>
                    <p className='text-white font-semibold text-lg'>
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-cyan-600/20 border border-cyan-500/50 rounded-lg flex-shrink-0'>
                    <FaPhone className='text-cyan-400 text-lg' />
                  </div>
                  <div>
                    <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                      Số điện thoại
                    </p>
                    <p className='text-white font-semibold text-lg'>
                      {user.phoneNumber || 'Chưa cập nhật'}
                    </p>
                  </div>
                </div>

                {/* Birth Date */}
                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-pink-600/20 border border-pink-500/50 rounded-lg flex-shrink-0'>
                    <FaCalendar className='text-pink-400 text-lg' />
                  </div>
                  <div>
                    <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                      Ngày sinh
                    </p>
                    <p className='text-white font-semibold text-lg'>
                      {user.dob ? formatDate(user.dob) : 'Chưa cập nhật'}
                    </p>
                  </div>
                </div>

                {/* Gender */}
                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-indigo-600/20 border border-indigo-500/50 rounded-lg flex-shrink-0'>
                    <FaVenusMars className='text-indigo-400 text-lg' />
                  </div>
                  <div>
                    <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                      Giới tính
                    </p>
                    <p className='text-white font-semibold text-lg'>
                      {user.gender || 'Không xác định'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className='flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold uppercase tracking-wider transition-all'
              >
                Cập nhật hồ sơ
              </button>
              <button className='flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold uppercase tracking-wider transition-all'>
                Đổi mật khẩu
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Bookings List */}
            {loadingBookings ? (
              <div className='flex flex-col items-center justify-center py-12'>
                <div className='w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4' />
                <p className='text-gray-400'>Đang tải vé của bạn...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-12 text-center'>
                <FaTicketAlt className='text-gray-600 text-5xl mx-auto mb-4 opacity-50' />
                <p className='text-gray-400 text-lg'>
                  Bạn chưa có vé nào. Đi mua vé ngay!
                </p>
                <button
                  onClick={() => navigate('/movies')}
                  className='mt-6 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase transition-all'
                >
                  Xem phim
                </button>
              </div>
            ) : (
              <div className='space-y-4'>
                {bookings.map((booking: any) => {
                  const showtime = booking.showtimeId as any
                  console.log('Booking:', booking)
                  console.log('Showtime:', showtime)

                  // Extract from populated showtime data
                  const movie =
                    typeof showtime?.movieId === 'object'
                      ? showtime.movieId
                      : null
                  const room =
                    typeof showtime?.roomId === 'object'
                      ? showtime.roomId
                      : null
                  const theater =
                    typeof showtime?.theaterId === 'object'
                      ? showtime.theaterId
                      : null

                  const movieTitle = movie?.title || 'Không xác định'
                  console.log('Movie:', movie)
                  const roomName = room?.name || 'Không xác định'
                  const theaterName = theater?.name || 'Không xác định'

                  return (
                    <div
                      key={booking._id}
                      className='bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-blue-600/50 transition-all'
                    >
                      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {/* Movie Title */}
                        <div className='flex items-start gap-3'>
                          <div className='p-2 bg-blue-600/20 border border-blue-500/50 rounded-lg flex-shrink-0'>
                            <FaTicketAlt className='text-blue-400 text-lg' />
                          </div>
                          <div className='min-w-0'>
                            <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                              Phim
                            </p>
                            <p className='text-white font-semibold truncate'>
                              {movieTitle}
                            </p>
                          </div>
                        </div>

                        {/* Theater & Room */}
                        <div className='flex items-start gap-3'>
                          <div className='p-2 bg-purple-600/20 border border-purple-500/50 rounded-lg flex-shrink-0'>
                            <FaMapMarkerAlt className='text-purple-400 text-lg' />
                          </div>
                          <div className='min-w-0'>
                            <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                              Rạp / Phòng
                            </p>
                            <p className='text-white font-semibold'>
                              {theaterName}
                            </p>
                            {roomName && roomName !== 'Không xác định' && (
                              <p className='text-gray-400 text-sm'>
                                {roomName}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Date & Time */}
                        <div className='flex items-start gap-3'>
                          <div className='p-2 bg-cyan-600/20 border border-cyan-500/50 rounded-lg flex-shrink-0'>
                            <FaCalendar className='text-cyan-400 text-lg' />
                          </div>
                          <div>
                            <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                              Ngày / Giờ
                            </p>
                            <p className='text-white font-semibold'>
                              {formatDate(
                                booking.date || booking.showtimeId?.startTime,
                              )}
                            </p>
                            <p className='text-gray-400 text-sm'>
                              {formatTime(booking.showtimeId?.startTime)} -{' '}
                              {formatTime(booking.showtimeId?.endTime)}
                            </p>
                          </div>
                        </div>

                        {/* Seats & Status */}
                        <div className='flex items-start gap-3'>
                          <div className='p-2 bg-pink-600/20 border border-pink-500/50 rounded-lg flex-shrink-0'>
                            <FaChair className='text-pink-400 text-lg' />
                          </div>
                          <div className='flex-1'>
                            <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-1'>
                              Ghế / Thanh toán
                            </p>
                            <p className='text-white font-semibold text-sm mb-2'>
                              {booking.seats.join(', ')}
                            </p>
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                                booking.paymentStatus,
                              )}`}
                            >
                              {getStatusLabel(booking.paymentStatus)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price Info */}
                      <div className='mt-4 pt-4 border-t border-gray-700 flex items-center justify-between'>
                        <p className='text-gray-400 text-sm'>
                          Mã đơn:{' '}
                          <span className='text-blue-400 font-mono font-bold'>
                            {booking.bookingId || booking._id.slice(-8)}
                          </span>
                        </p>
                        <p className='text-lg font-bold text-yellow-400'>
                          {booking.totalPrice.toLocaleString('vi-VN')}đ
                        </p>
                      </div>

                      {/* Shop Items (if any) */}
                      {booking.shopItems && booking.shopItems.length > 0 && (
                        <div className='mt-4 pt-4 border-t border-gray-700'>
                          <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-3'>
                            Hàng bổ sung
                          </p>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            {booking.shopItems.map((item: any, idx: number) => (
                              <div
                                key={idx}
                                className='text-sm text-gray-300 flex justify-between'
                              >
                                <span>
                                  {item.itemId?.name || 'Sản phẩm'} x
                                  {item.quantity}
                                </span>
                                <span className='text-yellow-400 font-semibold'>
                                  {(item.price || 0).toLocaleString('vi-VN')}đ
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
            <div className='bg-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 max-w-md w-full'>
              {/* Header */}
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bungee text-white uppercase tracking-wider'>
                  Cập nhật hồ sơ
                </h2>
                <button
                  onClick={() => {
                    setIsEditModalOpen(false)
                    setUpdateError(null)
                  }}
                  className='p-2 hover:bg-gray-700 rounded-lg transition-colors'
                >
                  <FaTimes className='text-gray-400 text-lg' />
                </button>
              </div>

              {/* Error Message */}
              {updateError && (
                <div className='mb-4 p-4 bg-red-900/20 border border-red-700/50 rounded-lg flex items-start gap-3'>
                  <FaExclamationTriangle className='text-red-400 mt-1 flex-shrink-0' />
                  <p className='text-red-300 text-sm'>{updateError}</p>
                </div>
              )}

              {/* Success Message */}
              {updateSuccess && (
                <div className='mb-4 p-4 bg-green-900/20 border border-green-700/50 rounded-lg flex items-start gap-3'>
                  <FaCheckCircle className='text-green-400 mt-1 flex-shrink-0' />
                  <p className='text-green-300 text-sm'>Cập nhật thành công!</p>
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={async e => {
                  e.preventDefault()
                  setIsUpdating(true)
                  setUpdateError(null)
                  try {
                    const result = await dispatch(
                      updateProfile({
                        name: formData.name,
                        phoneNumber: formData.phoneNumber,
                        dob: formData.dob,
                        gender: formData.gender as 'Nam' | 'Nữ' | 'Khác',
                      }),
                    )
                    if (result.type === updateProfile.fulfilled.type) {
                      setUpdateSuccess(true)
                      setTimeout(() => {
                        setIsEditModalOpen(false)
                        setUpdateSuccess(false)
                      }, 2000)
                    } else {
                      setUpdateError(
                        (result.payload as string) || 'Cập nhật thất bại',
                      )
                    }
                  } catch (error) {
                    setUpdateError('Có lỗi xảy ra. Vui lòng thử lại.')
                  } finally {
                    setIsUpdating(false)
                  }
                }}
                className='space-y-4'
              >
                {/* Name */}
                <div>
                  <label className='block text-sm font-bold text-gray-300 mb-2'>
                    Họ tên
                  </label>
                  <input
                    type='text'
                    value={formData.name}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={isUpdating}
                    className='w-full px-4 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-blue-500 disabled:opacity-50'
                    placeholder='Nhập họ tên'
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className='block text-sm font-bold text-gray-300 mb-2'>
                    Số điện thoại
                  </label>
                  <input
                    type='tel'
                    value={formData.phoneNumber}
                    onChange={e =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    disabled={isUpdating}
                    className='w-full px-4 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-blue-500 disabled:opacity-50'
                    placeholder='Nhập số điện thoại'
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className='block text-sm font-bold text-gray-300 mb-2'>
                    Ngày sinh
                  </label>
                  <input
                    type='date'
                    value={formData.dob}
                    onChange={e =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    disabled={isUpdating}
                    className='w-full px-4 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-blue-500 disabled:opacity-50'
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className='block text-sm font-bold text-gray-300 mb-2'>
                    Giới tính
                  </label>
                  <select
                    value={formData.gender}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        gender: e.target.value as 'Nam' | 'Nữ' | 'Khác',
                      })
                    }
                    disabled={isUpdating}
                    className='w-full px-4 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-blue-500 disabled:opacity-50'
                  >
                    <option value='Nam'>Nam</option>
                    <option value='Nữ'>Nữ</option>
                    <option value='Khác'>Khác</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-3 pt-4'>
                  <button
                    type='button'
                    onClick={() => {
                      setIsEditModalOpen(false)
                      setUpdateError(null)
                    }}
                    disabled={isUpdating}
                    className='flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold transition-all disabled:opacity-50'
                  >
                    Hủy
                  </button>
                  <button
                    type='submit'
                    disabled={isUpdating}
                    className='flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all disabled:opacity-50'
                  >
                    {isUpdating ? 'Đang cập nhật...' : 'Lưu'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
