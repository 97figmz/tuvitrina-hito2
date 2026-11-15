import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { useMarketplace } from '../context/MarketplaceContext'

export default function Profile() {
  const { user, products, myFavorites } = useMarketplace()
  const myProducts = products.filter(product => product.ownerId === user.id)
  const favoriteProducts = products.filter(product => myFavorites.includes(product.id))
  return <main className="container section">
    <span className="eyebrow">MI CUENTA</span><h1 className="page-title">Mi perfil</h1>
    <div className="profile-panel"><div><h2>{user.name}</h2><p>{user.email}</p></div><Link className="button button-primary" to="/publicar">+ Crear publicación</Link></div>
    <div className="section-heading"><h2>Mis publicaciones</h2></div>
    <ProductGrid products={myProducts} emptyText="Todavía no tienes publicaciones. ¡Publica tu primer repuesto!" />
    <div className="section-heading products-heading"><h2>Mis favoritos</h2></div>
    <ProductGrid products={favoriteProducts} emptyText="Aún no guardas productos favoritos." />
  </main>
}
