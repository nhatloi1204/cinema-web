import { ReactNode } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='flex flex-col min-h-[100vh]'>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
