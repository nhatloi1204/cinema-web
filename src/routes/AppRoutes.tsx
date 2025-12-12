import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import userRoutes from './userRoutes'
import adminRoutes from './adminRoutes'
import NotFound from '../pages/NotFound'
import AdminLayout from '../layouts/AdminLayout'
import ProtectedRoute from '../components/ProtectedRoute'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* User Routes (PUBLIC)*/}
        <Route element={<MainLayout />}>
          {userRoutes.map(
            ({ path, component: Component, isProtected }) =>
              !isProtected && (
                <Route key={path} path={path} element={<Component />} />
              ),
          )}

          {/* User Routes (PROTECTED)*/}
          <Route element={<ProtectedRoute />}>
            {userRoutes.map(
              ({ path, component: Component, isProtected }) =>
                isProtected && (
                  <Route key={path} path={path} element={<Component />} />
                ),
            )}
          </Route>
        </Route>

        {/* Admin Routes (PROTECTED)*/}
        <Route
          path='/admin'
          element={<ProtectedRoute allowedRoles={['Admin']} />}
        >
          <Route element={<AdminLayout />}>
            {adminRoutes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
