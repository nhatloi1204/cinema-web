import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchProfile } from '../store/userData/userThunk'
import { selectUserInitialized } from '../store/userData/userSelector'

/**
 * Hook để initialize app - tự động fetch user profile khi user đã authenticate
 * Chỉ chạy 1 lần khi user auth hoàn tất
 */
export const useInitializeApp = () => {
  const dispatch = useAppDispatch()
  const { isAuthenticated, isLoading: authLoading } = useAuth0()
  const isInitialized = useAppSelector(selectUserInitialized)

  useEffect(() => {
    // Sau khi Auth0 load và user authenticate xong, gọi fetchProfile
    if (isAuthenticated && !authLoading && !isInitialized) {
      dispatch(fetchProfile())
    }
  }, [dispatch, isAuthenticated, authLoading, isInitialized])
}
