// src/components/ProtectedRoute.tsx

import React, { useEffect, useRef, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { selectUser, selectUserLoading } from '../store/userData/userSelector'
import { Outlet, Navigate } from 'react-router-dom'
import { loginUser } from '../store/userData/userThunk'

interface ProtectedRouteProps {
  allowedRoles?: string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const user = useAppSelector(selectUser)
  const loading = useAppSelector(selectUserLoading)

  // const dispatch = useAppDispatch()
  // const hasCheckedSession = useRef(false)
  // const hasInitiatedRedirect = useRef(false)

  const userRole = useMemo(() => user?.role, [user])
  // const isAuthorized = useMemo(() => {
  //   if (!allowedRoles) return true
  //   if (!userRole) return false
  //   return allowedRoles.includes(userRole)
  // }, [allowedRoles, userRole])

  // useEffect(() => {
  //   if (
  //     !user &&
  //     !loading &&
  //     hasCheckedSession.current &&
  //     !hasInitiatedRedirect.current
  //   ) {
  //     hasInitiatedRedirect.current = true
  //     dispatch(loginUser())
  //   }
  // }, [dispatch, user, loading])

  const isAuthorized =
    !allowedRoles || (userRole && allowedRoles.includes(userRole))

  if (loading) {
    return (
      <div className='text-center py-20 text-blue-normal'>
        Đang kiểm tra phiên đăng nhập...{' '}
      </div>
    )
  }

  if (!user) {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/login`
    return null
  }

  if (allowedRoles && user && !isAuthorized) {
    return <Navigate to='/unauthorized' replace />
  }

  return <Outlet />
}

export default ProtectedRoute
