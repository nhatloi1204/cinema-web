import { useState, useEffect, useRef } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { FaBars, FaTimes } from 'react-icons/fa'
import SearchBar from '../SearchBar'
import { pathKeys, pathNames } from '../../constants'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loginUser, logoutUser } from '../../store/userData/userThunk'
import {
  selectUser,
  selectUserLoading,
} from '../../store/userData/userSelector'

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const loading = useAppSelector(selectUserLoading)

  // useEffect(() => {
  //   if (!user) {
  //     dispatch(fetchProfile())
  //   }
  // }, [dispatch, user])
  // console.log('UserProfile rendering...')

  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev)
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

  const handleLogin = () => dispatch(loginUser())
  const handleLogout = () => dispatch(logoutUser())

  return (
    <nav className='bg-blue-normal w-full'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20'>
          {/* Logo */}
          <div className='flex-shrink-0 flex items-center'>
            <Link to={pathKeys.HOME}>
              <img src={logo} className='w-[140px] h-auto' alt='Logo' />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className='hidden md:flex flex-1 justify-center space-x-10 uppercase text-white font-bungee'>
            <Link to={pathKeys.MOVIES}>{pathNames.MOVIES}</Link>
            <Link to={pathKeys.ABOUT_US}>{pathNames.ABOUT_US.Spixal}</Link>
            <Link to={pathKeys.SHOP}>{pathNames.SHOP}</Link>
            <Link to={pathKeys.NEWS}>{pathNames.NEWS}</Link>
            <Link to={pathKeys.CONTACT}>{pathNames.CONTACT}</Link>
          </div>

          {/* Right side */}
          <div className='hidden md:flex items-center gap-6'>
            <SearchBar placeholder='Nhập tên phim' />

            {user ? (
              <div className='relative z-50' ref={dropdownRef}>
                <img
                  src={user.avatar}
                  alt='avatar'
                  className='w-10 h-10 rounded-full cursor-pointer'
                  onClick={toggleDropdown}
                />

                {isDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg'>
                    <Link
                      to='/profile'
                      className='block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-xl'
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Thông tin người dùng
                    </Link>
                    <Link
                      to='/change-password'
                      className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Đổi mật khẩu
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-xl'
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button
                  onClick={handleLogin}
                  className='px-4 py-2 bg-white text-blue-normal font-bold rounded-full hover:bg-blue-lightHover transition'
                >
                  Đăng nhập
                </button>
                <div></div>
              </div>
            )}
          </div>

          {/* Mobile button */}
          <div className='flex md:hidden'>
            <button onClick={toggleMenu} className='text-white'>
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-blue-normal px-2 pt-2 pb-3 space-y-2 uppercase text-white font-bungee'>
          <Link to={pathKeys.MOVIES} className='block' onClick={toggleMenu}>
            {pathNames.MOVIES}
          </Link>
          <Link to={pathKeys.ABOUT_US} className='block' onClick={toggleMenu}>
            {pathNames.ABOUT_US.Spixal}
          </Link>
          <Link to={pathKeys.SHOP} className='block' onClick={toggleMenu}>
            {pathNames.SHOP}
          </Link>
          <Link to={pathKeys.NEWS} className='block' onClick={toggleMenu}>
            {pathNames.NEWS}
          </Link>
          <Link to={pathKeys.CONTACT} className='block' onClick={toggleMenu}>
            {pathNames.CONTACT}
          </Link>

          {/* Mobile User options */}
          <div className='pt-4 border-t border-blue-light'>
            {user ? (
              <>
                <Link to='/profile' className='block' onClick={toggleMenu}>
                  Thông tin người dùng
                </Link>
                <Link
                  to='/change-password'
                  className='block'
                  onClick={toggleMenu}
                >
                  Đổi mật khẩu
                </Link>
                <button
                  onClick={handleLogout}
                  className='w-full text-left cursor-pointer'
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <button
                className='block bg-white text-blue-normal font-bold rounded-full text-center py-2'
                onClick={handleLogin}
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default React.memo(NavBar)
