import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { pathKeys, pathNames } from '../../constants'
import {
  FaBuilding,
  FaDoorOpen,
  FaFilm,
  FaClock,
  FaImage,
  FaChevronDown,
  FaShoppingCart,
  FaNewspaper,
  FaCalendar,
} from 'react-icons/fa'

const AdminSidebar: React.FC = () => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>('movie')

  const sidebarGroups = [
    {
      id: 'movie',
      name: 'Quản lý Phim & Suất Chiếu',
      items: [
        {
          name: pathNames.ADMIN_THEATERS,
          path: pathKeys.ADMIN_THEATERS,
          icon: FaBuilding,
        },
        {
          name: pathNames.ADMIN_ROOMS,
          path: pathKeys.ADMIN_ROOMS,
          icon: FaDoorOpen,
        },
        {
          name: pathNames.ADMIN_MOVIES,
          path: pathKeys.ADMIN_MOVIES,
          icon: FaFilm,
        },
        {
          name: pathNames.ADMIN_SHOWTIMES,
          path: pathKeys.ADMIN_SHOWTIMES,
          icon: FaClock,
        },
      ],
    },
    {
      id: 'content',
      name: 'Quản lý Nội Dung',
      items: [
        {
          name: pathNames.ADMIN_BANNERS,
          path: pathKeys.ADMIN_BANNERS,
          icon: FaImage,
        },
        {
          name: pathNames.ADMIN_SHOP,
          path: pathKeys.ADMIN_SHOP,
          icon: FaShoppingCart,
        },
        {
          name: pathNames.ADMIN_NEWS,
          path: pathKeys.ADMIN_NEWS,
          icon: FaNewspaper,
        },
        {
          name: pathNames.ADMIN_EVENTS,
          path: pathKeys.ADMIN_EVENTS,
          icon: FaCalendar,
        },
      ],
    },
  ]

  return (
    <nav className='w-64 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 flex flex-col shadow-2xl overflow-y-auto'>
      <div className='mb-8'>
        <h2 className='text-3xl font-bungee bg-gradient-to-r from-blue-normal to-cyan-400 bg-clip-text text-transparent'>
          SPIXAL ADMIN
        </h2>
        <div className='h-1 w-16 bg-gradient-to-r from-blue-normal to-cyan-400 rounded-full mt-2'></div>
      </div>

      <ul className='space-y-4 flex-1'>
        {sidebarGroups.map(group => (
          <li key={group.id}>
            <button
              onClick={() =>
                setExpandedGroup(expandedGroup === group.id ? null : group.id)
              }
              className='w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 font-medium text-gray-300 hover:text-white hover:bg-slate-700/50'
            >
              <span>{group.name}</span>
              <FaChevronDown
                className={`text-sm transition-transform duration-300 ${
                  expandedGroup === group.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedGroup === group.id && (
              <ul className='mt-2 ml-4 space-y-2 border-l border-slate-700 pl-4'>
                {group.items.map(item => {
                  const Icon = item.icon
                  return (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${
                            isActive
                              ? 'bg-gradient-to-r from-blue-normal to-cyan-400 text-slate-900 shadow-lg shadow-blue-normal/30'
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
            )}
          </li>
        ))}
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
