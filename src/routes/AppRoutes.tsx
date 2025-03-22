import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default AppRoutes
