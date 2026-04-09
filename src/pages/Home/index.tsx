import React from 'react'
import {
  BannerSection,
  MovieTabsSection,
  EventSection,
  ShopMenuSection,
  AboutUsSection,
  NewsSection,
} from './sections'

function Home() {
  return (
    <div className='w-screen overflow-x-hidden'>
      <BannerSection />
      <MovieTabsSection />
      <EventSection />
      <ShopMenuSection />
      <AboutUsSection />
      <NewsSection />
    </div>
  )
}

export default React.memo(Home)
