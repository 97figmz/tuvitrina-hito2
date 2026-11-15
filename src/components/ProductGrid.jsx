import ProductCard from './ProductCard'

export default function ProductGrid({ products, emptyText = 'No hay publicaciones para mostrar.' }) {
  if (!products.length) return <p className="empty-state">{emptyText}</p>
  return <div className="product-grid">{products.map(product => <ProductCard key={product.id} product={product} />)}</div>
}
