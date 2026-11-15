import { useState } from 'react'

// Fotografías de referencia alojadas en Wikimedia Commons.
// Las publicaciones son de ejemplo: la foto puede mostrar un artículo similar.
const photos = {
  1: 'Chainsaw chains.JPG',
  2: 'CentrifugalClutch.jpg',
  3: 'Air Filter Used.jpg',
  4: 'Kei-truck-camo-with-roll-bars2a.jpg',
  5: 'Chainsaw blade.jpg',
  6: 'Brushcutter and line trimmer rotated.jpg',
}

export default function ProductImage({ product, category, title }) {
  const [failed, setFailed] = useState(false)
  const name = photos[product?.id]
  const label = title || product?.title || 'Repuesto'
  if (!name || failed) {
    return <div className="photo-fallback" role="img" aria-label={`Sin foto disponible: ${label}`}><span>Sin foto disponible</span></div>
  }
  const url = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(name)}?width=640`
  return <img src={url} alt={`Foto referencial: ${label}`} loading="lazy" onError={() => setFailed(true)} />
}
