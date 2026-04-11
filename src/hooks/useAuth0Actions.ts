import { useAuth0 } from '@auth0/auth0-react'

/**
 * Custom hook to use Auth0 login/logout with Redux
 * Replaces old loginUser/logoutUser thunks
 */
export const useAuth0Actions = () => {
  const { loginWithRedirect, logout } = useAuth0()

  const handleLogin = async () => {
    await loginWithRedirect()
  }

  const handleLogout = async () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return {
    login: handleLogin,
    logout: handleLogout,
  }
}
