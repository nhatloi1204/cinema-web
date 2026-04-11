// src/components/ProtectedRoute.tsx

import React, { useMemo, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useAppSelector } from '../store/hooks'
import { selectUser, selectUserLoading } from '../store/userData/userSelector'
import { Outlet, Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  allowedRoles?: string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()
  const user = useAppSelector(selectUser)
  const loading = useAppSelector(selectUserLoading)

  const userRole = useMemo(() => user?.role, [user])

  const isAuthorized =
    !allowedRoles || (userRole && allowedRoles.includes(userRole))

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      loginWithRedirect()
    }
  }, [isAuthenticated, loading, loginWithRedirect])

  if (loading) {
    return (
      <div className='text-center py-20 text-blue-normal'>
        Đang kiểm tra phiên đăng nhập...{' '}
      </div>
    )
  }

  if (allowedRoles && user && !isAuthorized) {
    return <Navigate to='/unauthorized' replace />
  }

  return <Outlet />
}

export default ProtectedRoute
