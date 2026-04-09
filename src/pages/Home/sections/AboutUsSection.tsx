import React from 'react'
import { Link } from 'react-router-dom'
import { pathKeys } from '../../../constants'

const AboutUsSection: React.FC = () => {
  return (
    <div className='w-full px-[50px] md:px-8 lg:px-16 py-8 md:py-12 lg:py-16 mx-auto max-w-7xl'>
      <div className='flex flex-col lg:flex-row gap-3 md:gap-4 lg:gap-6'>
        {/* Image */}
        <img
          src='/src/assets/images/aboutUs1.png'
          alt='aboutUs1'
          className='h-40 md:h-64 lg:h-80 w-full lg:w-1/2 object-cover rounded-lg md:rounded-2xl'
        />
        {/* Content */}
        <div className='flex flex-col justify-between lg:w-1/2'>
          <div>
            <h1 className='uppercase text-lg md:text-2xl lg:text-2xl text-blue-normal font-bungee mb-2 md:mb-3'>
              Về chúng mình
            </h1>
            <p className='text-xs md:text-sm text-gray-700 line-clamp-4 md:line-clamp-5 leading-relaxed'>
              SPIXAL là thương hiệu rạp chiếu phim lấy tên từ SPIRIT (tinh thần)
              + Pixal (đồng âm của Pixel, là đơn vị là điểm ảnh nhỏ nhất có thể
              hiển thị trên màn hình). Khác với các rạp chiếu phim truyền thống,
              SPIXAL mong muốn trở thành nơi khán giả tìm thấy sự kết nối về cảm
              xúc và trải nghiệm đặc biệt qua từng thiết kế của mình.
            </p>
          </div>
          <Link to={pathKeys.ABOUT_US} className='w-fit mt-3 md:mt-4'>
            <button className='text-xs md:text-sm lg:text-base uppercase font-bungee border-2 border-blue-normal rounded-full text-blue-normal py-1.5 px-3 md:px-4 lg:px-5 hover:bg-blue-lightHover active:bg-blue-lightActive transition-all whitespace-nowrap'>
              Xem thêm
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AboutUsSection)
