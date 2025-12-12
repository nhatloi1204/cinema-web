import AppRoutes from './routes/AppRoutes'
import { useInitializeApp } from './hooks/useInitializeApp'

function App() {
  // Initialize app - auto fetch user profile khi app load
  useInitializeApp()

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
