import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  selectPreview,
  selectSaveLoading,
  selectSaveError,
  selectSuccessMessage,
} from '../../store/scheduleData/scheduleSelector'
import {
  removeShowtimeFromPreview,
  clearPreview,
  clearError,
  clearSuccess,
} from '../../store/scheduleData/scheduleSlice'
import { saveGenerated } from '../../store/scheduleData/scheduleThunk'
// import { GeneratedShowtime } from '../../store/scheduleData/scheduleType'
import { FaTrash, FaTimes } from 'react-icons/fa'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

const PreviewTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const preview = useAppSelector(selectPreview)
  const saveLoading = useAppSelector(selectSaveLoading)
  const saveError = useAppSelector(selectSaveError)
  const successMessage = useAppSelector(selectSuccessMessage)
  const [sortBy, setSortBy] = useState<'room' | 'date'>('date')

  if (preview.length === 0 && !successMessage) {
    return null
  }

  const sortedPreview = [...preview].sort((a, b) => {
    if (sortBy === 'room') {
      return a.roomName.localeCompare(b.roomName)
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  const handleRemove = (index: number) => {
    dispatch(removeShowtimeFromPreview(index))
  }

  const handleSave = async () => {
    if (preview.length === 0) {
      alert('Không có suất chiếu để lưu')
      return
    }
    await dispatch(saveGenerated(preview))
  }

  const handleCancel = () => {
    dispatch(clearPreview())
  }

  // Success Modal
  if (successMessage) {
    const roomStats: { [key: string]: number } = {}
    preview.forEach(st => {
      roomStats[st.roomName] = (roomStats[st.roomName] || 0) + 1
    })

    return (
      <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
        <div className='bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-md text-center'>
          <div className='text-5xl mb-4'>✓</div>
          <h2 className='text-2xl font-bungee text-gray-800 mb-4'>
            {successMessage}
          </h2>
          <div className='space-y-2 mb-8 text-left'>
            {Object.entries(roomStats).map(([room, count]) => (
              <p key={room} className='text-gray-600'>
                • {room}: {count} suất
              </p>
            ))}
          </div>
          <button
            onClick={() => dispatch(clearSuccess())}
            className='w-full px-6 py-3 bg-blue-normal text-white rounded-lg font-semibold hover:bg-blue-normalHover transition-colors'
          >
            ĐÓNG
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6 mt-8'>
      <div className='bg-white rounded-lg shadow-md p-4 md:p-8'>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6'>
          <div>
            <h2 className='text-2xl font-bungee text-gray-800'>
              PREVIEW ({preview.length} suất)
            </h2>
            <p className='text-sm text-gray-600'>
              Có thể xóa từng dòng nếu cần. Click "SAVE ALL" để lưu lên hệ thống
            </p>
          </div>
          <div className='w-full md:w-auto'>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'room' | 'date')}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal'
            >
              <option value='date'>Sắp xếp theo Ngày</option>
              <option value='room'>Sắp xếp theo Phòng</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {saveError && (
          <div className='mb-6 bg-red-light border border-red-normal text-red-normal px-4 py-3 rounded-lg flex items-start justify-between'>
            <span>{saveError}</span>
            <button
              onClick={() => dispatch(clearError())}
              className='text-red-normal hover:text-red-normalHover'
            >
              <FaTimes className='text-sm' />
            </button>
          </div>
        )}

        {/* Desktop Table */}
        <div className='hidden md:block overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-100 border-b-2 border-gray-200'>
              <tr>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                  Phòng
                </th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                  Ngày
                </th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                  Phim
                </th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                  Bắt đầu
                </th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                  Kết thúc
                </th>
                <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                  Thời lượng
                </th>
                <th className='px-4 py-3 text-center text-sm font-semibold text-gray-700'>
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {sortedPreview.map((st, index) => (
                <tr key={index} className='hover:bg-gray-50 transition-colors'>
                  <td className='px-4 py-3 text-sm font-semibold text-gray-800'>
                    {st.roomName}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-600'>
                    {format(new Date(st.date), 'dd/MM/yyyy', {
                      locale: vi,
                    })}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-600'>
                    {st.movieTitle}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-600'>
                    {format(new Date(st.startTime), 'HH:mm')}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-600'>
                    {format(new Date(st.endTime), 'HH:mm')}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-600'>
                    {st.duration}p
                  </td>
                  <td className='px-4 py-3 text-center'>
                    <button
                      onClick={() => handleRemove(index)}
                      className='text-red-normal hover:text-red-normalHover p-2'
                    >
                      <FaTrash className='text-sm' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className='md:hidden space-y-3'>
          {sortedPreview.map((st, index) => (
            <div
              key={index}
              className='p-4 bg-gray-50 rounded-lg border border-gray-200'
            >
              <div className='flex items-start justify-between mb-3'>
                <div>
                  <h4 className='font-semibold text-gray-800 text-sm'>
                    {st.roomName}
                  </h4>
                  <p className='text-xs text-gray-600'>
                    {format(new Date(st.date), 'dd/MM/yyyy', {
                      locale: vi,
                    })}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  className='text-red-normal hover:text-red-normalHover p-2'
                >
                  <FaTrash className='text-sm' />
                </button>
              </div>
              <p className='text-sm font-semibold text-gray-700 mb-2'>
                {st.movieTitle}
              </p>
              <div className='grid grid-cols-3 gap-2 text-xs text-gray-600'>
                <div>
                  <span className='block text-gray-500'>Bắt đầu</span>
                  {format(new Date(st.startTime), 'HH:mm')}
                </div>
                <div>
                  <span className='block text-gray-500'>Kết thúc</span>
                  {format(new Date(st.endTime), 'HH:mm')}
                </div>
                <div>
                  <span className='block text-gray-500'>Thời lượng</span>
                  {st.duration}p
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col md:flex-row gap-3 pt-6 border-t border-gray-200'>
          <button
            onClick={handleSave}
            disabled={saveLoading}
            className='flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {saveLoading ? 'Đang lưu...' : `SAVE ALL (${preview.length} suất)`}
          </button>
          <button
            onClick={handleCancel}
            disabled={saveLoading}
            className='flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors disabled:opacity-50'
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  )
}

export default PreviewTable
