import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/Admin/AdminSidebar'
import AdminHeader from '../components/Admin/AdminHeader'

const AdminLayout: React.FC = () => {
  return (
    <div className='flex h-screen bg-gray-50'>
      <AdminSidebar />
      <div className='flex-1 flex flex-col'>
        <AdminHeader />
        <main className='flex-1 overflow-auto'>
          <div className='p-8'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
