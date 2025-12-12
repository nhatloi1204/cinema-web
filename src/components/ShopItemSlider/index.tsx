import Slider from 'react-slick'
import { ShopItem } from '../../store/shopData/shopType'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

interface ShopItemSliderProps {
  shopItems: ShopItem[]
}

export default function ShopItemSlider({ shopItems }: ShopItemSliderProps) {
  if (!shopItems || shopItems.length === 0) {
    return (
      <div className='text-center text-lg py-32 text-gray-400'>
        Hiện tại chưa có sản phẩm nào
      </div>
    )
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div className='px-6 md:px-12 py-8'>
      <Slider {...settings}>
        {shopItems.map(item => (
          <div key={item._id} className='px-3 h-full'>
            <div className='h-[520px] bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1'>
              {/* Ảnh */}
              <div className='relative w-full h-56 md:h-64 overflow-hidden bg-gray-100'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                />
                {/* Badge */}
                <div className='absolute top-3 right-3 bg-blue-normal text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg'>
                  HOT
                </div>
              </div>

              {/* Nội dung */}
              <div className='flex flex-col flex-1 p-5'>
                {/* Title + description */}
                <div className='flex-1 flex flex-col justify-start'>
                  <h3 className='text-base font-bungee text-blue-normal mb-2 text-center line-clamp-2 min-h-[2.5rem] tracking-wide'>
                    {item.name}
                  </h3>
                  <p className='text-gray-600 text-sm text-center line-clamp-2 min-h-[2.5rem] leading-relaxed'>
                    {item.description}
                  </p>
                </div>

                {/* Price + Button */}
                <div className='mt-5 space-y-3'>
                  <p className='text-blue-normal font-bold text-2xl text-center font-bungee'>
                    {item.price.toLocaleString()}₫
                  </p>
                  <button className='w-full py-2.5 bg-blue-normal text-white font-semibold rounded-lg hover:bg-cyan-500 active:bg-cyan-600 transition-colors duration-200 shadow-sm hover:shadow-md'>
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}
