import { Link } from 'react-router-dom'
import { categories } from '../data/products'
import { formatPrice } from '../services/format'
import { useMarketplace } from '../context/MarketplaceContext'
import ProductImage from './ProductImage'

export default function ProductCard({ product }) {
  const { user, myFavorites, toggleFavorite } = useMarketplace()
  const favorite = myFavorites.includes(product.id)
  const category = categories.find(item => item.value === product.category)?.label || product.category
  return <article className="product-card">
    <Link to={`/publicaciones/${product.id}`} className="product-visual"><ProductImage product={product} /></Link>
    <div className="product-content">
      <small>{category}</small>
      <h3><Link to={`/publicaciones/${product.id}`}>{product.title}</Link></h3>
      <div className="product-bottom"><strong>{formatPrice(product.price)}</strong>
      {user && <button className="favorite-button" title={favorite ? 'Quitar favorito' : 'Agregar favorito'} onClick={() => toggleFavorite(product.id)}>{favorite ? '♥' : '♡'}</button>}</div>
    </div>
  </article>
}
