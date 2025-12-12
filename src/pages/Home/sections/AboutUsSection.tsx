import React from 'react'
import { Link } from 'react-router-dom'
import { pathKeys } from '../../../constants'

const AboutUsSection: React.FC = () => {
  return (
    <div className='w-full px-64 pb-16 pt-8'>
      <div className='flex gap-6 pt-10'>
        <img
          src='/src/assets/images/aboutUs1.png'
          alt='aboutUs1'
          className='h-96 min-w-3/5 object-cover rounded-3xl'
        />
        <div className='self-end'>
          <h1 className='uppercase text-3xl text-blue-normal font-bungee'>
            Về chúng mình
          </h1>
          <div className='py-6'>
            SPIXAL là thương hiệu rạp chiếu phim lấy tên từ SPIRIT (tinh thần) +
            Pixal (đồng âm của Pixel, là đơn vị là điểm ảnh nhỏ nhất có thể hiển
            thị trên màn hình). Khác với các rạp chiếu phim truyền thống, SPIXAL
            mong muốn trở thành nơi khán giả tìm thấy sự kết nối về cảm xúc và
            trải nghiệm đặc biệt qua từng thiết kế của mình. Các thiết kế và câu
            chuyện thương hiệu lấy cảm hứng từ những cung bậc cảm xúc của khán
            giả qua mỗi một tác phẩm điện ảnh.
          </div>
          <Link to={pathKeys.ABOUT_US}>
            <button className='w-48 h-auto text-2xl uppercase font-bungee border-2 border-blue-normal rounded-full text-blue-normal hover:bg-blue-lightHover active:bg-blue-lightActive'>
              <p className='py-2 '>Xem thêm</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AboutUsSection)
