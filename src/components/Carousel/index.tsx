// src/components/BannerCarousel.tsx
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import './index.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { ReactNode, useRef } from 'react'

interface Slide {
  id: string
  image: string
  title: string
  subtitle: string
  link?: string
}

interface BannerCarouselProps {
  slides: Slide[]
  autoSlide?: boolean
  autoSlideInterval?: number
}

export default function BannerCarousel({
  slides,
  autoSlide = true,
  autoSlideInterval = 5000,
}: BannerCarouselProps) {
  const sliderRef = useRef<any>(null)

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: autoSlide,
    autoplaySpeed: autoSlideInterval,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    pauseOnHover: true,

    appendDots: (dots: ReactNode) => (
      <div>
        <div className='flex items-center gap-1 px-3 py-1.5 rounded-full select-none'>
          <button
            aria-label='Previous slide'
            className='w-7 h-7 flex items-center justify-center transition-all duration-200 focus:outline-none active:scale-90'
            onClick={() => sliderRef.current?.slickPrev()}
            tabIndex={0}
            type='button'
          >
            <FaChevronLeft size={16} />
          </button>
          <ul className='flex gap-0.5 items-center'>{dots}</ul>
          <button
            aria-label='Next slide'
            className='w-7 h-7 flex items-center justify-center transition-all duration-200 focus:outline-none active:scale-90'
            onClick={() => sliderRef.current?.slickNext()}
            tabIndex={0}
            type='button'
          >
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>
    ),

    customPaging: (i: number) => (
      <button
        className='w-2.5 h-2.5 rounded-full bg-white/70 opacity-70 hover:opacity-100 transition-all duration-200 focus:outline-none'
        aria-label={`Go to slide ${i + 1}`}
        type='button'
      />
    ),

    responsive: [
      { breakpoint: 1024, settings: { arrows: false } },
      { breakpoint: 768, settings: { arrows: false } },
      { breakpoint: 640, settings: { arrows: false } },
    ],
  }

  return (
    <div className='relative w-full overflow-hidden rounded-lg group'>
      <Slider ref={sliderRef} {...settings}>
        {slides.map(slide => (
          <div
            key={slide.id}
            className='relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] outline-none'
          >
            {slide.link ? (
              <a
                href={slide.link}
                className='block w-full h-full cursor-pointer'
              >
                <img
                  src={slide.image}
                  loading='lazy'
                  alt={slide.title}
                  className='w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-500'
                />

                <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent'>
                  <div className='absolute bottom-12 left-6 sm:left-10 md:left-14 lg:left-20 max-w-2xl text-white'>
                    <h2 className='text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold drop-shadow-lg leading-tight mb-2 md:mb-4 hover:text-blue-400 transition-colors'>
                      {slide.title}
                    </h2>
                    <p className='text-sm sm:text-base md:text-lg drop-shadow-md line-clamp-2 md:line-clamp-none'>
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </a>
            ) : (
              <>
                <img
                  src={slide.image}
                  loading='lazy'
                  alt={slide.title}
                  className='w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-500'
                />

                <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent'>
                  <div className='absolute bottom-12 left-6 sm:left-10 md:left-14 lg:left-20 max-w-2xl text-white'>
                    <h2 className='text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold drop-shadow-lg leading-tight mb-2 md:mb-4'>
                      {slide.title}
                    </h2>
                    <p className='text-sm sm:text-base md:text-lg drop-shadow-md line-clamp-2 md:line-clamp-none'>
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </Slider>
    </div>
  )
}
