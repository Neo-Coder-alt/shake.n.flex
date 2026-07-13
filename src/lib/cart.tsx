import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { MenuItem } from './supabase'

export type CartLine = { item: MenuItem; quantity: number }

type CartCtx = {
  lines: CartLine[]
  add: (item: MenuItem) => void
  dec: (id: string) => void
  remove: (id: string) => void
  clear: () => void
  count: number
  subtotal: number
  openCart: boolean
  setOpenCart: (v: boolean) => void
}

const Ctx = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try { return JSON.parse(localStorage.getItem('snf_cart') ?? '[]') } catch { return [] }
  })
  const [openCart, setOpenCart] = useState(false)

  useEffect(() => {
    localStorage.setItem('snf_cart', JSON.stringify(lines))
  }, [lines])

  const add = (item: MenuItem) =>
    setLines(prev => {
      const found = prev.find(l => l.item.id === item.id)
      if (found) return prev.map(l => l.item.id === item.id ? { ...l, quantity: l.quantity + 1 } : l)
      return [...prev, { item, quantity: 1 }]
    })

  const dec = (id: string) =>
    setLines(prev => prev.flatMap(l => l.item.id === id ? (l.quantity > 1 ? [{ ...l, quantity: l.quantity - 1 }] : []) : [l]))

  const remove = (id: string) => setLines(prev => prev.filter(l => l.item.id !== id))
  const clear = () => setLines([])

  const count = lines.reduce((n, l) => n + l.quantity, 0)
  const subtotal = lines.reduce((s, l) => s + l.item.price * l.quantity, 0)

  const value = useMemo(() => ({ lines, add, dec, remove, clear, count, subtotal, openCart, setOpenCart }),
    [lines, count, subtotal, openCart])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
