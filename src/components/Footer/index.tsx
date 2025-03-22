import logo from '../../assets/image/logo.png'
import { FaTiktok, FaFacebookF } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'

function Footer() {
  return (
    <>
      <div className='mt-auto bg-[#00c0f3] h-96 w-full'>
        <img src={logo} className='w-[351.76px] h-auto ml-20 mt-20' />
        <div className='flex flex-auto px-20 pt-9 flex-row justify-between text-white font-bold'>
          <div className='flex flex-col'>
            <p>142 Hàm Nghi, Quận 1, TP. Hồ Chí Minh</p>
            <a href='mailto:spixal.cinema@gmail.com'>spixal.cinema@gmail.com</a>
            <a href='#'>spixalcinema.com</a>
            <a href='tel:(+84) 93 848 8501 '>(+84) 93 848 8501 </a>
          </div>

          <div className='flex flex-col'>
            <a href='#'>Giới thiệu</a>
            <a href='#'>Tuyển dụng</a>
            <a href='#'>Liên Hệ</a>
            <a href='#'>F.A.Q</a>
          </div>

          <div className='flex flex-col'>
            <a href='#'>Điều khoản sử dụng</a>
            <a href='#'>Chính sách thanh toán</a>
            <a href='#'>Điều khoản bảo mật</a>
            <a href='#'>Hướng dẫn đặt vé online</a>
          </div>

          <div className='flex flex-row gap-2 items-end'>
            <FaTiktok size={30} />
            <FaInstagram size={30} />
            <FaFacebookF size={30} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
