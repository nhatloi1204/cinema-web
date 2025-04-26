import { lazy } from 'react'
import pathKeys from '../constants/pathKeys'
import pathNames from '../constants/pathNames'

const userRoutes = [
  {
    path: pathKeys.HOME,
    title: pathNames.HOME,
    component: lazy(() => import('../pages/Home')),
  },
  {
    path: pathKeys.MOVIES,
    title: pathNames.MOVIES,
    component: lazy(() => import('../pages/Movies')),
  },
  {
    path: pathKeys.MOVIE_DETAILS,
    title: pathNames.MOVIE_DETAILS,
    component: lazy(() => import('../pages/MovieDetail')),
  },
  {
    path: pathKeys.NEWS,
    title: pathNames.NEWS,
    component: lazy(() => import('../pages/News')),
  },
  {
    path: pathKeys.EVENTS,
    title: pathNames.EVENTS,
    component: lazy(() => import('../pages/Events')),
  },
  {
    path: pathKeys.ABOUT_US,
    title: pathNames.ABOUT_US,
    component: lazy(() => import('../pages/AboutUs')),
  },
  {
    path: pathKeys.SHOP,
    title: pathNames.SHOP,
    component: lazy(() => import('../pages/Shop')),
  },
  {
    path: pathKeys.CONTACT,
    title: pathNames.CONTACT,
    component: lazy(() => import('../pages/Contact')),
  },
  //   {
  //     path: pathKeys.PROFILE,
  //     title: pathNames.PROFILE,
  //     component: lazy(() => import("../pages/Profile")),
  //   },
]

export default userRoutes
