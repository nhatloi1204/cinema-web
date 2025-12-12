import React from 'react'
import { useAppSelector } from '../../../store/hooks'
import { selectEvents } from '../../../store/eventData/eventSelector'
import Carousel from '../../../components/Carousel'

const BannerSection: React.FC = () => {
  const events = useAppSelector(selectEvents)
  const slides = events.map(event => event.image)

  return (
    <div className='w-full'>
      <Carousel autoSlide={false} autoSlideInterval={3000}>
        {slides.map((s, i) => (
          <img
            key={i}
            src={s}
            alt='banner'
            className='w-full h-full max-h-[35rem] object-cover'
          />
        ))}
      </Carousel>
    </div>
  )
}

export default React.memo(BannerSection)
