import { Link, useParams } from 'react-router-dom'
import { useMarketplace } from '../context/MarketplaceContext'
import { categories } from '../data/products'
import { formatPrice } from '../services/format'
import ProductImage from '../components/ProductImage'

export default function Detail() {
  const { id } = useParams()
  const { products, user, myFavorites, toggleFavorite } = useMarketplace()
  const product = products.find(item => String(item.id) === id)
  if (!product) return <main className="container section"><h1>Publicación no encontrada</h1><Link to="/publicaciones">Volver al catálogo</Link></main>
  const category = categories.find(item => item.value === product.category)?.label || product.category
  const favorite = myFavorites.includes(product.id)

  return <main className="container section">
    <Link className="back-link" to="/publicaciones">← Volver a publicaciones</Link>
    <div className="detail-layout">
      <div className="detail-picture"><ProductImage product={product} /></div>
      <div className="detail-info">
        <span className="eyebrow">{category}</span>
        <h1>{product.title}</h1>
        <p className="detail-price">{formatPrice(product.price)}</p>
        <h2>Descripción</h2><p>{product.description}</p>
        <p className="seller">Publicado por: <strong>{product.seller}</strong></p>
        {user ? <button className="button button-primary" onClick={() => toggleFavorite(product.id)}>{favorite ? '♥ Quitar de favoritos' : '♡ Guardar en favoritos'}</button> : <p><Link to="/ingresar">Inicia sesión</Link> para guardar esta publicación.</p>}
        <p className="hint">Datos de ejemplo. El contacto con el vendedor se implementará en próximos hitos.</p>
      </div>
    </div>
  </main>
}
