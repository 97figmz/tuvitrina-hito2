import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useMarketplace } from '../context/MarketplaceContext'

export default function ProtectedRoute() {
  const { user } = useMarketplace()
  const location = useLocation()
  return user ? <Outlet /> : <Navigate to="/ingresar" replace state={{ from: location.pathname }} />
}
