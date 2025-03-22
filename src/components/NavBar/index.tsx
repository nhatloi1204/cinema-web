import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav>
      <ul className='flex flex-row'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='*'>Not Found</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
