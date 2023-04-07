import { Navigate, Outlet } from 'react-router-dom'

const LoggedInGuard = () => {
   const isLoggedIn = () => {
    const token = localStorage.getItem('token')
    return token
   }
  return (
    isLoggedIn() ? 
    <Navigate to='/s/'/> :
    <Outlet/>
  )
}

export default LoggedInGuard