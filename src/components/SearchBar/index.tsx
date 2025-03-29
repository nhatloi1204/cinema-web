import { FaSearch } from 'react-icons/fa'

interface SearchBarProps {
  placeholder: string
}

const SearchBar = ({ placeholder }: SearchBarProps) => {
  return (
    <>
      <div className='relative'>
        <input
          className='bg-white w-72 h-10 border-gray-50 rounded-2xl placeholder:text-blue-normal placeholder:font-semibold focus:outline-0 pl-10 pr-5 focus'
          type='search'
          name='searchMovie'
          id='searchMovie'
          placeholder={placeholder}
        />
        <FaSearch
          className='absolute top-3 left-[4%] text-blue-normal'
          size={20}
        />
      </div>
    </>
  )
}

export default SearchBar
