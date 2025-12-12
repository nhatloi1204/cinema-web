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
    <>
      <BannerSection />
      <MovieTabsSection />
      <EventSection />
      <ShopMenuSection />
      <AboutUsSection />
      <NewsSection />
    </>
  )
}

export default React.memo(Home)
