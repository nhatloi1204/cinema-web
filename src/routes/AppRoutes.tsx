import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import userRoutes from './userRoutes'
import adminRoutes from './adminRoutes'
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* User Routes */}
          {userRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}

          {/* Admin Routes */}
          {/* {adminRoutes.map(({ path, component: Component, meta }) => (
            meta.adminOnly ? (
              <Route key={path} path={path} element={<AdminProtectedRoute><Component /></AdminProtectedRoute>} />
            ) : (
              <Route key={path} path={path} element={<Component />} />
            )
          ))} */}

          {/* 404 Page */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default AppRoutes
