import AppRoutes from './routes/AppRoutes'
import { useAuth0Interceptor } from './hooks/useAuth0Interceptor'
import { useInitializeApp } from './hooks/useInitializeApp'

function App() {
  // Setup Auth0 axios interceptor (adds token to all requests)
  useAuth0Interceptor()

  // Auto fetch user profile khi user authenticate
  useInitializeApp()

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
