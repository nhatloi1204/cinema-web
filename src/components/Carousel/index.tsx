import { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface CarouselProps {
  children: React.ReactElement[]
  autoSlide: boolean
  autoSlideInterval: number
}

export default function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}: CarouselProps) {
  const [curr, setCurr] = useState(0)

  const prev = () =>
    setCurr(curr => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () =>
    setCurr(curr => (curr === slides.length - 1 ? 0 : curr + 1))

  useEffect(() => {
    if (!autoSlide) return
    const slideInterval = setInterval(next, autoSlideInterval)
    return () => clearInterval(slideInterval)
  }, [])

  return (
    <div className='overflow-hidden relative w-full'>
      <div
        className='flex transition-transform duration-500 ease-in-out'
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className='w-full flex-shrink-0'>
            {slide}
          </div>
        ))}
      </div>

      <div className='absolute inset-0 flex items-center justify-between p-4'>
        <button
          onClick={prev}
          className='rounded-full bg-zinc-100 p-2 shadow text-gray-800 hover:bg-white'
        >
          <FaChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className='rounded-full bg-zinc-100 p-2 shadow text-gray-800 hover:bg-white'
        >
          <FaChevronRight size={40} />
        </button>
      </div>

      <div className='absolute bottom-4 right-0 left-0'>
        <div className='flex items-center justify-center gap-4'>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurr(i)}
              className={` transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? 'p-2' : 'opacity-50'}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
