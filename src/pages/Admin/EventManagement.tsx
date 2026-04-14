import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../../store/eventData/eventThunk'
import {
  selectEvents,
  selectEventLoading,
  selectEventError,
} from '../../store/eventData/eventSelector'
import { Event } from '../../store/eventData/eventType'
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'

const EventManagement: React.FC = () => {
  const dispatch = useAppDispatch()
  const events = useAppSelector(selectEvents)
  const loading = useAppSelector(selectEventLoading)
  const error = useAppSelector(selectEventError)

  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  const filteredEvents = events.filter(
    event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleOpenAddModal = () => {
    setIsEditMode(false)
    setEditingEvent(null)
    setImageFile(null)
    setImagePreview('')
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setImageFile(null)
    setImagePreview('')
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    })
    setEditingEvent(null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        alert('Vui lòng chọn file ảnh (JPG, PNG, WEBP)')
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước file không được vượt quá 5MB')
        return
      }

      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      alert('Vui lòng nhập tên sự kiện')
      return
    }

    if (!formData.description.trim()) {
      alert('Vui lòng nhập mô tả sự kiện')
      return
    }

    if (!formData.startDate) {
      alert('Vui lòng chọn ngày bắt đầu')
      return
    }

    if (!formData.endDate) {
      alert('Vui lòng chọn ngày kết thúc')
      return
    }

    if (!isEditMode && !imageFile) {
      alert('Vui lòng chọn ảnh sự kiện')
      return
    }

    const eventFormData = new FormData()
    eventFormData.append('title', formData.title)
    eventFormData.append('description', formData.description)
    eventFormData.append('startDate', formData.startDate)
    eventFormData.append('endDate', formData.endDate)

    if (imageFile) {
      eventFormData.append('image', imageFile)
    }

    if (isEditMode && editingEvent) {
      dispatch(updateEvent({ id: editingEvent._id, data: eventFormData }))
    } else {
      dispatch(createEvent(eventFormData))
    }

    handleCloseModal()
  }

  const handleEdit = (event: Event) => {
    setIsEditMode(true)
    setEditingEvent(event)
    setImageFile(null)
    setImagePreview(event.image)
    setFormData({
      title: event.title,
      description: event.description,
      startDate: event.startDate.split('T')[0],
      endDate: event.endDate.split('T')[0],
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn chắc chắn muốn xóa sự kiện này?')) {
      setDeletingId(id)
      dispatch(deleteEvent(id))
    }
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='text-3xl font-bungee text-gray-800'>
            Quản lý Sự Kiện
          </h1>
          <p className='text-gray-600 mt-1'>
            Tổng số sự kiện:{' '}
            <span className='font-bold text-blue-normal'>{events.length}</span>
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className='flex items-center gap-2 bg-blue-normal text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-normalHover transition-colors duration-200 shadow-md w-full md:w-auto justify-center'
        >
          <FaPlus /> Thêm Sự Kiện
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
          placeholder='Tìm kiếm theo tên hoặc mô tả...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal'
        />
      </div>

      {/* Table - Desktop */}
      <div className='bg-white rounded-lg shadow-md overflow-hidden hidden md:block'>
        {loading ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>Đang tải dữ liệu...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>
              {searchTerm
                ? 'Không tìm thấy sự kiện nào'
                : 'Chưa có sự kiện nào'}
            </p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-100 border-b-2 border-gray-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                    Ảnh
                  </th>
                  <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                    Tên Sự Kiện
                  </th>
                  <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                    Mô Tả
                  </th>
                  <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                    Ngày Bắt Đầu
                  </th>
                  <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                    Ngày Kết Thúc
                  </th>
                  <th className='px-6 py-4 text-center text-gray-700 font-semibold'>
                    Hành Động
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {filteredEvents.map(event => (
                  <tr
                    key={event._id}
                    className='hover:bg-gray-50 transition-colors duration-200'
                  >
                    <td className='px-6 py-4'>
                      <img
                        src={event.image}
                        alt={event.title}
                        className='w-16 h-12 object-cover rounded'
                      />
                    </td>
                    <td className='px-6 py-4 font-semibold text-gray-800'>
                      {event.title}
                    </td>
                    <td className='px-6 py-4 text-gray-600 max-w-xs truncate'>
                      {event.description}
                    </td>
                    <td className='px-6 py-4 text-gray-600 text-sm'>
                      {new Date(event.startDate).toLocaleDateString('vi-VN')}
                    </td>
                    <td className='px-6 py-4 text-gray-600 text-sm'>
                      {new Date(event.endDate).toLocaleDateString('vi-VN')}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex justify-center gap-3'>
                        <button
                          onClick={() => handleEdit(event)}
                          disabled={loading}
                          className='bg-blue-light text-blue-normal px-4 py-2 rounded-lg hover:bg-blue-lightHover transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                          <FaEdit className='text-sm' /> Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          disabled={loading || deletingId === event._id}
                          className='bg-red-light text-red-normal px-4 py-2 rounded-lg hover:bg-red-lightHover transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                          <FaTrash className='text-sm' />{' '}
                          {deletingId === event._id ? 'Đang xóa...' : 'Xóa'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cards - Mobile */}
      <div className='md:hidden space-y-4'>
        {loading ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>Đang tải dữ liệu...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>
              {searchTerm
                ? 'Không tìm thấy sự kiện nào'
                : 'Chưa có sự kiện nào'}
            </p>
          </div>
        ) : (
          filteredEvents.map(event => (
            <div
              key={event._id}
              className='bg-white p-4 rounded-lg shadow-md border border-gray-200'
            >
              <img
                src={event.image}
                alt={event.title}
                className='w-full h-40 object-cover rounded-lg mb-3'
              />
              <h3 className='font-semibold text-gray-800 mb-1'>
                {event.title}
              </h3>
              <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
                {event.description}
              </p>
              <div className='mb-3 space-y-1 text-xs text-gray-500'>
                <p>
                  Từ: {new Date(event.startDate).toLocaleDateString('vi-VN')}
                </p>
                <p>
                  Đến: {new Date(event.endDate).toLocaleDateString('vi-VN')}
                </p>
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() => handleEdit(event)}
                  disabled={loading}
                  className='flex-1 bg-blue-light text-blue-normal px-3 py-2 rounded-lg hover:bg-blue-lightHover transition-colors duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <FaEdit /> Sửa
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  disabled={loading || deletingId === event._id}
                  className='flex-1 bg-red-light text-red-normal px-3 py-2 rounded-lg hover:bg-red-lightHover transition-colors duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <FaTrash /> Xóa
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4'>
          <div className='bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-2xl my-8'>
            <h2 className='text-2xl font-bungee text-gray-800 mb-6'>
              {isEditMode ? 'Chỉnh Sửa Sự Kiện' : 'Thêm Sự Kiện Mới'}
            </h2>

            <form
              onSubmit={handleSubmit}
              className='space-y-5 max-h-[70vh] overflow-y-auto'
            >
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Tên Sự Kiện <span className='text-red-normal'>*</span>
                </label>
                <input
                  type='text'
                  value={formData.title}
                  onChange={e =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder='Nhập tên sự kiện'
                  disabled={loading}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Mô Tả <span className='text-red-normal'>*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={e =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder='Nhập mô tả sự kiện'
                  disabled={loading}
                  rows={4}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100 resize-none'
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Ngày Bắt Đầu <span className='text-red-normal'>*</span>
                  </label>
                  <input
                    type='date'
                    value={formData.startDate}
                    onChange={e =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    disabled={loading}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Ngày Kết Thúc <span className='text-red-normal'>*</span>
                  </label>
                  <input
                    type='date'
                    value={formData.endDate}
                    onChange={e =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    disabled={loading}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Ảnh Sự Kiện{' '}
                  {!isEditMode && <span className='text-red-normal'>*</span>}
                </label>

                {imagePreview && (
                  <div className='mb-4 relative inline-block'>
                    <img
                      src={imagePreview}
                      alt='Event preview'
                      className='w-full max-w-xs h-40 object-cover rounded-lg shadow-md'
                    />
                    <button
                      type='button'
                      onClick={() => {
                        setImageFile(null)
                        setImagePreview('')
                      }}
                      className='absolute top-2 right-2 bg-red-normal text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-normalHover transition-colors'
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className='flex items-center gap-3'>
                  <label className='flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-blue-normal rounded-lg cursor-pointer hover:bg-blue-light transition-colors'>
                    <span className='text-sm font-semibold text-blue-normal'>
                      Chọn ảnh
                    </span>
                    <input
                      type='file'
                      accept='image/jpeg,image/png,image/webp'
                      onChange={handleImageChange}
                      disabled={loading}
                      className='hidden'
                    />
                  </label>
                </div>
                <p className='text-xs text-gray-500 mt-2'>
                  Định dạng: JPG, PNG, WEBP | Tối đa 5MB
                </p>
              </div>

              {/* Form Actions */}
              <div className='flex gap-3 pt-4'>
                <button
                  type='submit'
                  disabled={loading}
                  className='flex-1 bg-blue-normal text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-normalHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {loading
                    ? 'Đang xử lý...'
                    : isEditMode
                      ? 'Cập Nhật'
                      : 'Tạo Sự Kiện'}
                </button>
                <button
                  type='button'
                  onClick={handleCloseModal}
                  disabled={loading}
                  className='flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
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

export default EventManagement
