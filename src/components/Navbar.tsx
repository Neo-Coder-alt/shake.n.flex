import { useEffect, useState } from 'react'
import { BRAND } from '../lib/brand'
import { useCart } from '../lib/cart'

const NAV = [
  { href: '#home', label: 'Home' },
  { href: '#menu', label: 'Menu' },
  { href: '#about', label: 'About' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#visit', label: 'Visit' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { count, setOpenCart } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 font-display text-lg text-white shadow-lg shadow-brand-600/30">S</span>
          <span className="font-display text-xl leading-none text-brand-700">Shake N Flex</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700">{n.label}</a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href={`tel:${BRAND.phoneIntl}`} className="hidden btn-ghost sm:inline-flex">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call
          </a>
          <button onClick={() => setOpenCart(true)} className="relative btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-amber-400 px-1 text-xs font-bold text-brand-900 ring-2 ring-white">{count}</span>
            )}
          </button>
          <button onClick={() => setOpen(v => !v)} className="grid h-10 w-10 place-items-center rounded-full border border-brand-200 bg-white text-brand-700 md:hidden">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{open ? <path d="M18 6 6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}</svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-brand-100 bg-white px-4 py-3 md:hidden">
          {NAV.map(n => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-2.5 font-semibold text-slate-700 hover:bg-brand-50">{n.label}</a>
          ))}
        </div>
      )}
    </header>
  )
}
