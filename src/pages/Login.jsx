import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useMarketplace } from '../context/MarketplaceContext'

export default function Login() {
  const { login } = useMarketplace()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = event => {
    event.preventDefault()
    if (!email.trim() || !password) return
    login(email)
    navigate(location.state?.from || '/perfil', { replace: true })
  }
  return <main className="container section"><div className="auth-panel">
    <span className="eyebrow">BIENVENIDO</span><h1>Iniciar sesión</h1>
    <p>Ingresa para publicar productos o guardar tus favoritos.</p>
    <form onSubmit={handleSubmit} className="form-stack">
      <label>Correo electrónico<input type="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="correo@ejemplo.cl" /></label>
      <label>Contraseña<input type="password" required value={password} onChange={event => setPassword(event.target.value)} placeholder="Contraseña" /></label>
      <button type="submit" className="button button-primary">Ingresar</button>
    </form>
    <p className="auth-foot">¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
    <p className="hint">Acceso de demostración: puedes usar cualquier correo y contraseña. No hay autenticación real ni se valida la contraseña.</p>
  </div></main>
}
