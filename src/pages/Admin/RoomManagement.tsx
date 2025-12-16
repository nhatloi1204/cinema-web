import React, { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  selectRooms,
  selectRoomLoading,
  selectRoomError,
} from '../../store/roomData/roomSelector'
import {
  fetchRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from '../../store/roomData/roomThunk'
import { Room } from '../../store/roomData/roomType'
import {
  selectTheaters,
  selectTheaterLoading,
} from '../../store/theaterData/theaterSelector'
import { fetchTheaters } from '../../store/theaterData/theaterThunk'

const RoomManagement: React.FC = () => {
  const dispatch = useAppDispatch()
  const rooms = useAppSelector(selectRooms)
  const loading = useAppSelector(selectRoomLoading)
  const error = useAppSelector(selectRoomError)
  const theaters = useAppSelector(selectTheaters)
  const theatersLoading = useAppSelector(selectTheaterLoading)

  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Create form state
  const [createForm, setCreateForm] = useState({
    name: '',
    theaterId: '',
    rows: '',
    cols: '',
  })

  // Edit seat layout state
  const [editableLayout, setEditableLayout] = useState<any | null>(null)

  useEffect(() => {
    dispatch(fetchTheaters())
    dispatch(fetchRooms())
  }, [dispatch])

  const filteredRooms = rooms.filter(
    room =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theaters
        .find(t => t._id === String(room.theaterId))
        ?.name.toLowerCase()
        .includes(searchTerm.toLowerCase()),
  )

  const getTheaterName = (theaterId: any) => {
    if (typeof theaterId === 'object' && theaterId?.name) {
      return theaterId.name
    }
    return theaters.find(t => t._id === theaterId)?._id || 'Không xác định'
  }

  const handleOpenAddModal = () => {
    setCreateForm({ name: '', theaterId: '', rows: '', cols: '' })
    setIsCreateModalOpen(true)
  }

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false)
    setCreateForm({ name: '', theaterId: '', rows: '', cols: '' })
  }

  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !createForm.name.trim() ||
      !createForm.theaterId.trim() ||
      !createForm.rows ||
      !createForm.cols
    ) {
      alert('Vui lòng điền đầy đủ thông tin')
      return
    }

    dispatch(
      createRoom({
        name: createForm.name,
        theaterId: createForm.theaterId,
        rows: parseInt(createForm.rows),
        cols: parseInt(createForm.cols),
      }),
    )

    handleCloseCreateModal()
  }

  const handleOpenEditModal = (room: Room) => {
    setEditingRoom(room)
    setEditableLayout(JSON.parse(JSON.stringify(room.seatLayout)))
    setIsEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingRoom(null)
    setEditableLayout(null)
  }

  // Toggle Seat Type
  const handleToggleSeatType = (rowIdx: number, colIdx: number) => {
    if (!editableLayout) return

    const newLayout = editableLayout.map((row: any, rIdx: number) =>
      row.map((seat: any, cIdx: number) => {
        if (rIdx === rowIdx && cIdx === colIdx && seat) {
          return {
            ...seat,
            type: seat.type === 'normal' ? 'vip' : 'normal',
          }
        }
        return seat
      }),
    )
    setEditableLayout(newLayout)
  }

  // Delete/Restore Seat on Right Click
  const handleDeleteSeat = (rowIdx: number, colIdx: number) => {
    if (!editableLayout) return

    const newLayout = editableLayout.map((row: any, rIdx: number) =>
      row.map((seat: any, cIdx: number) => {
        if (rIdx === rowIdx && cIdx === colIdx) {
          if (seat === null) {
            // Restore: create a new normal seat
            return {
              code: `${String.fromCharCode(65 + rowIdx)}${colIdx + 1}`,
              type: 'normal',
            }
          } else {
            // Delete: set to null
            return null
          }
        }
        return seat
      }),
    )
    setEditableLayout(newLayout)
  }

  // Save Updated Room
  const handleSaveRoom = () => {
    if (!editingRoom || !editableLayout) return

    dispatch(
      updateRoom({
        id: editingRoom._id,
        data: {
          name: editingRoom.name,
          rows: editingRoom.rows,
          cols: editingRoom.cols,
          seatLayout: editableLayout,
        },
      }),
    )

    handleCloseEditModal()
  }

  // Delete Room
  const handleDelete = (id: string) => {
    if (window.confirm('Bạn chắc chắn muốn xóa phòng này?')) {
      setDeletingId(id)
      dispatch(deleteRoom(id))
    }
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bungee text-gray-800'>
            Quản lý Phòng Chiếu
          </h1>
          <p className='text-gray-600 mt-1'>
            Tổng số phòng:{' '}
            <span className='font-bold text-blue-normal'>{rooms.length}</span>
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className='flex items-center gap-2 bg-blue-normal text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-normalHover transition-colors duration-200 shadow-md'
        >
          <FaPlus /> Thêm Phòng Mới
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
          placeholder='Tìm kiếm theo tên phòng...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal'
        />
      </div>

      {/* Rooms Table */}
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        {loading ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>Đang tải dữ liệu...</p>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>
              {searchTerm ? 'Không tìm thấy phòng nào' : 'Chưa có phòng nào'}
            </p>
          </div>
        ) : (
          <table className='w-full'>
            <thead className='bg-gray-100 border-b-2 border-gray-200'>
              <tr>
                <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                  Tên Phòng
                </th>
                <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                  Rạp Chiếu
                </th>
                <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                  Kích Thước
                </th>
                <th className='px-6 py-4 text-left text-gray-700 font-semibold'>
                  Tổng Ghế
                </th>
                <th className='px-6 py-4 text-center text-gray-700 font-semibold'>
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredRooms.map((room, index) => (
                <tr
                  key={room._id}
                  className='hover:bg-gray-50 transition-colors duration-200'
                >
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-blue-light rounded-lg flex items-center justify-center text-blue-normal font-semibold'>
                        {index + 1}
                      </div>
                      <p className='font-semibold text-gray-800'>{room.name}</p>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-gray-600'>
                    {getTheaterName(room.theaterId)}
                  </td>
                  <td className='px-6 py-4 text-gray-600'>
                    {room.rows} hàng × {room.cols} cột
                  </td>
                  <td className='px-6 py-4 text-gray-600'>
                    {room.seatLayout.flat().filter(s => s).length} ghế
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex justify-center gap-3'>
                      <button
                        onClick={() => handleOpenEditModal(room)}
                        disabled={loading}
                        className='bg-blue-light text-blue-normal px-4 py-2 rounded-lg hover:bg-blue-lightHover transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <FaEdit className='text-sm' /> Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(room._id)}
                        disabled={loading || deletingId === room._id}
                        className='bg-red-light text-red-normal px-4 py-2 rounded-lg hover:bg-red-lightHover transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <FaTrash className='text-sm' />{' '}
                        {deletingId === room._id ? 'Đang xóa...' : 'Xóa'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create Room Modal */}
      {isCreateModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-md'>
            <h2 className='text-2xl font-bungee text-gray-800 mb-6'>
              Thêm Phòng Mới
            </h2>

            <form onSubmit={handleSubmitCreate} className='space-y-5'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Tên Phòng <span className='text-red-normal'>*</span>
                </label>
                <input
                  type='text'
                  value={createForm.name}
                  onChange={e =>
                    setCreateForm({ ...createForm, name: e.target.value })
                  }
                  placeholder='VD: Phòng 1'
                  disabled={loading}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Rạp Chiếu <span className='text-red-normal'>*</span>
                </label>
                <select
                  value={createForm.theaterId}
                  onChange={e =>
                    setCreateForm({ ...createForm, theaterId: e.target.value })
                  }
                  disabled={loading || theatersLoading}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                >
                  <option value=''>-- Chọn rạp chiếu --</option>
                  {theaters.map(theater => (
                    <option key={theater._id} value={theater._id}>
                      {theater.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Số Hàng <span className='text-red-normal'>*</span>
                  </label>
                  <input
                    type='number'
                    value={createForm.rows}
                    onChange={e =>
                      setCreateForm({ ...createForm, rows: e.target.value })
                    }
                    placeholder='VD: 10'
                    min='1'
                    disabled={loading}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Số Cột <span className='text-red-normal'>*</span>
                  </label>
                  <input
                    type='number'
                    value={createForm.cols}
                    onChange={e =>
                      setCreateForm({ ...createForm, cols: e.target.value })
                    }
                    placeholder='VD: 15'
                    min='1'
                    disabled={loading}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal disabled:bg-gray-100'
                  />
                </div>
              </div>

              <div className='flex gap-3 pt-4'>
                <button
                  type='submit'
                  disabled={loading}
                  className='flex-1 bg-blue-normal text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-normalHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {loading ? 'Đang xử lý...' : 'Tạo Phòng'}
                </button>
                <button
                  type='button'
                  onClick={handleCloseCreateModal}
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

      {/* Edit Room (Seat Layout) Modal */}
      {isEditModalOpen && editingRoom && editableLayout && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto'>
          <div className='bg-white rounded-lg shadow-xl max-w-4xl w-full p-8 my-8'>
            <h2 className='text-2xl font-bungee text-gray-800 mb-2'>
              Chỉnh Sửa Layout - {editingRoom.name}
            </h2>
            <p className='text-gray-600 mb-6'>
              Click vào ghế để thay đổi loại (Normal ↔ VIP) | Chuột phải để
              xóa/khôi phục ghế
            </p>

            {/* Legend */}
            <div className='flex gap-6 mb-6 flex-wrap'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-yellow-normal rounded border-2 border-gray-300'></div>
                <span className='text-gray-700'>Ghế Thường</span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-red-normal rounded border-2 border-gray-300'></div>
                <span className='text-gray-700'>Ghế VIP</span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-gray-200 rounded border-2 border-gray-300'></div>
                <span className='text-gray-700'>Trống</span>
              </div>
            </div>

            {/* Screen Display */}
            <div className='text-center mb-8'>
              <div className='inline-block bg-gray-700 text-white px-12 py-2 rounded font-semibold'>
                SCREEN
              </div>
            </div>

            {/* Seat Layout Grid */}
            <div className='bg-gray-50 p-6 rounded-lg border border-gray-200 overflow-x-auto mb-6'>
              <div className='flex flex-col items-center gap-2'>
                {editableLayout.map((row: any, rowIdx: number) => (
                  <div key={rowIdx} className='flex items-center gap-4'>
                    <span className='w-8 text-gray-700 font-semibold text-center'>
                      {String.fromCharCode(65 + rowIdx)}
                    </span>
                    <div className='flex gap-2'>
                      {row.map((seat: any, colIdx: number) => (
                        <button
                          key={`${rowIdx}-${colIdx}`}
                          onClick={() => {
                            if (seat) {
                              handleToggleSeatType(rowIdx, colIdx)
                            }
                          }}
                          onContextMenu={e => {
                            e.preventDefault()
                            handleDeleteSeat(rowIdx, colIdx)
                          }}
                          className={`w-8 h-8 rounded border-2 font-semibold text-xs flex items-center justify-center cursor-pointer transition-all duration-150 ${
                            seat === null
                              ? 'bg-gray-200 border-gray-300'
                              : seat.type === 'normal'
                                ? 'bg-yellow-normal border-yellow-normalHover hover:bg-yellow-normalHover'
                                : 'bg-red-normal border-red-normalHover hover:bg-red-normalHover text-white'
                          }`}
                          title={
                            seat
                              ? `${seat.code} - ${seat.type}`
                              : 'Trống (Click chuột phải để thêm)'
                          }
                        >
                          {seat && seat.code.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3 border-t border-gray-200 pt-6'>
              <button
                onClick={handleSaveRoom}
                disabled={loading}
                className='flex-1 bg-blue-normal text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-normalHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
              </button>
              <button
                onClick={handleCloseEditModal}
                disabled={loading}
                className='flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoomManagement
