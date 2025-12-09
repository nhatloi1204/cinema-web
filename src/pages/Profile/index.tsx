import { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userData/userSelector'

export default function UserProfile() {
  const user = useAppSelector(selectUser)

  if (!user) {
    return (
      <div className='w-full max-w-5xl mx-auto px-4 py-10'>
        <p className='text-center text-gray-600'>Chưa có dữ liệu người dùng.</p>
      </div>
    )
  }

  return (
    <div className='w-full max-w-5xl mx-auto px-4 py-10'>
      <div className='bg-white shadow-xl rounded-3xl p-6 sm:p-10'>
        {/* Avatar */}
        <div className='flex flex-col items-center mb-10'>
          <img
            src={user.avatar}
            alt='Avatar'
            className='w-32 h-32 rounded-full border-4 border-blue-normal mb-4'
          />
          <h2 className='text-2xl font-bold text-blue-normal'>{user.name}</h2>
        </div>

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <tbody>
              <tr className='border-t'>
                <th className='py-3 px-4 text-gray-600 font-medium w-1/3'>
                  Họ và tên
                </th>
                <td className='py-3 px-4'>{user.name}</td>
              </tr>
              <tr className='border-t'>
                <th className='py-3 px-4 text-gray-600 font-medium'>
                  Ngày sinh
                </th>
                <td className='py-3 px-4'>{user.dob || 'Chưa cập nhật'}</td>
              </tr>
              <tr className='border-t'>
                <th className='py-3 px-4 text-gray-600 font-medium'>
                  Giới tính
                </th>
                <td className='py-3 px-4'>{user.gender || 'Khác'}</td>
              </tr>
              <tr className='border-t'>
                <th className='py-3 px-4 text-gray-600 font-medium'>Email</th>
                <td className='py-3 px-4'>{user.email}</td>
              </tr>
              <tr className='border-t'>
                <th className='py-3 px-4 text-gray-600 font-medium'>
                  Số điện thoại
                </th>
                <td className='py-3 px-4'>{user.phoneNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center mt-8'>
          <button className='px-6 py-2 rounded-full bg-blue-normal text-white font-semibold hover:bg-blue-normalHover active:bg-blue-normalActive transition'>
            Cập nhật hồ sơ
          </button>
          <button className='px-6 py-2 rounded-full bg-red-dark text-white font-semibold hover:bg-red-darkHover active:bg-red-darkActive transition'>
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  )
}
