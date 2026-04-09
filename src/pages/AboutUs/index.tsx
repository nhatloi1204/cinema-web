import { useEffect } from 'react'
import { FaBuilding } from 'react-icons/fa'

function AboutUs() {

  const brandValues = [
    {
      title: 'CÂU CHUYỆN THƯƠNG HIỆU',
      description:
        'SPIXAL là thương hiệu rạp chiếu phim lấy tên từ SPIRIT (tinh thần) + Pixel (đơn vị điểm ảnh nhỏ nhất). Mong muốn trở thành nơi khán giả tìm thấy sự kết nối về cảm xúc và trải nghiệm đặc biệt.',
      icon: '🎬',
      color: 'text-blue-normal',
    },
    {
      title: '#NĂNG ĐỘNG',
      description:
        'Xây dựng hình ảnh tươi mới tràn đầy năng lượng. Các quảng cáo và video của Spixal thể hiện sự sôi động, trẻ trung với sắc màu tươi sáng.',
      icon: '⚡',
      color: 'text-orange-500',
    },
    {
      title: '#KẾT NỐI',
      description:
        'SPIXAL là nơi gắn kết cảm xúc - Tạo không gian để khách hàng thoải mái chia sẻ niềm vui, sự đồng cảm hay sự hồi hộp cùng nhau.',
      icon: '🤝',
      color: 'text-yellow-normal',
    },
    {
      title: '#HIỆN ĐẠI',
      description:
        'Các thiết kế mang phong cách hiện đại, nâng cao trải nghiệm khách hàng bằng cách cập nhập công nghệ màn hình chiếu phim mới.',
      icon: '🚀',
      color: 'text-red-normal',
    },
  ]

  return (
    <>
      {/* Banner Section */}
      <div className='bg-gradient-to-r from-blue-normal to-blue-light py-8 md:py-16 lg:py-24'>
        <div className='w-screen overflow-x-hidden px-[50px] md:px-8 lg:px-16'>
          <div className='mx-auto max-w-7xl'>
            <div className='text-center'>
              <h1 className='text-3xl md:text-4xl lg:text-6xl font-bungee text-white mb-2 md:mb-4 flex items-center justify-center gap-2 md:gap-3'>
                <FaBuilding className='text-xl md:text-3xl lg:text-5xl' />
                Về SPIXAL
              </h1>
              <p className='text-xs md:text-sm lg:text-base text-blue-100'>
                Khám phá câu chuyện và giá trị của thương hiệu rạp chiếu phim
                SPIXAL
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Values Section */}
      <div className='bg-white py-8 md:py-12 lg:py-16 px-[50px] md:px-8 lg:px-16 mx-auto max-w-7xl'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl text-blue-normal font-bungee text-center mb-8 md:mb-12 lg:mb-16 uppercase'>
          Giá Trị Thương Hiệu
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
          {brandValues.map((value, index) => (
            <div
              key={index}
              className='bg-gradient-to-b from-white to-gray-50 rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100'
            >
              <div className='text-3xl md:text-4xl mb-3'>{value.icon}</div>
              <h3
                className={`${value.color} font-bungee text-sm md:text-base lg:text-lg uppercase mb-2 md:mb-3`}
              >
                {value.title}
              </h3>
              <p className='text-xs md:text-sm text-gray-600 line-clamp-4'>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Theater Space */}
      <div className='bg-blue-light py-8 md:py-12 lg:py-16 px-[50px] md:px-8 lg:px-16'>
        <div className='mx-auto max-w-7xl'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl text-blue-normal font-bungee text-center mb-4 md:mb-6 uppercase'>
            Không Gian Rạp
          </h2>
          <p className='text-xs md:text-sm lg:text-base text-center mx-auto max-w-2xl mb-8 md:mb-12 text-gray-700'>
            Không gian tại rạp phim là nơi mọi người gắn kết và chia sẻ cảm xúc.
            Các bộ phim mang lại những cung bậc cảm xúc khác nhau, tạo ra tính
            kết nối giữa tác phẩm điện ảnh và khán giả.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
            <div className='rounded-2xl overflow-hidden'>
              <img
                src='/src/assets/images/aboutUsPage/khongian.png'
                className='w-full h-40 md:h-56 lg:h-72 object-cover'
              />
            </div>
            <div className='rounded-2xl overflow-hidden'>
              <img
                src='/src/assets/images/aboutUsPage/menumanhinh.png'
                className='w-full h-40 md:h-56 lg:h-72 object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutUs
