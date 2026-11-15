import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useMarketplace } from '../context/MarketplaceContext'

export default function Header() {
  const { user, logout } = useMarketplace()
  const navigate = useNavigate()
  const onLogout = () => { logout(); navigate('/') }

  return <header className="site-header">
    <div className="container header-inner">
      <Link className="brand" to="/">TuVitrina</Link>
      <nav aria-label="Navegación principal">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/publicaciones">Publicaciones</NavLink>
        {user ? <>
          <NavLink to="/publicar">Publicar</NavLink>
          <NavLink to="/perfil">Mi perfil</NavLink>
          <button className="nav-button" onClick={onLogout}>Salir</button>
        </> : <>
          <NavLink to="/ingresar">Ingresar</NavLink>
          <Link className="nav-register" to="/registro">Registro</Link>
        </>}
      </nav>
    </div>
  </header>
}
