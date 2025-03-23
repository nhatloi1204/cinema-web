import { FaSearch } from 'react-icons/fa'

interface SearchBarProps {
  placeholder: string
}

const searchStyle = { color: '#00c0f3' }

const SearchBar = ({ placeholder }: SearchBarProps) => {
  return (
    <>
      <div className='relative'>
        <input
          className='bg-white w-72 h-10 border-gray-50 rounded-2xl placeholder:pl-5 placeholder:text-[#00c0f3] placeholder:font-semibold'
          type='search'
          name='searchMovie'
          id='searchMovie'
          placeholder={placeholder}
        />
        <FaSearch
          className='absolute top-3 left-10/12'
          style={searchStyle}
          size={20}
        />
      </div>
    </>
  )
}

export default SearchBar
