import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchProfile } from '../store/userData/userThunk'
import { selectUserInitialized } from '../store/userData/userSelector'

/**
 * Hook để initialize app - auto fetch user profile khi app load lần đầu
 * Chỉ chạy 1 lần khi component mount
 */
export const useInitializeApp = () => {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(selectUserInitialized)

  useEffect(() => {
    // Nếu chưa initialize lần nào thì gọi fetchProfile
    // isInitialized = true nghĩa là đã fetch/logout rồi, không gọi lại
    if (!isInitialized) {
      dispatch(fetchProfile())
    }
  }, [dispatch, isInitialized])
}
