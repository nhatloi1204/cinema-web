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
      <div className='text-center text-2xl py-32'>Không có sản phẩm nào</div>
    )
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // số lượng sản phẩm hiển thị cùng lúc
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
    <div className='px-8 md:px-40 py-8'>
      <Slider {...settings}>
        {shopItems.map(item => (
          <div key={item._id} className='px-3 h-full'>
            <div className='h-[500px] bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col overflow-hidden'>
              {/* Ảnh */}
              <div className='relative w-full h-48 md:h-64 overflow-hidden rounded-t-2xl'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                />
              </div>

              {/* Nội dung */}
              <div className='flex flex-col flex-1 p-4'>
                {/* Title + description */}
                <div className='flex-1 flex flex-col justify-start'>
                  <h3 className='text-lg font-semibold text-blue-600 mb-2 text-center line-clamp-2 min-h-[3rem]'>
                    {item.name}
                  </h3>
                  <p className='text-gray-500 text-sm text-center line-clamp-2 min-h-[2.5rem]'>
                    {item.description}
                  </p>
                </div>

                {/* Price + Button */}
                <div className='mt-4'>
                  <p className='text-blue-600 font-bold text-xl text-center'>
                    {item.price.toLocaleString()}₫
                  </p>
                  <button className='mt-3 w-full py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 active:bg-blue-800 transition duration-200'>
                    Mua
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
