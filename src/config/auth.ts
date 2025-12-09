export const AUTH_CONFIG = {
  loginUrl: `${import.meta.env.VITE_API_URL}/auth/login`,
  logoutUrl: `${import.meta.env.VITE_API_URL}/auth/logout`,
  callbackUrl: `${import.meta.env.VITE_WEB_URL}/callback`,
  profileUrl: `${import.meta.env.VITE_API_URL}/auth/profile`,
}
