import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MarketplaceProvider } from './context/MarketplaceContext'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Detail from './pages/Detail'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CreateListing from './pages/CreateListing'
import NotFound from './pages/NotFound'

export default function App() {
  return <BrowserRouter>
    <MarketplaceProvider>
      <div className="app-shell">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publicaciones" element={<Listings />} />
          <Route path="/publicaciones/:id" element={<Detail />} />
          <Route path="/ingresar" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/perfil" element={<Profile />} />
            <Route path="/publicar" element={<CreateListing />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </MarketplaceProvider>
  </BrowserRouter>
}
