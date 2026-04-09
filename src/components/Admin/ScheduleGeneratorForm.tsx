import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  selectMovies,
  // selectMovieLoading,
} from '../../store/movieData/movieSelector'
import { selectRooms } from '../../store/roomData/roomSelector'
import { selectTheaters } from '../../store/theaterData/theaterSelector'
import { fetchMovies } from '../../store/movieData/movieThunk'
import { fetchRooms } from '../../store/roomData/roomThunk'
import { fetchTheaters } from '../../store/theaterData/theaterThunk'
import { setConfig, clearError } from '../../store/scheduleData/scheduleSlice'
import { generatePreview } from '../../store/scheduleData/scheduleThunk'
import {
  selectPreviewLoading,
  selectPreviewError,
} from '../../store/scheduleData/scheduleSelector'
import { ScheduleGeneratorConfig } from '../../store/scheduleData/scheduleType'
import { FaPlus, FaTimes } from 'react-icons/fa'

const ScheduleGeneratorForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(selectMovies)
  const rooms = useAppSelector(selectRooms)
  const theaters = useAppSelector(selectTheaters)
  const previewLoading = useAppSelector(selectPreviewLoading)
  const previewError = useAppSelector(selectPreviewError)

  const [selectedMovies, setSelectedMovies] = useState<
    { id: string; priority: number }[]
  >([])
  const [selectedRooms, setSelectedRooms] = useState<string[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [timeSlots, setTimeSlots] = useState<string[]>([
    '08:00',
    '10:30',
    '13:00',
    '15:30',
    '18:00',
    '20:30',
  ])
  const [newTimeSlot, setNewTimeSlot] = useState('')
  const [bufferTime, setBufferTime] = useState(20)
  const [price, setPrice] = useState(100000)
  const [theaterId, setTheaterId] = useState('')

  useEffect(() => {
    dispatch(fetchMovies())
    dispatch(fetchRooms())
    dispatch(fetchTheaters())
  }, [dispatch])

  const handleAddMovie = (movieId: string) => {
    if (!selectedMovies.find(m => m.id === movieId)) {
      setSelectedMovies([
        ...selectedMovies,
        { id: movieId, priority: selectedMovies.length + 1 },
      ])
    }
  }

  const handleRemoveMovie = (movieId: string) => {
    setSelectedMovies(selectedMovies.filter(m => m.id !== movieId))
  }

  const handleUpdateMoviePriority = (movieId: string, priority: number) => {
    setSelectedMovies(
      selectedMovies.map(m => (m.id === movieId ? { ...m, priority } : m)),
    )
  }

  const handleAddRoom = (roomId: string) => {
    if (!selectedRooms.includes(roomId)) {
      setSelectedRooms([...selectedRooms, roomId])
    }
  }

  // const handleRemoveRoom = (roomId: string) => {
  //   setSelectedRooms(selectedRooms.filter(r => r !== roomId))
  // }

  const handleAddTimeSlot = () => {
    if (
      newTimeSlot &&
      /^\d{2}:\d{2}$/.test(newTimeSlot) &&
      !timeSlots.includes(newTimeSlot)
    ) {
      setTimeSlots([...timeSlots].sort().concat(newTimeSlot).sort())
      setNewTimeSlot('')
    }
  }

  const handleRemoveTimeSlot = (slot: string) => {
    setTimeSlots(timeSlots.filter(s => s !== slot))
  }

  const validateForm = (): boolean => {
    if (selectedMovies.length === 0) {
      alert('Vui lòng chọn ít nhất 1 phim')
      return false
    }
    if (selectedRooms.length === 0) {
      alert('Vui lòng chọn ít nhất 1 phòng')
      return false
    }
    if (!startDate || !endDate) {
      alert('Vui lòng chọn khoảng thời gian')
      return false
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert('Ngày bắt đầu không được lớn hơn ngày kết thúc')
      return false
    }
    if (timeSlots.length === 0) {
      alert('Vui lòng chọn ít nhất 1 khung giờ')
      return false
    }
    if (!theaterId) {
      alert('Vui lòng chọn rạp')
      return false
    }
    return true
  }

  const handlePreview = () => {
    if (!validateForm()) return

    const config: ScheduleGeneratorConfig = {
      filmIds: selectedMovies.map(m => m.id),
      filmPriorities: selectedMovies.map(m => m.priority),
      roomIds: selectedRooms,
      startDate,
      endDate,
      timeSlots,
      bufferTime,
      price,
      theaterId,
    }

    dispatch(setConfig(config))
    dispatch(generatePreview(config))
  }

  const handleReset = () => {
    setSelectedMovies([])
    setSelectedRooms([])
    setStartDate('')
    setEndDate('')
    setTimeSlots(['08:00', '10:30', '13:00', '15:30', '18:00', '20:30'])
    setBufferTime(20)
    setPrice(100000)
    setTheaterId('')
    dispatch(clearError())
  }

  return (
    <div className='space-y-6'>
      {/* Error Message */}
      {previewError && (
        <div className='bg-red-light border border-red-normal text-red-normal px-4 py-3 rounded-lg flex items-start justify-between'>
          <span>{previewError}</span>
          <button
            onClick={() => dispatch(clearError())}
            className='text-red-normal hover:text-red-normalHover'
          >
            <FaTimes className='text-sm' />
          </button>
        </div>
      )}

      <div className='bg-white rounded-lg shadow-md p-4 md:p-8 space-y-6'>
        {/* Chọn Phim */}
        <div>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Chọn Phim
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <select
              className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal'
              onChange={e => {
                if (e.target.value) handleAddMovie(e.target.value)
                e.target.value = ''
              }}
            >
              <option value=''>Thêm phim...</option>
              {movies
                .filter((m: any) => !selectedMovies.find(sm => sm.id === m._id))
                .map((movie: any) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
            </select>
          </div>

          {selectedMovies.length > 0 ? (
            <div className='space-y-2'>
              {selectedMovies.map(sm => {
                const movie = movies.find((m: any) => m._id === sm.id)
                return (
                  <div
                    key={sm.id}
                    className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'
                  >
                    <span className='flex-1 text-sm md:text-base'>
                      {movie?.title}
                    </span>
                    <div className='flex items-center gap-2'>
                      <label className='text-xs md:text-sm text-gray-600 whitespace-nowrap'>
                        Ưu tiên:
                      </label>
                      <input
                        type='number'
                        min='1'
                        value={sm.priority}
                        onChange={e =>
                          handleUpdateMoviePriority(
                            sm.id,
                            parseInt(e.target.value),
                          )
                        }
                        className='w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-normal'
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveMovie(sm.id)}
                      className='text-red-normal hover:text-red-normalHover p-2'
                    >
                      <FaTimes className='text-sm' />
                    </button>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className='text-gray-500 text-sm'>Chưa chọn phim nào</p>
          )}
        </div>

        {/* Chọn Phòng */}
        <div>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Chọn Phòng
          </h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
            {rooms.map((room: any) => (
              <label
                key={room._id}
                className='flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-light transition-colors'
              >
                <input
                  type='checkbox'
                  checked={selectedRooms.includes(room._id)}
                  onChange={e => {
                    if (e.target.checked) {
                      handleAddRoom(room._id)
                    } else {
                      setSelectedRooms(
                        selectedRooms.filter(r => r !== room._id),
                      )
                    }
                  }}
                  className='w-4 h-4 cursor-pointer'
                />
                <span className='text-sm'>{room.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Ngày */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Ngày bắt đầu
            </label>
            <input
              type='date'
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Ngày kết thúc
            </label>
            <input
              type='date'
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal'
            />
          </div>
        </div>

        {/* Khung giờ */}
        <div>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Khung giờ chiếu
          </h3>
          <div className='flex flex-col md:flex-row gap-3 mb-4'>
            <input
              type='time'
              value={newTimeSlot}
              onChange={e => setNewTimeSlot(e.target.value)}
              className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal'
              placeholder='HH:MM'
            />
            <button
              onClick={handleAddTimeSlot}
              className='px-4 py-2 bg-blue-normal text-white rounded-lg hover:bg-blue-normalHover transition-colors flex items-center gap-2 justify-center'
            >
              <FaPlus /> Thêm
            </button>
          </div>

          <div className='flex flex-wrap gap-2'>
            {timeSlots.map(slot => (
              <div
                key={slot}
                className='flex items-center gap-2 px-3 py-2 bg-blue-light rounded-lg'
              >
                <span className='text-sm font-semibold text-blue-normal'>
                  {slot}
                </span>
                <button
                  onClick={() => handleRemoveTimeSlot(slot)}
                  className='text-blue-normal hover:text-blue-normalHover'
                >
                  <FaTimes className='text-xs' />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Thời gian dọn dẹp, Giá vé, Chọn Rạp */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Thời gian dọn dẹp (phút)
            </label>
            <input
              type='number'
              value={bufferTime}
              onChange={e => setBufferTime(parseInt(e.target.value))}
              min='1'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Giá vé (VND)
            </label>
            <input
              type='number'
              value={price}
              onChange={e => setPrice(parseInt(e.target.value))}
              min='1'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Chọn Rạp
            </label>
            <select
              value={theaterId}
              onChange={e => setTheaterId(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-normal'
            >
              <option value=''>Chọn rạp...</option>
              {theaters.map((theater: any) => (
                <option key={theater._id} value={theater._id}>
                  {theater.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex flex-col md:flex-row gap-3 pt-4'>
          <button
            onClick={handlePreview}
            disabled={previewLoading}
            className='flex-1 px-6 py-3 bg-blue-normal text-white rounded-lg font-semibold hover:bg-blue-normalHover transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {previewLoading ? 'Đang tạo preview...' : 'PREVIEW'}
          </button>
          <button
            onClick={handleReset}
            disabled={previewLoading}
            className='flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors disabled:opacity-50'
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScheduleGeneratorForm
