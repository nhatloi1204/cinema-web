import logo from '../../assets/images/logo.png'
import { FaTiktok, FaFacebookF } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'

function Footer() {
  return (
    <>
      <div className='mt-auto bg-blue-normal w-full py-8 md:py-12 lg:py-16'>
        <div className='px-[50px] md:px-8 lg:px-20'>
          {/* Logo */}
          <img
            src={logo}
            className='w-48 md:w-64 lg:w-[351.76px] h-auto mb-6 md:mb-8'
          />

          {/* Content Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-white font-bold text-sm md:text-base'>
            {/* Contact Info */}
            <div className='flex flex-col gap-2'>
              <p className='text-xs md:text-sm'>
                142 Hàm Nghi, Quận 1, TP. Hồ Chí Minh
              </p>
              <a
                href='mailto:spixal.cinema@gmail.com'
                className='hover:text-blue-200 transition-colors'
              >
                spixal.cinema@gmail.com
              </a>
              <a href='#' className='hover:text-blue-200 transition-colors'>
                spixalcinema.com
              </a>
              <a
                href='tel:(+84) 93 848 8501'
                className='hover:text-blue-200 transition-colors'
              >
                (+84) 93 848 8501
              </a>
            </div>

            {/* About Section */}
            <div className='flex flex-col gap-2'>
              <a href='#' className='hover:text-blue-200 transition-colors'>
                Giới thiệu
              </a>
              <a href='#' className='hover:text-blue-200 transition-colors'>
                Tuyển dụng
              </a>
              <a href='#' className='hover:text-blue-200 transition-colors'>
                Liên Hệ
              </a>
              <a href='#' className='hover:text-blue-200 transition-colors'>
                F.A.Q
              </a>
            </div>

            {/* Policy Section */}
            <div className='flex flex-col gap-2'>
              <a href='#' className='hover:text-blue-200 transition-colors'>
                Điều khoản sử dụng
              </a>
              <a href='#' className='hover:text-blue-200 transition-colors'>
                Chính sách thanh toán
              </a>
              <a href='#' className='hover:text-blue-200 transition-colors'>
                Điều khoản bảo mật
              </a>
              <a href='#' className='hover:text-blue-200 transition-colors'>
                Hướng dẫn đặt vé online
              </a>
            </div>

            {/* Social Icons */}
            <div className='flex flex-row gap-4 items-start md:items-end lg:justify-end'>
              <FaTiktok
                size={24}
                className='hover:text-blue-200 transition-colors cursor-pointer'
              />
              <FaInstagram
                size={24}
                className='hover:text-blue-200 transition-colors cursor-pointer'
              />
              <FaFacebookF
                size={24}
                className='hover:text-blue-200 transition-colors cursor-pointer'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
