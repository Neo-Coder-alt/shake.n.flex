import { useEffect, useState } from 'react'
import { supabase, type MenuItem } from '../lib/supabase'
import { CATEGORIES } from '../lib/brand'
import { useCart } from '../lib/cart'

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [active, setActive] = useState<string>('All')
  const { lines, add, dec } = useCart()

  useEffect(() => {
    (async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)
        .order('sort_order', { ascending: true })
      if (error) { setError(error.message); setLoading(false); return }
      setItems(data ?? [])
      setLoading(false)
    })()
  }, [])

  const filtered = active === 'All' ? items : items.filter(i => i.category === active)
  const tabs = ['All', ...CATEGORIES]
  const qty = (id: string) => lines.find(l => l.item.id === id)?.quantity ?? 0

  return (
    <section id="menu" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip mb-4">Our Menu</span>
          <h2 className="section-title">Pick your favourite blend</h2>
          <p className="mt-4 text-slate-600">Every drink is made fresh to order. Add items to your cart and checkout in minutes.</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map(t => (
            <button key={t} onClick={() => setActive(t)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${active === t ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25' : 'bg-brand-50 text-brand-700 hover:bg-brand-100'}`}>
              {t}
            </button>
          ))}
        </div>

        {loading && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-56 animate-pulse rounded-3xl bg-brand-50" />
            ))}
          </div>
        )}
        {error && (
          <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            Couldn't load the menu. {error}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(item => (
              <article key={item.id} className="card group overflow-hidden transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-100">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.image_url ?? 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=600'}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {item.popular && (
                    <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-brand-900 shadow">Popular</span>
                  )}
                  {item.original_price && (
                    <span className="absolute right-3 top-3 rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-bold text-white shadow">
                      Rs {Math.round((1 - item.price / item.original_price) * 100)}% OFF
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-brand-950">{item.name}</h3>
                  {item.description && <p className="mt-1 line-clamp-2 text-sm text-slate-500">{item.description}</p>}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-extrabold text-brand-600">Rs {item.price}</span>
                      {item.original_price && <span className="text-sm text-slate-400 line-through">Rs {item.original_price}</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      {qty(item.id) > 0 && (
                        <>
                          <button onClick={() => dec(item.id)} className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 font-bold text-brand-700 transition hover:bg-brand-100 active:scale-90">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/></svg>
                          </button>
                          <span className="w-5 text-center font-bold text-brand-700">{qty(item.id)}</span>
                        </>
                      )}
                      <button onClick={() => add(item)} className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 font-bold text-white shadow-md shadow-brand-600/30 transition hover:bg-brand-700 active:scale-90">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
