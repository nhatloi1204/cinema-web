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
      <div className='flex justify-center gap-6 px-36 pt-10 bg-white'>
        {[
          { key: 'nowShowing', label: 'Phim Đang Chiếu' },
          { key: 'comingSoon', label: 'Phim Sắp Chiếu' },
          { key: 'specialShows', label: 'Suất Chiếu Đặc Biệt' },
        ].map(tab => (
          <button
            key={tab.key}
            className={`py-2 px-4 rounded-t-lg transition w-[25%] uppercase font-bungee text-blue-normal ${
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
      <div className='bg-white m-8 rounded-lg overflow-hidden min-h-[600px]'>
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
