import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

/**
 * Hook để setup axios interceptor với Auth0 token
 * Tự động thêm Authorization header với token từ Auth0
 */
export const useAuth0Interceptor = () => {
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    // Remove cookie config
    axios.defaults.withCredentials = false

    // Setup request interceptor
    const requestInterceptor = axios.interceptors.request.use(
      async config => {
        try {
          const token = await getAccessTokenSilently()
          config.headers.Authorization = `Bearer ${token}`
        } catch (error) {
          console.error('Failed to get access token:', error)
        }
        return config
      },
      error => Promise.reject(error),
    )

    return () => {
      axios.interceptors.request.eject(requestInterceptor)
    }
  }, [getAccessTokenSilently])
}
