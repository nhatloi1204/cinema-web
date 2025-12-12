import React from 'react'
import { NavLink } from 'react-router-dom'
import { pathKeys, pathNames } from '../../constants'
import { FaBuilding, FaDoorOpen, FaFilm, FaClock } from 'react-icons/fa'

const sidebarItems = [
  {
    name: pathNames.ADMIN_THEATERS,
    path: pathKeys.ADMIN_THEATERS,
    icon: FaBuilding,
  },
  { name: pathNames.ADMIN_ROOMS, path: pathKeys.ADMIN_ROOMS, icon: FaDoorOpen },
  { name: pathNames.ADMIN_MOVIES, path: pathKeys.ADMIN_MOVIES, icon: FaFilm },
  {
    name: pathNames.ADMIN_SHOWTIMES,
    path: pathKeys.ADMIN_SHOWTIMES,
    icon: FaClock,
  },
]

const AdminSidebar: React.FC = () => {
  return (
    <nav className='w-64 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 flex flex-col shadow-2xl'>
      <div className='mb-8'>
        <h2 className='text-3xl font-bungee bg-gradient-to-r from-blue-normal to-cyan-400 bg-clip-text text-transparent'>
          SPIXAL ADMIN
        </h2>
        <div className='h-1 w-16 bg-gradient-to-r from-blue-normal to-cyan-400 rounded-full mt-2'></div>
      </div>

      <ul className='space-y-3 flex-1'>
        {sidebarItems.map(item => {
          const Icon = item.icon
          return (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-normal to-cyan-400 text-slate-900 shadow-lg shadow-blue-normal/30 scale-105'
                      : 'text-gray-300 hover:text-white hover:bg-slate-700/50 hover:translate-x-1'
                  }`
                }
              >
                <Icon className='text-lg' />
                {item.name}
              </NavLink>
            </li>
          )
        })}
      </ul>

      <div className='pt-6 border-t border-slate-700'>
        <div className='text-xs text-gray-500 text-center'>
          Cinema Admin v1.0
        </div>
      </div>
    </nav>
  )
}

export default AdminSidebar
