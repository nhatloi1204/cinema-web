import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { FaUser, FaShoppingBag } from 'react-icons/fa'
import SearchBar from '../SearchBar'
import { pathKeys, pathNames } from '../../constants'

function NavBar() {
  return (
    <nav className='flex flex-row justify-between  bg-blue-normal w-full h-20 items-center'>
      <Link to={pathKeys.HOME}>
        <img src={logo} className='w-[173px] h-auto ml-20 my-2' />
      </Link>

      <div className='flex flex-row pl-14 justify-between gap-16 mr-auto uppercase text-white font-bungee'>
        <Link to={pathKeys.MOVIES}>{pathNames.MOVIES}</Link>

        <Link to={pathKeys.ABOUT_US}>{pathNames.ABOUT_US.Spixal}</Link>

        <Link to={pathKeys.SHOP}>{pathNames.SHOP}</Link>

        <Link to={pathKeys.NEWS}>{pathNames.NEWS}</Link>

        <Link to={pathKeys.CONTACT}>{pathNames.CONTACT}</Link>
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
