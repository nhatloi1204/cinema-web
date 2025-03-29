import contactImg from '../../assets/images/contactPage/contact1.png'
import { BsArrowRightCircle } from 'react-icons/bs'
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

      <div className='bg-white py-20 px-48'>
        <div className='flex items-center justify-between text-blue-normal pl-7 py-5 border-b-blue-normal border-b-2 w-2/3'>
          <h1 className='uppercase font-bungee  text-6xl '>Bạn cần hỗ trợ ?</h1>
        </div>

        <div className='flex items-center justify-between text-blue-normal pl-7 py-5 border-b-blue-normal border-b-2 w-2/3'>
          <h1 className='uppercase font-bungee  text-3xl'>CÁC BƯỚC ĐẶT VÉ</h1>
          <Link to=''>
            <BsArrowRightCircle className='text-3xl mr-7' />
          </Link>
        </div>

        <div className='flex items-center justify-between text-blue-normal pl-7 py-5 border-b-blue-normal border-b-2 w-2/3'>
          <h1 className='uppercase font-bungee  text-3xl '>
            Phương thức thanh toán
          </h1>
          <Link to=''>
            <BsArrowRightCircle className='text-3xl mr-7' />
          </Link>
        </div>

        <div className='flex items-center justify-between text-blue-normal pl-7 py-5 border-b-blue-normal border-b-2 w-2/3'>
          <h1 className='uppercase font-bungee  text-3xl '>CÁCH LẤY VÉ</h1>
          <Link to=''>
            <BsArrowRightCircle className='text-3xl mr-7' />
          </Link>
        </div>

        <div className='flex items-center justify-between text-blue-normal pl-7 py-5 border-b-blue-normal border-b-2 w-2/3'>
          <h1 className='uppercase font-bungee  text-3xl '>
            Hỗ trợ khách hàng
          </h1>
          <Link to=''>
            <BsArrowRightCircle className='text-3xl mr-7' />
          </Link>
        </div>

        <div className='pt-20 w-4/7'>
          <h1 className='uppercase font-bungee text-2xl text-blue-normal'>
            Hỗ trợ khách hàng
          </h1>
          <p className='pt-4'>
            Đối với các yêu cầu hỗ trợ về mua hàng online và dịch vụ khách hàng,
            vui lòng gửi email đến bộ phận hỗ trợ khách hàng của chúng tôi. nhận
            viên sẽ trả lời và phản hồi ngay trong vòng 1 giờ <br />{' '}
            <b> Email address: </b>
            <a href='mailto:spixal.cinema@gmail.com'>
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
