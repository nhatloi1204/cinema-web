import { lazy } from 'react'
import pathKeys from '../constants/pathKeys'
import pathNames from '../constants/pathNames'

const TheaterManagement = lazy(() => import('../pages/Admin/TheaterManagement'))
const RoomManagement = lazy(() => import('../pages/Admin/RoomManagement'))
const MovieManagement = lazy(() => import('../pages/Admin/MovieManagement'))
const ShowtimeManagement = lazy(
  () => import('../pages/Admin/ShowtimeManagement'),
)
const BannerManagement = lazy(() => import('../pages/Admin/BannerManagement'))

const adminRoutes = [
  {
    path: '',
    title: pathNames.ADMIN,
    component: TheaterManagement,
  },
  {
    path: pathKeys.ADMIN_THEATERS,
    title: pathNames.ADMIN_THEATERS,
    component: TheaterManagement,
  },
  {
    path: pathKeys.ADMIN_ROOMS,
    title: pathNames.ADMIN_ROOMS,
    component: RoomManagement,
  },
  {
    path: pathKeys.ADMIN_MOVIES,
    title: pathNames.ADMIN_MOVIES,
    component: MovieManagement,
  },
  {
    path: pathKeys.ADMIN_SHOWTIMES,
    title: pathNames.ADMIN_SHOWTIMES,
    component: ShowtimeManagement,
  },
  {
    path: pathKeys.ADMIN_BANNERS,
    title: pathNames.ADMIN_BANNERS,
    component: BannerManagement,
  },
]

export default adminRoutes
