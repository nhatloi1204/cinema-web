import { Link } from 'react-router-dom'
import logo from '../../assets/image/logo.png'
import { FaUser, FaShoppingBag } from 'react-icons/fa'
import SearchBar from '../SearchBar'

function NavBar() {
  return (
    <nav className='flex flex-row justify-between  bg-[#00c0f3] w-full h-20 items-center'>
      <img src={logo} className='w-[173px] h-auto ml-20 my-2' />

      <div className='flex flex-row pl-14 justify-between gap-16 mr-auto uppercase font-black text-white'>
        <Link to='/'>Phim</Link>

        <Link to='*'>Spixal</Link>

        <Link to='*'>Cửa hàng</Link>

        <Link to='*'>Tin tức ưu đãi</Link>

        <Link to='*'>Liên Hệ</Link>
      </div>

      <div className='flex flex-row mr-20 gap-8 items-center'>
        <SearchBar placeholder='Nhập tên phim' />
        <button>
          <FaUser size={20} />
        </button>
        <button>
          <FaShoppingBag size={20} />
        </button>
      </div>
    </nav>
  )
}

export default NavBar
