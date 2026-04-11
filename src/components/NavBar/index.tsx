import { useState, useEffect, useRef } from 'react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import logo from '../../assets/images/logo.png'
import {
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
} from 'react-icons/fa'
import { pathKeys, pathNames } from '../../constants'
import { useAppSelector } from '../../store/hooks'
import { useAuth0Actions } from '../../hooks/useAuth0Actions'
import { selectUser } from '../../store/userData/userSelector'

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const navigate = useNavigate()
  const { isAuthenticated } = useAuth0()
  const user = useAppSelector(selectUser)
  const { login: handleLogin, logout: handleLogout } = useAuth0Actions()
  // const loading = useAppSelector(state => state.loading) // Commented out as it's unused
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenus = () => {
    setIsMenuOpen(false)
    setIsDropdownOpen(false)
  }

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

  const navLinks = [
    { path: pathKeys.MOVIES, name: pathNames.MOVIES },
    { path: pathKeys.ABOUT_US, name: pathNames.ABOUT_US.Spixal },
    { path: pathKeys.SHOP, name: pathNames.SHOP },
    { path: pathKeys.NEWS, name: pathNames.NEWS },
    { path: pathKeys.CONTACT, name: pathNames.CONTACT },
  ]

  return (
    <nav className='bg-blue-normal w-full sticky top-0 z-40 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20'>
          {/* Logo */}
          <Link to={pathKeys.HOME} className='flex-shrink-0'>
            <img src={logo} className='w-[140px] h-auto' alt='Logo' />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex flex-1 justify-center space-x-10 uppercase text-white font-bungee text-sm tracking-wide'>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className='hover:text-blue-light transition-colors duration-200'
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop User Section */}
          <div className='hidden lg:flex items-center gap-4'>
            {isAuthenticated && user ? (
              <div className='relative' ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className='flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors duration-200 text-white group'
                >
                  <div className='text-right'>
                    <p className='text-sm font-medium leading-none'>
                      Chào {user.name}
                    </p>
                  </div>
                  <img
                    src={user.avatar}
                    // alt={user.name}
                    className='w-9 h-9 rounded-full object-cover border-2 border-white/50 group-hover:border-white'
                  />
                  <FaChevronDown
                    size={12}
                    className={`text-white transition-transform duration-300 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50'>
                    <div className='px-4 py-3 border-b border-gray-200'>
                      <p className='text-sm font-semibold text-gray-800'>
                        {user.name}
                      </p>
                      <p className='text-xs text-gray-500 mt-1'>{user.email}</p>
                    </div>

                    <Link
                      to='/profile'
                      className='flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200'
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaUser className='text-blue-normal' size={14} />
                      <span>Thông tin cá nhân</span>
                    </Link>

                    <div className='my-2 border-t border-gray-200'></div>

                    <button
                      onClick={() => {
                        handleLogout()
                        setIsDropdownOpen(false)
                        navigate('/')
                      }}
                      className='flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200'
                    >
                      <FaSignOutAlt size={14} />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className='px-6 py-2 bg-white text-blue-normal font-bold rounded-full hover:bg-blue-light hover:text-white transition-all duration-200 text-sm'
              >
                Đăng nhập
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className='lg:hidden text-white hover:bg-white/10 rounded-lg p-2 transition-colors duration-200'
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className='lg:hidden bg-blue-normal border-t border-blue-light'>
          <div className='px-4 py-3 space-y-1'>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className='block px-4 py-2 uppercase text-white font-bungee text-sm hover:bg-white/10 rounded-lg transition-colors duration-200'
                onClick={closeMenus}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile User Section */}
            <div className='pt-3 mt-3 border-t border-blue-light'>
              {isAuthenticated && user ? (
                <>
                  <div className='flex items-center gap-3 px-4 py-2 mb-2'>
                    <img
                      src={user.avatar}
                      // alt={user.name}
                      className='w-10 h-10 rounded-full object-cover border-2 border-white/50'
                    />
                    <div className='text-white'>
                      <p className='text-sm font-semibold'>{user.name}</p>
                      <p className='text-xs text-blue-light'>{user.email}</p>
                    </div>
                  </div>

                  <Link
                    to='/profile'
                    className='flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200'
                    onClick={closeMenus}
                  >
                    <FaUser size={14} />
                    <span className='text-sm'>Thông tin cá nhân</span>
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout()
                      closeMenus()
                      navigate('/')
                    }}
                    className='flex items-center gap-2 w-full px-4 py-2 text-white hover:bg-red-600 rounded-lg transition-colors duration-200'
                  >
                    <FaSignOutAlt size={14} />
                    <span className='text-sm'>Đăng xuất</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogin()
                    closeMenus()
                  }}
                  className='w-full bg-white text-blue-normal font-bold py-2 rounded-lg hover:bg-blue-light hover:text-white transition-all duration-200 text-sm'
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default React.memo(NavBar)
