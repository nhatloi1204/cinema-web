import Carousel from '../../components/Carousel'

const slides = [
  '/src/assets/images/carousel/banner1.png',
  '/src/assets/images/carousel/banner2.png',
  '/src/assets/images/carousel/banner3.png',
  '/src/assets/images/carousel/banner4.png',
]

function AboutUs() {
  return (
    <>
      <Carousel autoSlide={true} autoSlideInterval={3000}>
        {slides.map((s, i) => (
          <img
            src={s}
            key={i}
            alt='banner'
            className='w-full h-full max-h-[35rem] object-cover'
          />
        ))}
      </Carousel>

      <div className='bg-white w-full px-40 py-20'>
        <div className='grid grid-cols-2 grid-rows-9  gap-x-20 gap-y-14'>
          <img
            src='/src/assets/images/aboutUsPage/about-us1.png'
            alt='aboutUs1'
            className='row-span-3 mx-auto'
          />

          <div className='row-span-2 place-self-center'>
            <h1 className='uppercase font-bungee text-5xl text-blue-normal pb-6 w-2/3'>
              CÂU CHUYỆN THƯƠNG HIỆU
            </h1>
            <p>
              SPIXAL là thương hiệu rạp chiếu phim lấy tên từ SPIRIT (tinh thần)
              + Pixal (đồng âm của Pixel, là đơn vị là điểm ảnh nhỏ nhất có thể
              hiển thị trên màn hình). Khác với các rạp chiếu phim truyền thống,
              SPIXAL mong muốn trở thành nơi khán giả tìm thấy sự kết nối về cảm
              xúc và trải nghiệm đặc biệt qua từng thiết kế của mình. Các thiết
              kế và câu chuyện thương hiệu lấy cảm hứng từ những cung bậc cảm
              xúc của khán giả qua mỗi một tác phẩm điện ảnh.
            </p>
          </div>

          <img
            src='/src/assets/images/aboutUsPage/about-us2.png'
            alt='aboutUs1'
            className='row-span-3 col-start-2 row-start-3 mx-auto'
          />

          <div className='row-start-4 text-right'>
            <h1 className='uppercase font-bungee text-5xl text-blue-normal pb-6'>
              #NĂNG ĐỘNG
            </h1>
            <p>
              Xây dựng hình ảnh tươi mới và tràn đầy năng lượng, các hình ảnh
              quảng cáo, đồ họa và video của Spixal nên luôn thể hiện sự sôi
              động, trẻ trung, với các sắc màu tươi sáng và bắt mắt phù hợp với
              giới trẻ
            </p>
          </div>

          <img
            src='/src/assets/images/aboutUsPage/about-us3.png'
            alt='aboutUs1'
            className='row-span-3 row-start-5 mx-auto'
          />

          <div className='col-start-2 row-start-6 my-auto'>
            <h1 className='uppercase font-bungee text-5xl text-yellow-normal pb-6'>
              #KẾT NỐI
            </h1>
            <p>
              SPIXAL mong muốn là nơi gắn kết cảm xúc - Tạo nên không gian và
              trải nghiệm gắn bó với khách hàng khi xem phim mà người xem có thể
              thoải mái chia sẻ niềm vui, sự đồng cảm hay sự hồi hộp, sợ hãi
              cùng nhau.
            </p>
          </div>

          <img
            src='/src/assets/images/aboutUsPage/about-us4.png'
            alt='aboutUs1'
            className='row-span-3 col-start-2 row-start-7 mx-auto'
          />

          <div className='row-span-2 row-start-8 text-right'>
            <h1 className='uppercase font-bungee text-5xl text-red-normal  pb-6'>
              #HIỆN ĐẠI
            </h1>
            <p>
              Các thiết kế của SPIXAL mang phong cách hiện đại, đồng thời nâng
              cao trải nghiệm của khách hàng bằng cách cập nhập các công nghệ
              màn hình chiếu phim mới.
            </p>
          </div>
        </div>
      </div>

      <div className='px-40 py-20 bg-blue-light'>
        <div className='text-center w-2/3 mx-auto pb-16'>
          <h1 className='text-5xl text-blue-normal uppercase font-bungee pb-7'>
            KHÔNG GIAN RẠP
          </h1>
          <p>
            Không gian tại rạp phim sẽ là nơi để mọi người gắn kết và chia sẻ
            cảm xúc với nhau. Các bộ phim sẽ mang lại cho khán giả những cung
            bậc cảm xúc khác nhau, điều này tạo ra tính kết nối giữa các tác
            phẩm điện ảnh tới khán giả, và sự đồng điệu trong cảm xúc của người
            xem.
          </p>
        </div>

        <div className='flex flex-col w-full gap-7 items-center'>
          <img
            src='/src/assets/images/aboutUsPage/rap2.png'
            className='rounded-3xl object-cover'
          />
          <div className='flex gap-x-7 w-full '>
            <div className='w-1/2 rounded-3xl overflow-hidden'>
              <img
                src='/src/assets/images/aboutUsPage/khongian.png'
                className='w-full object-cover'
              />
            </div>

            <div className='w-1/2 rounded-3xl overflow-hidden'>
              <img
                src='/src/assets/images/aboutUsPage/menumanhinh.png'
                className='w-full object-cover'
              />
            </div>
          </div>
          <img
            src='/src/assets/images/aboutUsPage/rap2(1).png'
            className='rounded-3xl object-cover'
          />
        </div>

        {/* <div className='grid grid-cols-2 grid-rows-3 gap-7'>
          <img
            src='/src/assets/images/aboutUsPage/rap2.png'
            className='col-span-2 mx-auto rounded-2xl object-cover place-self-stretch'
          />
          <img
            src='/src/assets/images/aboutUsPage/khongian.png'
            className='row-start-2 rounded-2xl object-cover max-h-80 place-self-stretch'
          />
          <img
            src='/src/assets/images/aboutUsPage/menumanhinh.png'
            className='row-start-2 rounded-2xl object-cover max-h-80 place-self-stretch'
          />
          <img
            src='/src/assets/images/aboutUsPage/rap2(1).png'
            className='col-span-2 mx-auto rounded-2xl object-cover place-self-stretch'
          />
        </div> */}
      </div>
    </>
  )
}

export default AboutUs
