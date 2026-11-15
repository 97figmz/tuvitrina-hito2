import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMarketplace } from '../context/MarketplaceContext'
import { categories } from '../data/products'

export default function CreateListing() {
  const navigate = useNavigate()
  const { createProduct } = useMarketplace()
  const [form, setForm] = useState({ title: '', category: '', price: '', description: '' })
  const onChange = event => setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
  const onSubmit = event => {
    event.preventDefault()
    if (!form.title.trim() || !form.category || Number(form.price) <= 0 || !form.description.trim()) return
    if (createProduct(form)) navigate('/perfil')
  }
  return <main className="container section"><div className="listing-form-panel">
    <span className="eyebrow">PUBLICAR PRODUCTO</span><h1 className="page-title">Nueva publicación</h1>
    <p className="page-lead">Completa los datos básicos del repuesto o accesorio.</p>
    <form className="form-stack" onSubmit={onSubmit}>
      <label>Nombre del producto<input required name="title" value={form.title} onChange={onChange} placeholder="Ej: Cadena para motosierra" maxLength="100" /></label>
      <label>Categoría<select required name="category" value={form.category} onChange={onChange}><option value="">Selecciona una categoría</option>{categories.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
      <label>Precio (CLP)<input required type="number" min="1" step="1" name="price" value={form.price} onChange={onChange} placeholder="15000" /></label>
      <label>Descripción<textarea required name="description" value={form.description} onChange={onChange} rows="5" placeholder="Describe el producto y su estado" /></label>
      <p className="hint">Las publicaciones se guardan en este navegador como demostración. Las fotos se agregarán cuando conectemos el backend.</p>
      <button type="submit" className="button button-primary">Publicar producto</button>
    </form>
  </div></main>
}
