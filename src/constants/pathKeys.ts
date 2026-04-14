const pathKeys = {
  HOME: '/',
  LOGIN: '/login',
  MOVIES: '/movies',
  MOVIE_DETAILS: '/movies/:id',
  SEAT_SELECTION: '/seat-selection/:showtimeId',
  PAYMENT: '/payment',
  NEWS: '/news',
  EVENTS: '/events',
  ABOUT_US: '/about-us',
  PROFILE: '/profile',
  CONTACT: '/contact',
  SHOP: '/shop',
  CALLBACK: '/callback',

  // Admin Routes
  ADMIN: 'admin',
  ADMIN_THEATERS: 'theaters',
  ADMIN_ROOMS: 'rooms',
  ADMIN_MOVIES: 'movies',
  ADMIN_SHOWTIMES: 'showtimes',
  ADMIN_BANNERS: 'banners',
  ADMIN_SHOP: 'shop-items',
  ADMIN_NEWS: 'news',
  ADMIN_EVENTS: 'events',

  // ADMIN_DASHBOARD: "/admin/dashboard",
  // ADMIN_USERS: "/admin/users",
  // ADMIN_MOVIES: "/admin/movies",

  NOT_FOUND: '*',
}

export default pathKeys
