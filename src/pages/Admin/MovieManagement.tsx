import React, { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  selectMovies,
  selectMovieLoading,
  selectMovieError,
} from '../../store/movieData/movieSelector'
import {
  fetchMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from '../../store/movieData/movieThunk'
import { Movie } from '../../store/movieData/movieType'
import { formatDate } from '../../utils/formatDate'
import { formatDateForInput } from '../../utils/formatDate'

const MovieManagement: React.FC = () => {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(selectMovies)
  const loading = useAppSelector(selectMovieLoading)
  const error = useAppSelector(selectMovieError)

  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    duration: '',
    releaseDate: '',
    poster: '',
    trailerUrl: '',
    director: '',
    cast: '',
    // rating: '',
    status: 'now_showing' as 'now_showing' | 'coming_soon' | 'offline',
  })
  const [posterFile, setPosterFile] = useState<File | null>(null)
  const [posterPreview, setPosterPreview] = useState<string>('')

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  const filteredMovies = movies.filter(
    movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleOpenAddModal = () => {
    setIsEditMode(false)
    setEditingMovie(null)
    setPosterFile(null)
    setPosterPreview('')
    setFormData({
      title: '',
      description: '',
      genre: '',
      duration: '',
      releaseDate: '',
      poster: '',
      trailerUrl: '',
      director: '',
      cast: '',
      // rating: '',
      status: 'now_showing',
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setPosterFile(null)
    setPosterPreview('')
    setFormData({
      title: '',
      description: '',
      genre: '',
      duration: '',
      releaseDate: '',
      poster: '',
      trailerUrl: '',
      director: '',
      cast: '',
      // rating: '',
      status: 'now_showing',
    })
    setEditingMovie(null)
  }

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        alert('Vui lòng chọn file ảnh (JPG, PNG, WEBP)')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước file không được vượt quá 5MB')
        return
      }

      setPosterFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPosterPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.title.trim() ||
      !formData.genre.trim() ||
      !formData.duration
    ) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc')
      return
    }

    // Check if creating new movie and no poster file is selected
    if (!isEditMode && !posterFile) {
      alert('Vui lòng chọn ảnh poster')
      return
    }

    // Use FormData for file upload
    const movieFormData = new FormData()
    movieFormData.append('title', formData.title)
    movieFormData.append('description', formData.description || '')
    movieFormData.append('genre', formData.genre || '')
    movieFormData.append('duration', formData.duration)
    movieFormData.append('releaseDate', formData.releaseDate || '')
    movieFormData.append('trailerUrl', formData.trailerUrl || '')
    movieFormData.append('director', formData.director || '')
    formData.cast.split(',').forEach(actor => {
      movieFormData.append('cast', actor.trim())
    })
    movieFormData.append('status', formData.status)

    // Add poster file if selected
    if (posterFile) {
      movieFormData.append('poster', posterFile)
    }

    if (isEditMode && editingMovie) {
      // console.log(movieFormData)
      dispatch(updateMovie({ id: editingMovie._id, data: movieFormData }))
    } else {
      for (let pair of movieFormData.entries()) {
        console.log(pair[0], pair[1])
      }
      dispatch(createMovie(movieFormData))
    }

    handleCloseModal()
  }

  const handleEdit = (movie: Movie) => {
    setIsEditMode(true)
    setEditingMovie(movie)
    setPosterFile(null)
    setPosterPreview(movie.poster)
    setFormData({
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      duration: movie.duration.toString(),
      releaseDate: formatDateForInput(movie.releaseDate),
      poster: movie.poster,
      trailerUrl: movie.trailerUrl,
      director: movie.director,
      cast: movie.cast.join(', '),
      // rating: movie.rating.toString(),
      status: movie.status,
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn chắc chắn muốn xóa phim này?')) {
      setDeletingId(id)
      dispatch(deleteMovie(id))
    }
  }

  const statusLabels: Record<string, string> = {
    now_showing: 'Đang chiếu',
    coming_soon: 'Sắp chiếu',
    offline: 'Ngưng chiếu',
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bungee text-gray-800'>Quản lý Phim</h1>
          <p className='text-gray-600 mt-1'>
            Tổng số phim:{' '}
            <span className='font-bold text-blue-normal'>{movies.length}</span>
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className='flex items-center gap-2 bg-blue-normal text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-normalHover transition-colors duration-200 shadow-md'
        >
          <FaPlus /> Thêm Phim Mới
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
          placeholder='Tìm kiếm theo tên hoặc thể loại...'
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
        ) : filteredMovies.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>
              {searchTerm ? 'Không tìm thấy phim nào' : 'Chưa có phim nào'}
            </p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-100 border-b-2 border-gray-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                    Tên Phim
                  </th>
                  <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                    Thể Loại
                  </th>
                  <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                    Thời Lượng
                  </th>
                  <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                    Trạng Thái
                  </th>
                  <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                    Ngày Phát Hành
                  </th>
                  <th className='px-6 py-4 text-center text-gray-700 font-semibold'>
                    Hành Động
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {filteredMovies.map(movie => (
                  <tr
                    key={movie._id}
                    className='hover:bg-gray-50 transition-colors duration-200'
                  >
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className='w-10 h-14 object-cover rounded'
                        />
                        <div>
                          <p className='font-semibold text-gray-800'>
                            {movie.title}
                          </p>
                          <p className='text-xs text-gray-500'>
                            Đạo diễn: {movie.director}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-gray-600'>{movie.genre}</td>
                    <td className='px-6 py-4 text-gray-600'>
                      {movie.duration} phút
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                          movie.status === 'now_showing'
                            ? 'bg-green-400 text-green-normal'
                            : movie.status === 'coming_soon'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {statusLabels[movie.status]}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-gray-600'>
                      {formatDate(movie.releaseDate)}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex justify-center gap-3'>
                        <button
                          onClick={() => handleEdit(movie)}
                          disabled={loading}
                          className='bg-blue-light text-blue-normal px-4 py-2 rounded-lg hover:bg-blue-lightHover transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                          <FaEdit className='text-sm' /> Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(movie._id)}
                          disabled={loading || deletingId === movie._id}
                          className='bg-red-light text-red-normal px-4 py-2 rounded-lg hover:bg-red-lightHover transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                          <FaTrash className='text-sm' />{' '}
                          {deletingId === movie._id ? 'Đang xóa...' : 'Xóa'}
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

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto'>
          <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl my-8'>
            <h2 className='text-2xl font-bungee text-gray-800 mb-6'>
              {isEditMode ? 'Chỉnh Sửa Phim' : 'Thêm Phim Mới'}
            </h2>

            <form
              onSubmit={handleSubmit}
              className='space-y-5 max-h-[70vh] overflow-y-auto'
            >
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Tên Phim <span className='text-red-normal'>*</span>
                  </label>
                  <input
                    type='text'
                    value={formData.title}
                    onChange={e =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder='Nhập tên phim'
                    disabled={loading}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Thể Loại <span className='text-red-normal'>*</span>
                  </label>
                  <input
                    type='text'
                    value={formData.genre}
                    onChange={e =>
                      setFormData({ ...formData, genre: e.target.value })
                    }
                    placeholder='VD: Hành động, Tình cảm...'
                    disabled={loading}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Thời Lượng (phút) <span className='text-red-normal'>*</span>
                  </label>
                  <input
                    type='number'
                    value={formData.duration}
                    onChange={e =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    placeholder='VD: 120'
                    disabled={loading}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Ngày Phát Hành
                  </label>
                  <input
                    type='date'
                    value={formData.releaseDate}
                    onChange={e =>
                      setFormData({ ...formData, releaseDate: e.target.value })
                    }
                    disabled={loading}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Đạo Diễn
                  </label>
                  <input
                    type='text'
                    value={formData.director}
                    onChange={e =>
                      setFormData({ ...formData, director: e.target.value })
                    }
                    placeholder='Nhập tên đạo diễn'
                    disabled={loading}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                  />
                </div>

                {/* <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Đánh Giá
                  </label>
                  <input
                    type='number'
                    step='0.1'
                    min='0'
                    max='10'
                    value={formData.rating}
                    onChange={e =>
                      setFormData({ ...formData, rating: e.target.value })
                    }
                    placeholder='VD: 8.5'
                    disabled={loading}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                  />
                </div> */}
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Trạng Thái
                </label>
                <select
                  value={formData.status}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      status: e.target.value as
                        | 'now_showing'
                        | 'coming_soon'
                        | 'offline',
                    })
                  }
                  disabled={loading}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                >
                  <option value='now_showing'>Đang chiếu</option>
                  <option value='coming_soon'>Sắp chiếu</option>
                  <option value='offline'>Ngưng chiếu</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Poster Ảnh{' '}
                  {!isEditMode && <span className='text-red-normal'>*</span>}
                </label>

                {/* Poster Preview */}
                {(posterPreview || formData.poster) && (
                  <div className='mb-4 relative inline-block'>
                    <img
                      src={posterPreview || formData.poster}
                      alt='Poster preview'
                      className='w-32 h-48 object-cover rounded-lg shadow-md'
                    />
                    <button
                      type='button'
                      onClick={() => {
                        setPosterFile(null)
                        setPosterPreview('')
                      }}
                      className='absolute top-2 right-2 bg-red-normal text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-normalHover transition-colors'
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* File Upload Input */}
                <div className='flex items-center gap-3'>
                  <label className='flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-blue-normal rounded-lg cursor-pointer hover:bg-blue-light transition-colors'>
                    <span className='text-sm font-semibold text-blue-normal'>
                      {posterFile
                        ? 'Đã chọn: ' + posterFile.name
                        : 'Chọn ảnh poster'}
                    </span>
                    <input
                      type='file'
                      accept='image/jpeg,image/png,image/webp'
                      onChange={handlePosterChange}
                      disabled={loading}
                      className='hidden'
                    />
                  </label>
                </div>
                <p className='text-xs text-gray-500 mt-2'>
                  Định dạng: JPG, PNG, WEBP | Tối đa 5MB
                </p>
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Trailer URL
                </label>
                <input
                  type='text'
                  value={formData.trailerUrl}
                  onChange={e =>
                    setFormData({ ...formData, trailerUrl: e.target.value })
                  }
                  placeholder='Nhập URL video trailer'
                  disabled={loading}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Diễn Viên (cách nhau bởi dấu phẩy)
                </label>
                <textarea
                  value={formData.cast}
                  onChange={e =>
                    setFormData({ ...formData, cast: e.target.value })
                  }
                  placeholder='VD: Diễn viên 1, Diễn viên 2, Diễn viên 3'
                  rows={2}
                  disabled={loading}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal resize-none disabled:bg-gray-100'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Mô Tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={e =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder='Nhập mô tả phim'
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

export default MovieManagement
