import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  fetchShopItems,
  createShopItem,
  updateShopItem,
  deleteShopItem,
} from '../../store/shopData/shopThunk'
import {
  selectShopItems,
  selectShopLoading,
  selectShopError,
} from '../../store/shopData/shopSelector'
import { ShopItem } from '../../store/shopData/shopType'
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'

const ShopItemManagement: React.FC = () => {
  const dispatch = useAppDispatch()
  const shopItems = useAppSelector(selectShopItems)
  const loading = useAppSelector(selectShopLoading)
  const error = useAppSelector(selectShopError)

  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingItem, setEditingItem] = useState<ShopItem | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  useEffect(() => {
    dispatch(fetchShopItems())
  }, [dispatch])

  const filteredItems = shopItems.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleOpenAddModal = () => {
    setIsEditMode(false)
    setEditingItem(null)
    setImageFile(null)
    setImagePreview('')
    setFormData({
      name: '',
      description: '',
      price: '',
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setImageFile(null)
    setImagePreview('')
    setFormData({
      name: '',
      description: '',
      price: '',
    })
    setEditingItem(null)
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

    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên sản phẩm')
      return
    }

    if (!formData.description.trim()) {
      alert('Vui lòng nhập mô tả sản phẩm')
      return
    }

    if (!formData.price) {
      alert('Vui lòng nhập giá sản phẩm')
      return
    }

    if (!isEditMode && !imageFile) {
      alert('Vui lòng chọn ảnh sản phẩm')
      return
    }

    const shopFormData = new FormData()
    shopFormData.append('name', formData.name)
    shopFormData.append('description', formData.description)
    shopFormData.append('price', formData.price)

    if (imageFile) {
      shopFormData.append('image', imageFile)
    }

    if (isEditMode && editingItem) {
      dispatch(updateShopItem({ id: editingItem._id, data: shopFormData }))
    } else {
      dispatch(createShopItem(shopFormData))
    }

    handleCloseModal()
  }

  const handleEdit = (item: ShopItem) => {
    setIsEditMode(true)
    setEditingItem(item)
    setImageFile(null)
    setImagePreview(item.image)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
      setDeletingId(id)
      dispatch(deleteShopItem(id))
    }
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='text-3xl font-bungee text-gray-800'>
            Quản lý Sản Phẩm Bán Hàng
          </h1>
          <p className='text-gray-600 mt-1'>
            Tổng số sản phẩm:{' '}
            <span className='font-bold text-blue-normal'>
              {shopItems.length}
            </span>
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className='flex items-center gap-2 bg-blue-normal text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-normalHover transition-colors duration-200 shadow-md w-full md:w-auto justify-center'
        >
          <FaPlus /> Thêm Sản Phẩm
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
        ) : filteredItems.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>
              {searchTerm
                ? 'Không tìm thấy sản phẩm nào'
                : 'Chưa có sản phẩm nào'}
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
                    Tên Sản Phẩm
                  </th>
                  <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                    Mô Tả
                  </th>
                  <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                    Giá
                  </th>
                  <th className='px-6 py-4 text-center text-gray-700 font-semibold'>
                    Hành Động
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {filteredItems.map(item => (
                  <tr
                    key={item._id}
                    className='hover:bg-gray-50 transition-colors duration-200'
                  >
                    <td className='px-6 py-4'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-16 h-12 object-cover rounded'
                      />
                    </td>
                    <td className='px-6 py-4 font-semibold text-gray-800'>
                      {item.name}
                    </td>
                    <td className='px-6 py-4 text-gray-600 max-w-xs truncate'>
                      {item.description}
                    </td>
                    <td className='px-6 py-4 text-gray-600 font-semibold'>
                      {item.price.toLocaleString('vi-VN')} VNĐ
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex justify-center gap-3'>
                        <button
                          onClick={() => handleEdit(item)}
                          disabled={loading}
                          className='bg-blue-light text-blue-normal px-4 py-2 rounded-lg hover:bg-blue-lightHover transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                          <FaEdit className='text-sm' /> Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={loading || deletingId === item._id}
                          className='bg-red-light text-red-normal px-4 py-2 rounded-lg hover:bg-red-lightHover transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                          <FaTrash className='text-sm' />{' '}
                          {deletingId === item._id ? 'Đang xóa...' : 'Xóa'}
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
        ) : filteredItems.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>
              {searchTerm
                ? 'Không tìm thấy sản phẩm nào'
                : 'Chưa có sản phẩm nào'}
            </p>
          </div>
        ) : (
          filteredItems.map(item => (
            <div
              key={item._id}
              className='bg-white p-4 rounded-lg shadow-md border border-gray-200'
            >
              <img
                src={item.image}
                alt={item.name}
                className='w-full h-40 object-cover rounded-lg mb-3'
              />
              <h3 className='font-semibold text-gray-800 mb-1'>{item.name}</h3>
              <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
                {item.description}
              </p>
              <div className='mb-3'>
                <span className='text-sm font-semibold text-blue-normal'>
                  {item.price.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() => handleEdit(item)}
                  disabled={loading}
                  className='flex-1 bg-blue-light text-blue-normal px-3 py-2 rounded-lg hover:bg-blue-lightHover transition-colors duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <FaEdit /> Sửa
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={loading || deletingId === item._id}
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
              {isEditMode ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
            </h2>

            <form
              onSubmit={handleSubmit}
              className='space-y-5 max-h-[70vh] overflow-y-auto'
            >
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Tên Sản Phẩm <span className='text-red-normal'>*</span>
                </label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder='Nhập tên sản phẩm'
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
                  placeholder='Nhập mô tả sản phẩm'
                  disabled={loading}
                  rows={4}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100 resize-none'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Giá (VNĐ) <span className='text-red-normal'>*</span>
                </label>
                <input
                  type='number'
                  value={formData.price}
                  onChange={e =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder='Nhập giá sản phẩm'
                  disabled={loading}
                  min='0'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Ảnh Sản Phẩm{' '}
                  {!isEditMode && <span className='text-red-normal'>*</span>}
                </label>

                {imagePreview && (
                  <div className='mb-4 relative inline-block'>
                    <img
                      src={imagePreview}
                      alt='Product preview'
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
                      : 'Tạo Sản Phẩm'}
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

export default ShopItemManagement
