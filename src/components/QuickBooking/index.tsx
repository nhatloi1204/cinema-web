import { useState } from 'react'

interface QuickBookingProps {
  theaters: string[]
  movies: string[]
  dates: string[]
  times: string[]
}

export default function QuickBooking({
  theaters,
  movies,
  dates,
  times,
}: QuickBookingProps) {
  const [selectedTheater, setSelectedTheater] = useState<string>('')
  const [selectedMovie, setSelectedMovie] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')

  return (
    <section className='w-full h-24 bg-blue-normal '>
      <div className='flex items-center justify-around  h-full px-10'>
        <div className='flex gap-10'>
          <img
            src='src/assets/images/miniLogo.png'
            alt='miniLogo'
            className='w-12 h-auto shrink-0'
          />

          <p className='font-bungee uppercase text-white text-xl leading-5'>
            Đặt Vé <br /> Nhanh
          </p>
        </div>

        {/* Dropdowns */}
        <div className='flex items-center gap-4'>
          {/* Generic Dropdown Component */}
          <Dropdown
            label='Chọn rạp'
            options={theaters}
            value={selectedTheater}
            onChange={setSelectedTheater}
          />
          <Dropdown
            label='Chọn phim'
            options={movies}
            value={selectedMovie}
            onChange={setSelectedMovie}
          />
          <Dropdown
            label='Chọn ngày'
            options={dates}
            value={selectedDate}
            onChange={setSelectedDate}
          />
          <Dropdown
            label='Chọn giờ'
            options={times}
            value={selectedTime}
            onChange={setSelectedTime}
          />
        </div>

        {/* Book Now Button */}
        <button
          className='bg-white text-blue-500 font-bold px-6 py-2 rounded-full shadow-md hover:bg-gray-200 transition'
          disabled={
            !selectedTheater || !selectedMovie || !selectedDate || !selectedTime
          }
        >
          Đặt Ngay
        </button>
      </div>
    </section>
  )
}

interface DropdownProps {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

function Dropdown({ label, options, value, onChange }: DropdownProps) {
  return (
    <select
      className='bg-white text-blue-500 font-bold px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition focus:outline-0'
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value=''>{label}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
