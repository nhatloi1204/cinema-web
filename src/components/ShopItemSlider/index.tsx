import Slider from 'react-slick'
import { ShopItem } from '../../store/shopData/shopType'
import { IoStar } from 'react-icons/io5'
import 'slick-carousel/slick/slick.css'
import '../MovieSlider/index.css'

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
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div
      className='w-full px-4 md:px-8 py-6'
      style={{ maxWidth: '1200px', margin: '0 auto' }}
    >
      <Slider {...settings}>
        {shopItems.map(item => (
          <div key={item._id} className='px-3 h-full'>
            <div className='h-[620px] rounded-2xl bg-gradient-to-b from-white to-gray-50 shadow-lg hover:shadow-2xl border border-gray-200/50 transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-3'>
              {/* Image Container */}
              <div className='relative w-full h-72 overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                />

                {/* Dark overlay on hover */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                {/* HOT Badge */}
                <div className='absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg uppercase tracking-wide'>
                  Hot
                </div>

                {/* Rating */}
                <div className='absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md'>
                  <IoStar
                    size={16}
                    className='text-yellow-500 fill-yellow-500'
                  />
                  <span className='text-sm font-bold text-gray-800'>4.8</span>
                </div>
              </div>

              {/* Content */}
              <div className='flex flex-col flex-1 p-6 gap-4'>
                {/* Title */}
                <h3 className='text-lg font-bold text-gray-900 line-clamp-2 tracking-wide group-hover:text-blue-600 transition-colors'>
                  {item.name}
                </h3>

                {/* Description */}
                <p className='text-gray-600 text-sm line-clamp-2 leading-relaxed flex-1'>
                  {item.description}
                </p>

                {/* Price */}
                <div className='flex items-baseline gap-2'>
                  <p className='text-2xl font-bold text-blue-600 font-bungee'>
                    {item.price.toLocaleString()}₫
                  </p>
                </div>

                {/* Button */}
                <button className='w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}
