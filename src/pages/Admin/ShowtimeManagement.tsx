import React, { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  selectShowtimes,
  selectShowtimeLoading,
  selectShowtimeError,
} from '../../store/showtimeData/showtimeSelector'
import {
  fetchShowtimes,
  createShowtime,
  updateShowtime,
  deleteShowtime,
} from '../../store/showtimeData/showtimeThunk'
import { Showtime } from '../../store/showtimeData/showtimeType'
import {
  selectMovies,
  selectMovieLoading,
} from '../../store/movieData/movieSelector'
import { fetchMovies } from '../../store/movieData/movieThunk'
import {
  selectRooms,
  selectRoomLoading,
} from '../../store/roomData/roomSelector'
import { fetchRooms } from '../../store/roomData/roomThunk'
import {
  selectTheaters,
  selectTheaterLoading,
} from '../../store/theaterData/theaterSelector'
import { fetchTheaters } from '../../store/theaterData/theaterThunk'

const ShowtimeManagement: React.FC = () => {
  const dispatch = useAppDispatch()
  const showtimes = useAppSelector(selectShowtimes)
  const loading = useAppSelector(selectShowtimeLoading)
  const error = useAppSelector(selectShowtimeError)
  const movies = useAppSelector(selectMovies)
  const moviesLoading = useAppSelector(selectMovieLoading)
  const rooms = useAppSelector(selectRooms)
  const roomsLoading = useAppSelector(selectRoomLoading)
  const theaters = useAppSelector(selectTheaters)
  const theatersLoading = useAppSelector(selectTheaterLoading)

  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingShowtime, setEditingShowtime] = useState<Showtime | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Create/Edit form state
  const [formData, setFormData] = useState({
    movieId: '',
    theaterId: '',
    roomId: '',
    startTime: '',
    endTime: '',
    price: '',
  })

  useEffect(() => {
    dispatch(fetchShowtimes())
    dispatch(fetchMovies())
    dispatch(fetchRooms())
    dispatch(fetchTheaters())
  }, [dispatch])

  // Auto-calculate endTime based on movieId, startTime, and movie duration + 15 min buffer
  useEffect(() => {
    if (formData.movieId && formData.startTime) {
      const selectedMovie = movies.find(m => m._id === formData.movieId)
      if (selectedMovie) {
        const startDate = new Date(formData.startTime)
        // duration in minutes + 15 minutes buffer
        const totalMinutes = selectedMovie.duration + 15
        const endDate = new Date(startDate.getTime() + totalMinutes * 60000)
        // Format to datetime-local format (YYYY-MM-DDTHH:mm)
        const year = endDate.getFullYear()
        const month = String(endDate.getMonth() + 1).padStart(2, '0')
        const day = String(endDate.getDate()).padStart(2, '0')
        const hours = String(endDate.getHours()).padStart(2, '0')
        const minutes = String(endDate.getMinutes()).padStart(2, '0')
        const formattedEndTime = `${year}-${month}-${day}T${hours}:${minutes}`
        setFormData(prev => ({ ...prev, endTime: formattedEndTime }))
      }
    }
  }, [formData.movieId, formData.startTime, movies])

  const filteredShowtimes = showtimes.filter(
    showtime =>
      (showtime.movieId.title || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      showtime.roomId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      showtime.theaterId.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRoomsByTheater = (theaterId: string) => {
    return rooms.filter(r => r.theaterId._id === theaterId)
  }

  const handleOpenAddModal = () => {
    setFormData({
      movieId: '',
      theaterId: '',
      roomId: '',
      startTime: '',
      endTime: '',
      price: '',
    })
    setIsCreateModalOpen(true)
  }

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false)
    setFormData({
      movieId: '',
      theaterId: '',
      roomId: '',
      startTime: '',
      endTime: '',
      price: '',
    })
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingShowtime(null)
    setFormData({
      movieId: '',
      theaterId: '',
      roomId: '',
      startTime: '',
      endTime: '',
      price: '',
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.movieId ||
      !formData.theaterId ||
      !formData.roomId ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.price
    ) {
      alert('Vui lòng điền đầy đủ thông tin')
      return
    }

    if (new Date(formData.startTime) >= new Date(formData.endTime)) {
      alert('Thời gian bắt đầu phải trước thời gian kết thúc')
      return
    }

    const data = {
      movieId: formData.movieId,
      roomId: formData.roomId,
      theaterId: formData.theaterId,
      startTime: formData.startTime,
      endTime: formData.endTime,
      price: parseFloat(formData.price),
    }

    if (isEditModalOpen && editingShowtime) {
      dispatch(updateShowtime({ id: editingShowtime._id, data }))
    } else {
      dispatch(createShowtime(data))
    }

    if (isEditModalOpen) {
      handleCloseEditModal()
    } else {
      handleCloseCreateModal()
    }
  }

  const formatToLocalDatetime = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)

    const timezoneOffset = date.getTimezoneOffset() * 60000

    const localISODate = new Date(date.getTime() - timezoneOffset)
      .toISOString()
      .slice(0, 16)

    return localISODate // Kết quả trả về dạng: "YYYY-MM-DDTHH:mm"
  }

  const handleEdit = (showtime: Showtime) => {
    setEditingShowtime(showtime)
    setFormData({
      movieId:
        typeof showtime.movieId === 'object'
          ? showtime.movieId._id
          : (showtime.movieId as any),
      theaterId:
        typeof showtime.theaterId === 'object'
          ? showtime.theaterId._id
          : (showtime.theaterId as any),
      roomId:
        typeof showtime.roomId === 'object' && showtime.roomId
          ? showtime.roomId._id
          : (showtime.roomId as any),
      startTime: formatToLocalDatetime(showtime.startTime),
      endTime: formatToLocalDatetime(showtime.endTime),
      price: showtime.price.toString(),
    })
    setIsEditModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn chắc chắn muốn xóa suất chiếu này?')) {
      setDeletingId(id)
      dispatch(deleteShowtime(id))
    }
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN')
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bungee text-gray-800'>
            Quản lý Suất Chiếu
          </h1>
          <p className='text-gray-600 mt-1'>
            Tổng số suất chiếu:{' '}
            <span className='font-bold text-blue-normal'>
              {showtimes.length}
            </span>
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className='flex items-center gap-2 bg-blue-normal text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-normalHover transition-colors duration-200 shadow-md'
        >
          <FaPlus /> Thêm Suất Chiếu
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className='bg-red-light border border-red-normal text-red-normal px-4 py-3 rounded-lg'>
          {error}
        </div>
      )}

      {/* Search Bar */}
      <div className='relative'>
        <FaSearch className='absolute left-4 top-3.5 text-gray-400' />
        <input
          type='text'
          placeholder='Tìm kiếm theo phim, phòng hoặc rạp...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal'
        />
      </div>

      {/* Showtimes Table */}
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        {loading ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>Đang tải dữ liệu...</p>
          </div>
        ) : filteredShowtimes.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>
              {searchTerm
                ? 'Không tìm thấy suất chiếu nào'
                : 'Chưa có suất chiếu nào'}
            </p>
          </div>
        ) : (
          <table className='w-full'>
            <thead className='bg-gray-100 border-b-2 border-gray-200'>
              <tr>
                <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                  Phim
                </th>
                <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                  Rạp
                </th>
                <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                  Phòng
                </th>
                <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                  Thời gian bắt đầu
                </th>
                <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                  Giá vé
                </th>
                <th className='px-6 py-4 text-center text-gray-700 font-semibold'>
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredShowtimes.map((showtime, index) => (
                <tr
                  key={showtime._id}
                  className='hover:bg-gray-50 transition-colors duration-200'
                >
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-blue-light rounded-lg flex items-center justify-center text-blue-normal font-semibold'>
                        {index + 1}
                      </div>
                      <p className='font-semibold text-gray-800'>
                        {typeof showtime.movieId === 'object'
                          ? showtime.movieId.title
                          : 'N/A'}
                      </p>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-gray-600'>
                    {typeof showtime.theaterId === 'object' &&
                    showtime.theaterId
                      ? showtime.theaterId.name
                      : 'N/A'}
                  </td>
                  <td className='px-6 py-4 text-gray-600'>
                    {typeof showtime.roomId === 'object' && showtime.roomId
                      ? showtime.roomId.name
                      : 'N/A'}
                  </td>
                  <td className='px-6 py-4 text-gray-600 text-sm'>
                    {formatDateTime(showtime.startTime)}
                  </td>
                  <td className='px-6 py-4 text-gray-600 font-semibold'>
                    {showtime.price.toLocaleString('vi-VN')}₫
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex justify-center gap-3'>
                      <button
                        onClick={() => handleEdit(showtime)}
                        disabled={loading}
                        className='bg-blue-light text-blue-normal px-4 py-2 rounded-lg hover:bg-blue-lightHover transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <FaEdit className='text-sm' /> Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(showtime._id)}
                        disabled={loading || deletingId === showtime._id}
                        className='bg-red-light text-red-normal px-4 py-2 rounded-lg hover:bg-red-lightHover transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <FaTrash className='text-sm' />{' '}
                        {deletingId === showtime._id ? 'Đang xóa...' : 'Xóa'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create/Edit Showtime Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto'>
          <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl my-8'>
            <h2 className='text-2xl font-bungee text-gray-800 mb-6'>
              {isEditModalOpen ? 'Chỉnh Sửa Suất Chiếu' : 'Thêm Suất Chiếu Mới'}
            </h2>

            <form onSubmit={handleSubmit} className='space-y-5'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Phim <span className='text-red-normal'>*</span>
                  </label>
                  <select
                    value={formData.movieId}
                    onChange={e =>
                      setFormData({ ...formData, movieId: e.target.value })
                    }
                    disabled={loading || moviesLoading}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                  >
                    <option value=''>-- Chọn phim --</option>
                    {movies.map(movie => (
                      <option key={movie._id} value={movie._id}>
                        {movie.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Rạp Chiếu <span className='text-red-normal'>*</span>
                  </label>
                  <select
                    value={formData.theaterId}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        theaterId: e.target.value,
                        roomId: '',
                      })
                    }
                    disabled={loading || theatersLoading}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                  >
                    <option value=''>-- Chọn rạp --</option>
                    {theaters.map(theater => (
                      <option key={theater._id} value={theater._id}>
                        {theater.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Phòng Chiếu <span className='text-red-normal'>*</span>
                  </label>
                  <select
                    value={formData.roomId}
                    onChange={e =>
                      setFormData({ ...formData, roomId: e.target.value })
                    }
                    disabled={loading || roomsLoading || !formData.theaterId}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                  >
                    <option value=''>
                      {formData.theaterId
                        ? '-- Chọn phòng --'
                        : '-- Chọn rạp trước --'}
                    </option>
                    {formData.theaterId &&
                      getRoomsByTheater(formData.theaterId).map(room => (
                        <option key={room._id} value={room._id}>
                          {room.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Giá Vé <span className='text-red-normal'>*</span>
                  </label>
                  <input
                    type='number'
                    step='1000'
                    value={formData.price}
                    onChange={e =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder='VD: 50000'
                    disabled={loading}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Thời gian bắt đầu <span className='text-red-normal'>*</span>
                  </label>
                  <input
                    type='datetime-local'
                    value={formData.startTime}
                    onChange={e =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    disabled={loading}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Thời gian kết thúc (Tự động){' '}
                    <span className='text-red-normal'>*</span>
                  </label>
                  <input
                    type='datetime-local'
                    value={formData.endTime}
                    disabled={true}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100 cursor-not-allowed'
                  />
                  <p className='text-xs text-gray-500 mt-1'>
                    Tính từ thời lượng phim + 15 phút buffer
                  </p>
                </div>
              </div>

              <div className='flex gap-3 pt-4'>
                <button
                  type='submit'
                  disabled={loading}
                  className='flex-1 bg-blue-normal text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-normalHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {loading
                    ? 'Đang xử lý...'
                    : isEditModalOpen
                      ? 'Cập Nhật'
                      : 'Thêm Suất Chiếu'}
                </button>
                <button
                  type='button'
                  onClick={
                    isEditModalOpen
                      ? handleCloseEditModal
                      : handleCloseCreateModal
                  }
                  disabled={loading}
                  className='flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowtimeManagement
