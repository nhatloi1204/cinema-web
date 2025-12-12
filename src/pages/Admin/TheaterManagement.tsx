import React, { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  selectTheaters,
  selectTheaterLoading,
  selectTheaterError,
} from '../../store/theaterData/theaterSelector'
import {
  fetchTheaters,
  createTheater,
  updateTheater,
  deleteTheater,
} from '../../store/theaterData/theaterThunk'
import { Theater } from '../../store/theaterData/theaterType'

const TheaterManagement: React.FC = () => {
  const dispatch = useAppDispatch()
  const theaters = useAppSelector(selectTheaters)
  const loading = useAppSelector(selectTheaterLoading)
  const error = useAppSelector(selectTheaterError)

  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingTheater, setEditingTheater] = useState<Theater | null>(null)
  const [formData, setFormData] = useState({ name: '', location: '' })
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchTheaters())
  }, [dispatch])

  const filteredTheaters = theaters.filter(
    theater =>
      theater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theater.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleOpenAddModal = () => {
    setIsEditMode(false)
    setEditingTheater(null)
    setFormData({ name: '', location: '' })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormData({ name: '', location: '' })
    setEditingTheater(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.location.trim()) {
      alert('Vui lòng điền đầy đủ thông tin')
      return
    }

    if (isEditMode && editingTheater) {
      dispatch(updateTheater({ id: editingTheater._id, data: formData }))
    } else {
      dispatch(createTheater(formData))
    }

    handleCloseModal()
  }

  const handleEdit = (theater: Theater) => {
    setIsEditMode(true)
    setEditingTheater(theater)
    setFormData({ name: theater.name, location: theater.location })
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn chắc chắn muốn xóa rạp này?')) {
      setDeletingId(id)
      dispatch(deleteTheater(id))
    }
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bungee text-gray-800'>
            Quản lý Rạp Chiếu Phim
          </h1>
          <p className='text-gray-600 mt-1'>
            Tổng số rạp:{' '}
            <span className='font-bold text-blue-normal'>
              {theaters.length}
            </span>
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className='flex items-center gap-2 bg-blue-normal text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-normalHover transition-colors duration-200 shadow-md'
        >
          <FaPlus /> Thêm Rạp Mới
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
          placeholder='Tìm kiếm theo tên hoặc vị trí...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal'
        />
      </div>

      {/* Table */}
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        {loading ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>Đang tải dữ liệu...</p>
          </div>
        ) : filteredTheaters.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>
              {searchTerm ? 'Không tìm thấy rạp nào' : 'Chưa có rạp nào'}
            </p>
          </div>
        ) : (
          <table className='w-full'>
            <thead className='bg-gray-100 border-b-2 border-gray-200'>
              <tr>
                <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                  Tên Rạp
                </th>
                <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                  Vị Trí
                </th>
                <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                  Ngày Tạo
                </th>
                <th className='px-6 py-4 text-center text-gray-700 font-semibold'>
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredTheaters.map((theater, index) => (
                <tr
                  key={theater._id}
                  className='hover:bg-gray-50 transition-colors duration-200'
                >
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-blue-light rounded-lg flex items-center justify-center text-blue-normal font-semibold'>
                        {index + 1}
                      </div>
                      <p className='font-semibold text-gray-800'>
                        {theater.name}
                      </p>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-gray-600'>
                    {theater.location}
                  </td>
                  <td className='px-6 py-4 text-gray-600'>
                    {new Date(theater.createdAt || '').toLocaleDateString(
                      'vi-VN',
                    )}
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex justify-center gap-3'>
                      <button
                        onClick={() => handleEdit(theater)}
                        disabled={loading}
                        className='bg-blue-light text-blue-normal px-4 py-2 rounded-lg hover:bg-blue-lightHover transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <FaEdit className='text-sm' /> Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(theater._id)}
                        disabled={loading || deletingId === theater._id}
                        className='bg-red-light text-red-normal px-4 py-2 rounded-lg hover:bg-red-lightHover transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <FaTrash className='text-sm' />{' '}
                        {deletingId === theater._id ? 'Đang xóa...' : 'Xóa'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-md'>
            <h2 className='text-2xl font-bungee text-gray-800 mb-6'>
              {isEditMode ? 'Chỉnh Sửa Rạp' : 'Thêm Rạp Mới'}
            </h2>

            <form onSubmit={handleSubmit} className='space-y-5'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Tên Rạp <span className='text-red-normal'>*</span>
                </label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder='Nhập tên rạp'
                  disabled={loading}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Vị Trí <span className='text-red-normal'>*</span>
                </label>
                <textarea
                  value={formData.location}
                  onChange={e =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder='Nhập địa chỉ rạp'
                  rows={3}
                  disabled={loading}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal resize-none disabled:bg-gray-100'
                />
              </div>

              <div className='flex gap-3 pt-4'>
                <button
                  type='submit'
                  disabled={loading}
                  className='flex-1 bg-blue-normal text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-normalHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {loading ? 'Đang xử lý...' : isEditMode ? 'Cập Nhật' : 'Thêm'}
                </button>
                <button
                  type='button'
                  onClick={handleCloseModal}
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

export default TheaterManagement
