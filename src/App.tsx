import AppRoutes from './routes/AppRoutes'
import { useInitializeApp } from './hooks/useInitializeApp'
import { useAppDispatch } from './store/hooks'
import { useEffect } from 'react'
import { fetchProfile } from './store/userData/userThunk'

function App() {
  // Initialize app - auto fetch user profile khi app load
  useInitializeApp()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
