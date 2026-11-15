import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { initialProducts } from '../data/products'

const MarketplaceContext = createContext(null)
const SESSION_KEY = 'tuvitrina_session'
const PRODUCTS_KEY = 'tuvitrina_products'
const FAVORITES_KEY = 'tuvitrina_favorites'

function readStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function MarketplaceProvider({ children }) {
  const [user, setUser] = useState(() => readStored(SESSION_KEY, null))
  const [products, setProducts] = useState(() => readStored(PRODUCTS_KEY, initialProducts))
  const [favorites, setFavorites] = useState(() => readStored(FAVORITES_KEY, []))

  useEffect(() => { localStorage.setItem(SESSION_KEY, JSON.stringify(user)) }, [user])
  useEffect(() => { localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products)) }, [products])
  useEffect(() => { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)) }, [favorites])

  // Inicio de sesión simulado: en el hito del backend se validará con la API.
  function login(email) {
    const cleanEmail = email.trim().toLowerCase()
    const nextUser = { id: cleanEmail, name: cleanEmail.split('@')[0], email: cleanEmail }
    setUser(nextUser)
  }

  function register(name, email) {
    setUser({ id: email.trim().toLowerCase(), name: name.trim(), email: email.trim().toLowerCase() })
  }

  function logout() { setUser(null) }

  function createProduct(values) {
    if (!user) return false
    const newProduct = {
      id: Date.now(),
      title: values.title.trim(),
      category: values.category,
      price: Number(values.price),
      description: values.description.trim(),
      seller: user.name,
      ownerId: user.id,
    }
    setProducts(prev => [newProduct, ...prev])
    return true
  }

  function toggleFavorite(productId) {
    if (!user) return
    setFavorites(prev => prev.some(item => item.userId === user.id && item.productId === productId)
      ? prev.filter(item => !(item.userId === user.id && item.productId === productId))
      : [...prev, { userId: user.id, productId }])
  }

  const myFavorites = useMemo(() => user ? favorites.filter(item => item.userId === user.id).map(item => item.productId) : [], [favorites, user])
  const value = { user, products, myFavorites, login, register, logout, createProduct, toggleFavorite }
  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext)
  if (!context) throw new Error('useMarketplace debe utilizarse dentro de MarketplaceProvider')
  return context
}
