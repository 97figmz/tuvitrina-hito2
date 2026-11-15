import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMarketplace } from '../context/MarketplaceContext'

export default function Register() {
  const { register } = useMarketplace()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const onChange = event => setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
  const handleSubmit = event => {
    event.preventDefault()
    if (form.password !== form.confirm) { setError('Las contraseñas no coinciden.'); return }
    if (form.password.length < 6) { setError('Usa al menos 6 caracteres.'); return }
    setError('')
    register(form.name, form.email)
    navigate('/perfil')
  }
  return <main className="container section"><div className="auth-panel">
    <span className="eyebrow">CREA TU CUENTA</span><h1>Registro</h1><p>Únete a TuVitrina para publicar repuestos.</p>
    <form onSubmit={handleSubmit} className="form-stack">
      <label>Nombre<input name="name" required value={form.name} onChange={onChange} /></label>
      <label>Correo electrónico<input name="email" type="email" required value={form.email} onChange={onChange} /></label>
      <label>Contraseña<input name="password" type="password" required minLength="6" value={form.password} onChange={onChange} /></label>
      <label>Confirmar contraseña<input name="confirm" type="password" required value={form.confirm} onChange={onChange} /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-primary" type="submit">Crear cuenta</button>
    </form>
    <p className="auth-foot">¿Ya tienes cuenta? <Link to="/ingresar">Inicia sesión</Link></p>
    <p className="hint">Registro de demostración. No se guarda la contraseña ni se crea una cuenta en servidor.</p>
  </div></main>
}
