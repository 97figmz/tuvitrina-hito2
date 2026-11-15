// Contrato previsto para el backend. No se conecta aún a un servidor.
// Las vistas trabajan con MarketplaceContext y datos de ejemplo.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const apiRoutes = {
  register: '/usuarios',             // POST { name, email, password }
  login: '/login',                  // POST { email, password } -> { token, user }
  products: '/publicaciones',       // GET, POST (con token)
  product: (id) => `/publicaciones/${id}`, // GET
  profile: '/perfil',               // GET (con token)
  favorites: '/favoritos',          // GET, POST (con token)
}

export async function apiRequest(path, { token, ...options } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  })
  if (!response.ok) throw new Error(`Error de API: ${response.status}`)
  return response.status === 204 ? null : response.json()
}
