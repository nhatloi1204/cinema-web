import React from 'react'
import { useAppSelector } from '../../../store/hooks'
import { selectEvents } from '../../../store/eventData/eventSelector'
import Carousel from '../../../components/Carousel'

const BannerSection: React.FC = () => {
  const events = useAppSelector(selectEvents)

  const slides = events.map(event => ({
    id: event._id,
    image: event.image,
    title: event.title,
    subtitle: event.title, 
  }))

  return (
    <div className='w-full'>
      <Carousel slides={slides} autoSlide autoSlideInterval={5000} />
    </div>
  )
}

export default React.memo(BannerSection)
