import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/Admin/AdminSidebar'
import AdminHeader from '../components/Admin/AdminHeader'

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <div
        className={`fixed md:relative z-40 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block`}
      >
        <AdminSidebar />
      </div>

      {/* Overlay - Only visible on mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-30 md:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className='flex-1 flex flex-col w-full'>
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className='flex-1 overflow-auto'>
          <div className='p-4 md:p-8'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
