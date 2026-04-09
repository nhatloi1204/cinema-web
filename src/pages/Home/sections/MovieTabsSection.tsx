import React, { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchMovies } from '../../../store/movieData/movieThunk'
import {
  selectMoviesNowShowing,
  selectMoviesComingSoon,
  selectMoviesSpecial,
  selectMovieLoading,
} from '../../../store/movieData/movieSelector'
import { motion, AnimatePresence } from 'framer-motion'
import MovieSlider from '../../../components/MovieSlider'

const MovieTabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('nowShowing')
  const hasInitialized = useRef(false)

  const dispatch = useAppDispatch()

  const moviesNowShowing = useAppSelector(selectMoviesNowShowing)
  const moviesComingSoon = useAppSelector(selectMoviesComingSoon)
  const moviesSpecial = useAppSelector(selectMoviesSpecial)
  const loading = useAppSelector(selectMovieLoading)

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      dispatch(fetchMovies())
    }
  }, [dispatch])

  return (
    <>
      {/* Tabs */}
      <div className='flex justify-center gap-2 md:gap-6 px-[50px] md:px-8 lg:px-16 pt-4 md:pt-6 lg:pt-10 bg-white overflow-x-auto mx-auto max-w-7xl'>
        {[
          { key: 'nowShowing', label: 'Phim Đang Chiếu' },
          { key: 'comingSoon', label: 'Phim Sắp Chiếu' },
          // { key: 'specialShows', label: 'Suất Chiếu Đặc Biệt' },
        ].map(tab => (
          <button
            key={tab.key}
            className={`py-2 px-3 md:px-4 rounded-t-lg transition text-xs md:text-sm uppercase font-bungee text-blue-normal whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-blue-normal text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className='bg-white mx-4 md:mx-auto md:max-w-7xl rounded-lg overflow-hidden min-h-[300px] md:min-h-[500px] lg:min-h-[600px]'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='flex justify-center'
          >
            {activeTab === 'nowShowing' && (
              <MovieSlider movies={moviesNowShowing} loading={loading} />
            )}

            {activeTab === 'comingSoon' && (
              <MovieSlider movies={moviesComingSoon} loading={loading} />
            )}

            {activeTab === 'specialShows' && (
              <MovieSlider movies={moviesSpecial} loading={loading} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}

export default React.memo(MovieTabsSection)
