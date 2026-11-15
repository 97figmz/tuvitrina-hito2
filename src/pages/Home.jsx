import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { useMarketplace } from '../context/MarketplaceContext'
import { categories } from '../data/products'

export default function Home() {
  const { products } = useMarketplace()
  return <main className="container section">
    <h1>TuVitrina</h1>
    <p className="page-lead">Compra y venta de repuestos para motosierras, desbrozadoras, tractores y accesorios para pick-up.</p>
    <Link className="button button-primary" to="/publicaciones">Ver publicaciones</Link>
    <h2 className="home-subtitle">Categorías</h2>
    <div className="category-list">{categories.map(item => <Link key={item.value} to={`/publicaciones?categoria=${item.value}`}>{item.label}</Link>)}</div>
    <div className="section-heading products-heading"><h2>Últimas publicaciones</h2><Link to="/publicaciones">Ver todas</Link></div>
    <ProductGrid products={products.slice(0,4)} />
  </main>
}
