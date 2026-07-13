import { useState } from 'react'
import { CartProvider } from './lib/cart'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import About from './components/About'
import Reviews from './components/Reviews'
import Visit from './components/Visit'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'

export default function App() {
  const [checkout, setCheckout] = useState(false)

  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <About />
        <Reviews />
        <Visit />
      </main>
      <Footer />
      <CartDrawer onCheckout={() => setCheckout(true)} />
      <CheckoutModal open={checkout} onClose={() => setCheckout(false)} />
    </CartProvider>
  )
}
