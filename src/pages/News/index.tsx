import Carousel from '../../components/Carousel'
import QuickBooking from '../../components/QuickBooking'

const slides = [
  '/src/assets/images/carousel/banner1.png',
  '/src/assets/images/carousel/banner2.png',
  '/src/assets/images/carousel/banner3.png',
  '/src/assets/images/carousel/banner4.png',
]

const theaters = ['']
const movies = ['']
const dates = ['']
const times = ['']

const news = [
  {
    img: '/src/assets/images/newsPage/news1.png',
    title: 'SỰ KIỆN KHAI TRƯƠNG',
    text: 'Khám phá rạp chiếu phim hiện đại, nơi mọi khoảnh khắc đều sống động và tràn đầy cảm hứng! Tham gia lễ khai trương với suất chiếu miễn phí, ưu đãi hấp dẫn và nhiều hoạt động vui nhộn dành riêng cho bạn.',
  },
  {
    img: '/src/assets/images/newsPage/news2.png',
    title: 'CHECK-IN NGAY – NHẬN VÉ XEM PHIM MIỄN PHÍ!',
    text: 'Bạn đã sẵn sàng để trở thành một trong những khán giả đầu tiên trải nghiệm không gian điện ảnh đỉnh cao tại SPIXAL CINEMA chưa? Cực kỳ đơn giản! Chỉ cần CHECK-IN NGAY để nhận VÉ XEM PHIM MIỄN PHÍ! ',
  },
  {
    img: '/src/assets/images/newsPage/news3.png',
    title: 'KHAI TRƯƠNG TƯNG BỪNG – COMBO BẮP NƯỚC SIÊU ƯU ĐÃI!',
    text: 'Để chào đón sự kiện khai trương hoành tráng, SPIXAL CINEMA mang đến chương trình khuyến mãi cực hấp dẫn dành cho các tín đồ điện ảnh! Combo bắp nước siêu ưu đãi chỉ từ [giá ưu đãi] – giúp bạn tận hưởng những thước phim đỉnh cao cùng hương vị thơm ngon khó cưỡng!',
  },
  {
    img: '/src/assets/images/newsPage/news4.png',
    title: 'THÀNH VIÊN MAY MẮN NHẬN QUÀ TẶNG TỪ SPIXAL!',
    text: 'SPIXAL CINEMA tri ân khách hàng với chương trình “THÀNH VIÊN MAY MẮN – NHẬN QUÀ HẤP DẪN”! Nếu bạn là thành viên của SPIXAL, đừng bỏ lỡ cơ hội sở hữu hộp quà bí ẩn với những phần quà cực chất!',
  },
]

function News() {
  return (
    <>
      <Carousel autoSlide={false} autoSlideInterval={3000}>
        {slides.map((s, i) => (
          <img
            src={s}
            key={i}
            alt='banner'
            className='w-full h-full min-h-[20rem] max-h-[35rem] object-cover'
          />
        ))}
      </Carousel>
      <QuickBooking
        theaters={theaters}
        movies={movies}
        dates={dates}
        times={times}
      />

      <div className='bg-white py-32 px-20'>
        <div className='flex flex-col w-full gap-16'>
          {news.map((news, index) => (
            <div
              key={index}
              className={`flex w-full gap-7 items-end ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse '}`}
            >
              <img
                src={news.img}
                alt='news'
                className='w-1/2 max-h-96 object-cover rounded-3xl'
              />
              <div
                className={` flex flex-col w-1/2 ${index % 2 == 0 ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`flex flex-col w-3/4 ${index % 2 == 0 ? 'text-left' : 'text-right'}`}
                >
                  <h1 className='uppercase text-4xl text-blue-normal font-bungee'>
                    {news.title}
                  </h1>
                  <p className='py-7'>{news.text}</p>
                  <div>
                    <button className='w-48 h-auto text-2xl uppercase font-bungee border-2 border-blue-normal rounded-full text-blue-normal py-2 hover:bg-blue-lightHover active:bg-blue-lightActive'>
                      Xem thêm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default News
