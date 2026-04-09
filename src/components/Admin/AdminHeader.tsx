import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userData/userSelector'
import { logoutUser } from '../../store/userData/userThunk'
import { FaSignOutAlt, FaUser, FaChevronDown, FaBars } from 'react-icons/fa'

const AdminHeader: React.FC<{ onMenuClick?: () => void }> = ({
  onMenuClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    // Dispatch logout thunk để clear backend session + set user = null
    await dispatch(logoutUser())
    setIsDropdownOpen(false)
    // Redirect về home
    navigate('/')
  }

  return (
    <header className='bg-white shadow-md border-b border-gray-200 px-4 md:px-8 py-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className='md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <FaBars className='text-xl text-gray-700' />
            </button>
          )}
          <div>
            <h1 className='text-xl md:text-2xl font-bungee text-gray-800'>
              Dashboard
            </h1>
            <p className='text-xs md:text-sm text-gray-500'>
              Chào mừng đến với trang quản lý
            </p>
          </div>
        </div>

        {/* User Profile */}
        <div className='relative' ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='flex items-center gap-3 px-3 md:px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-200'
          >
            <img
              src={user?.avatar || '/default-avatar.png'}
              alt='User Avatar'
              className='w-10 h-10 rounded-full object-cover'
            />
            <div className='text-left'>
              <p className='text-sm font-semibold text-gray-800'>
                {user?.name || 'User'}
              </p>
              <p className='text-xs text-gray-500'>
                {user?.email || 'email@example.com'}
              </p>
            </div>
            <FaChevronDown
              className={`text-gray-600 transition-transform duration-300 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50'>
              {/* User Info */}
              <div className='px-4 py-3 border-b border-gray-200'>
                <p className='text-sm font-semibold text-gray-800'>
                  {user?.name || 'User'}
                </p>
                <p className='text-xs text-gray-500 mt-1'>
                  {user?.email || 'email@example.com'}
                </p>
              </div>

              {/* Menu Items */}
              <button className='w-full text-left px-4 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200'>
                <FaUser className='text-blue-normal' />
                <span>Thông tin cá nhân</span>
              </button>

              {/* Divider */}
              <div className='my-2 border-t border-gray-200'></div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className='w-full text-left px-4 py-2 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors duration-200'
              >
                <FaSignOutAlt />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
