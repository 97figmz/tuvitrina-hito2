import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { useMarketplace } from '../context/MarketplaceContext'
import { categories } from '../data/products'

export default function Listings() {
  const { products } = useMarketplace()
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('recientes')
  const selectedCategory = params.get('categoria') || ''
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    const list = products.filter(product => (!selectedCategory || product.category === selectedCategory) && (!query || `${product.title} ${product.description}`.toLowerCase().includes(query)))
    if (sort === 'menor') list.sort((a, b) => a.price - b.price)
    if (sort === 'mayor') list.sort((a, b) => b.price - a.price)
    return list
  }, [products, search, selectedCategory, sort])

  return <main className="container section">
    <span className="eyebrow">CATÁLOGO</span><h1 className="page-title">Publicaciones</h1>
    <p className="page-lead">Busca repuestos y accesorios publicados en TuVitrina.</p>
    <div className="filters">
      <label>Buscar producto<input value={search} onChange={event => setSearch(event.target.value)} placeholder="Ej: filtro, cadena, barra..." /></label>
      <label>Categoría<select value={selectedCategory} onChange={event => setParams(event.target.value ? { categoria: event.target.value } : {})}><option value="">Todas las categorías</option>{categories.map(item => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label>
      <label>Ordenar<select value={sort} onChange={event => setSort(event.target.value)}><option value="recientes">Más recientes</option><option value="menor">Precio: menor a mayor</option><option value="mayor">Precio: mayor a menor</option></select></label>
    </div>
    <p className="results-count">{filtered.length} {filtered.length === 1 ? 'publicación encontrada' : 'publicaciones encontradas'}</p>
    <ProductGrid products={filtered} emptyText="No encontramos productos con esos filtros." />
  </main>
}
