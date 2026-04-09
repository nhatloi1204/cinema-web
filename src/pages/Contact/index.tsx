import contactImg from '../../assets/images/contactPage/contact1.png'
import { Link } from 'react-router-dom'

function Contact() {
  return (
    <>
      <div className='relative w-full'>
        <img
          src={contactImg}
          alt='contact'
          className='w-full object-cover max-h-[40rem]'
        />
        <div className='absolute top-2/3 right-1/8 w-1/3'>
          <h1 className='uppercase font-bungee text-4xl text-white'>
            Liên hệ với chúng tôi
          </h1>
          <p className='pt-5 text-white'>
            Bạn đang gặp vấn đề gì? Chỗ này cái gì cũng nhiệt tình! LIÊN HỆ NGAY
            ĐI và khám phá những điều bạn đang thắc mắc!
          </p>
        </div>
      </div>

      <div className='bg-white py-8 md:py-12 lg:py-20 px-[50px] md:px-8 lg:px-16 mx-auto max-w-7xl'>
        <div className='flex items-center justify-start md:justify-start text-blue-normal pl-0 md:pl-4 lg:pl-7 py-4 md:py-5 border-b-blue-normal border-b-2 w-full md:w-2/3'>
          <h1 className='uppercase font-bungee text-2xl md:text-4xl lg:text-6xl'>
            Bạn cần hỗ trợ ?
          </h1>
        </div>

        <div className='flex items-center justify-between text-blue-normal pl-0 md:pl-4 lg:pl-7 py-4 md:py-5 border-b-blue-normal border-b-2 w-full md:w-2/3'>
          <h1 className='uppercase font-bungee text-lg md:text-2xl lg:text-3xl'>
            CÁC BƯỚC ĐẶT VÉ
          </h1>
          <Link to=''>
            <div className='text-lg md:text-2xl lg:text-3xl mr-0 md:mr-7 cursor-pointer'>
              →
            </div>
          </Link>
        </div>

        <div className='flex items-center justify-between text-blue-normal pl-0 md:pl-4 lg:pl-7 py-4 md:py-5 border-b-blue-normal border-b-2 w-full md:w-2/3'>
          <h1 className='uppercase font-bungee text-lg md:text-2xl lg:text-3xl'>
            Phương thức thanh toán
          </h1>
          <Link to=''>
            <div className='text-lg md:text-2xl lg:text-3xl mr-0 md:mr-7 cursor-pointer'>
              →
            </div>
          </Link>
        </div>

        <div className='flex items-center justify-between text-blue-normal pl-0 md:pl-4 lg:pl-7 py-4 md:py-5 border-b-blue-normal border-b-2 w-full md:w-2/3'>
          <h1 className='uppercase font-bungee text-lg md:text-2xl lg:text-3xl'>
            CÁCH LẤY VÉ
          </h1>
          <Link to=''>
            <div className='text-lg md:text-2xl lg:text-3xl mr-0 md:mr-7 cursor-pointer'>
              →
            </div>
          </Link>
        </div>

        <div className='flex items-center justify-between text-blue-normal pl-0 md:pl-4 lg:pl-7 py-4 md:py-5 border-b-blue-normal border-b-2 w-full md:w-2/3'>
          <h1 className='uppercase font-bungee text-lg md:text-2xl lg:text-3xl'>
            Hỗ trợ khách hàng
          </h1>
          <Link to=''>
            <div className='text-lg md:text-2xl lg:text-3xl mr-0 md:mr-7 cursor-pointer'>
              →
            </div>
          </Link>
        </div>

        <div className='pt-8 md:pt-12 lg:pt-20 w-full md:w-4/7'>
          <h1 className='uppercase font-bungee text-lg md:text-xl lg:text-2xl text-blue-normal'>
            Hỗ trợ khách hàng
          </h1>
          <p className='pt-2 md:pt-4 text-xs md:text-sm lg:text-base'>
            Đối với các yêu cầu hỗ trợ về mua hàng online và dịch vụ khách hàng,
            vui lòng gửi email đến bộ phận hỗ trợ khách hàng của chúng tôi. nhận
            viên sẽ trả lời và phản hồi ngay trong vòng 1 giờ <br />{' '}
            <b> Email address: </b>
            <a
              href='mailto:spixal.cinema@gmail.com'
              className='text-blue-normal hover:underline'
            >
              spixal.cinema@gmail.com
            </a>{' '}
            <br /> <b>Company Address:</b> 142 Hàm Nghi, Quận 1, TP.Hồ Chí Minh
          </p>
        </div>
      </div>
    </>
  )
}

export default Contact
